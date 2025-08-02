#!/bin/bash

# Script to manage GitHub repository secrets
# Usage:
#   ./scripts/manage-secrets.sh sync    # Push .env to GitHub secrets
#   ./scripts/manage-secrets.sh list    # List current GitHub secrets
#   ./scripts/manage-secrets.sh delete  # Delete specific secret

set -e

# Colors for output using tput
RED=$(tput setaf 1)
GREEN=$(tput setaf 2)
YELLOW=$(tput setaf 3)
BLUE=$(tput setaf 4)
NC=$(tput sgr0) # No Color
ENV="$(pwd)/.env"


# Function to check prerequisites
check_prerequisites() {
    if ! command -v gh &> /dev/null; then
        printf "%sError: GitHub CLI is not installed%s\n" "$RED" "$NC"
        echo "Install it from: https://cli.github.com/"
        exit 1
    fi

    if ! gh auth status >/dev/null 2>&1; then
        printf "%sError: Not authenticated with GitHub CLI%s\n" "$RED" "$NC"
        echo "Please run: gh auth login"
        exit 1
    fi
}

# Function to sync .env to GitHub secrets with cleanup
sync_secrets() {
    if [ ! -f "$ENV" ]; then
        printf "%sError: .env file not found%s\n" "$RED" "$NC"
        echo "Please create a .env file with your environment variables"
        exit 1
    fi

    printf "%sSyncing .env variables to GitHub repository secrets...%s\n" "$YELLOW" "$NC"
    echo

    # Get current secrets from GitHub
    echo "Fetching current secrets from GitHub..."
    current_secrets=$(gh secret list --json name --jq '.[].name' 2>/dev/null || echo "")

    # Get secrets that should exist from .env
    declare -A env_secrets
    while IFS= read -r line || [ -n "$line" ]; do
        # Skip comments and empty lines
        if [[ $line =~ ^[[:space:]]*# ]] || [[ -z "${line// }" ]]; then
            continue
        fi

        # Extract key and value
        if [[ $line =~ ^([^=]+)=(.*)$ ]]; then
            key="${BASH_REMATCH[1]}"
            value="${BASH_REMATCH[2]}"

            # Remove quotes if present
            value=$(echo "$value" | sed 's/^["'\'']\|["'\'']$//g')

            # Skip if value is empty
            if [ -z "$value" ]; then
                printf "%sSkipping %s (empty value)%s\n" "$YELLOW" "$key" "$NC"
                continue
            fi

            env_secrets["$key"]="$value"
        fi
    done < "$ENV"

    # Sync secrets from .env
    local sync_count=0
    echo
    printf "%sSyncing secrets from .env:%s\n" "$BLUE" "$NC"
    for key in "${!env_secrets[@]}"; do
        value="${env_secrets[$key]}"
        printf "Setting secret: %s%s%s ... " "$BLUE" "$key" "$NC"

        if echo "$value" | gh secret set "$key" --body - 2>/dev/null; then
            printf "%s✓%s\n" "$GREEN" "$NC"
            ((sync_count++))
        else
            printf "%s✗%s\n" "$RED" "$NC"
        fi
    done

    # Check for orphaned secrets (exist in GitHub but not in .env)
    echo
    printf "%sChecking for orphaned secrets:%s\n" "$BLUE" "$NC"
    declare -a orphaned_secrets

    if [ -n "$current_secrets" ]; then
        while IFS= read -r secret; do
            if [ -n "$secret" ] && [ -z "${env_secrets[$secret]}" ]; then
                orphaned_secrets+=("$secret")
                printf "%sFound orphaned secret: %s%s\n" "$YELLOW" "$secret" "$NC"
            fi
        done <<< "$current_secrets"
    fi

    if [ ${#orphaned_secrets[@]} -gt 0 ]; then
        echo
        printf "%sFound %d orphaned secret(s) that exist in GitHub but not in .env:%s\n" "$YELLOW" "${#orphaned_secrets[@]}" "$NC"
        printf '%s\n' "${orphaned_secrets[@]}"
        echo
        read -p "Do you want to delete these orphaned secrets? (y/N): " delete_orphaned

        if [[ $delete_orphaned =~ ^[Yy]$ ]]; then
            local delete_count=0
            for secret in "${orphaned_secrets[@]}"; do
                printf "Deleting orphaned secret: %s%s%s ... " "$BLUE" "$secret" "$NC"
                if gh secret delete "$secret" 2>/dev/null; then
                    printf "%s✓%s\n" "$GREEN" "$NC"
                    ((delete_count++))
                else
                    printf "%s✗%s\n" "$RED" "$NC"
                fi
            done
            printf "%s✓ Deleted %d orphaned secrets%s\n" "$GREEN" "$delete_count" "$NC"
        fi
    else
        printf "%sNo orphaned secrets found%s\n" "$GREEN" "$NC"
    fi

    echo
    printf "%s✓ Successfully synced %d secrets!%s\n" "$GREEN" "$sync_count" "$NC"
    printf "%sView at: https://github.com/%s/settings/secrets/actions%s\n" "$YELLOW" "$(gh repo view --json owner,name --jq '.owner.login + "/" + .name')" "$NC"
}

# Function to list GitHub secrets
list_secrets() {
    printf "%sCurrent GitHub repository secrets:%s\n" "$YELLOW" "$NC"
    echo
    gh secret list
}

# Function to delete secrets (single or batch)
delete_secret() {
    local secrets_input="$1"

    if [ -n "$secrets_input" ]; then
        # Batch delete: parse comma-separated list
        IFS=',' read -ra SECRETS <<< "$secrets_input"
        printf "%sBatch deleting %d secrets...%s\n" "$YELLOW" "${#SECRETS[@]}" "$NC"
        echo

        local success_count=0
        local total_count=${#SECRETS[@]}

        for secret in "${SECRETS[@]}"; do
            # Trim whitespace
            secret=$(echo "$secret" | xargs)
            printf "Deleting secret: %s%s%s ... " "$BLUE" "$secret" "$NC"

            if gh secret delete "$secret" 2>/dev/null; then
                printf "%s✓%s\n" "$GREEN" "$NC"
                ((success_count++))
            else
                printf "%s✗ (not found or error)%s\n" "$RED" "$NC"
            fi
        done

        echo
        printf "%s✓ Successfully deleted %d/%d secrets%s\n" "$GREEN" "$success_count" "$total_count" "$NC"
    else
        # Interactive single delete
        printf "%sCurrent secrets:%s\n" "$YELLOW" "$NC"
        gh secret list
        echo
        read -p "Enter secret name to delete: " secret_name

        if [ -n "$secret_name" ]; then
            if gh secret delete "$secret_name"; then
                printf "%s✓ Successfully deleted secret: %s%s\n" "$GREEN" "$secret_name" "$NC"
            else
                printf "%s✗ Failed to delete secret: %s%s\n" "$RED" "$secret_name" "$NC"
            fi
        fi
    fi
}

# Function to show help
show_help() {
    printf "%sGitHub Secrets Management Script%s\n" "$BLUE" "$NC"
    echo
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo
    echo "Commands:"
    echo "  sync     Sync .env variables to GitHub repository secrets"
    echo "           Also detects and optionally removes orphaned secrets"
    echo "  list     List current GitHub repository secrets"
    echo "  delete   Delete secrets (single or batch)"
    echo "  help     Show this help message"
    echo
    echo "Examples:"
    echo "  $0 sync"
    echo "  $0 list"
    echo "  $0 delete                    # Interactive single delete"
    echo "  $0 delete SECRET_NAME        # Delete single secret"
    echo "  $0 delete SECRET1,SECRET2    # Batch delete multiple secrets"
    echo
    echo "Batch Delete Format:"
    echo "  Comma-separated list: SECRET_1,SECRET_2,SECRET_3"
    echo "  Spaces around commas are automatically trimmed"
}

# Main script logic
check_prerequisites

case "${1:-help}" in
    sync)
        sync_secrets
        ;;
    list)
        list_secrets
        ;;
    delete)
        delete_secret "$2"
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        printf "%sError: Unknown command '%s'%s\n" "$RED" "$1" "$NC"
        echo
        show_help
        exit 1
        ;;
esac
