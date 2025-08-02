#!/bin/bash

# Script to manage GitHub repository secrets
# Usage:
#   ./scripts/manage-secrets.sh sync    # Push .env to GitHub secrets
#   ./scripts/manage-secrets.sh list    # List current GitHub secrets
#   ./scripts/manage-secrets.sh delete  # Delete specific secret

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color
ENV="$(pwd)/.env"


# Function to check prerequisites
check_prerequisites() {
    if ! command -v gh &> /dev/null; then
        echo -e "${RED}Error: GitHub CLI is not installed${NC}"
        echo "Install it from: https://cli.github.com/"
        exit 1
    fi

    if ! gh auth status >/dev/null 2>&1; then
        echo -e "${RED}Error: Not authenticated with GitHub CLI${NC}"
        echo "Please run: gh auth login"
        exit 1
    fi
}

# Function to sync .env to GitHub secrets
sync_secrets() {
    if [ ! -f "$ENV" ]; then
        echo -e "${RED}Error: .env file not found${NC}"
        echo "Please create a .env file with your environment variables"
        exit 1
    fi

    echo -e "${YELLOW}Syncing .env variables to GitHub repository secrets...${NC}"
    echo

    local count=0
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
                echo -e "${YELLOW}Skipping $key (empty value)${NC}"
                continue
            fi

            echo -n "Setting secret: ${BLUE}$key${NC} ... "

            if echo "$value" | gh secret set "$key" --body - 2>/dev/null; then
                echo -e "${GREEN}✓${NC}"
                ((count++))
            else
                echo -e "${RED}✗${NC}"
            fi
        fi
    done < "$ENV"

    echo
    echo -e "${GREEN}✓ Successfully synced $count secrets!${NC}"
    echo -e "${YELLOW}View at: https://github.com/$(gh repo view --json owner,name --jq '.owner.login + "/" + .name')/settings/secrets/actions${NC}"
}

# Function to list GitHub secrets
list_secrets() {
    echo -e "${YELLOW}Current GitHub repository secrets:${NC}"
    echo
    gh secret list
}

# Function to delete a secret
delete_secret() {
    echo -e "${YELLOW}Current secrets:${NC}"
    gh secret list
    echo
    read -p "Enter secret name to delete: " secret_name

    if [ -n "$secret_name" ]; then
        if gh secret delete "$secret_name"; then
            echo -e "${GREEN}✓ Successfully deleted secret: $secret_name${NC}"
        else
            echo -e "${RED}✗ Failed to delete secret: $secret_name${NC}"
        fi
    fi
}

# Function to show help
show_help() {
    echo -e "${BLUE}GitHub Secrets Management Script${NC}"
    echo
    echo "Usage: $0 [COMMAND]"
    echo
    echo "Commands:"
    echo "  sync     Sync .env variables to GitHub repository secrets"
    echo "  list     List current GitHub repository secrets"
    echo "  delete   Delete a specific secret"
    echo "  help     Show this help message"
    echo
    echo "Examples:"
    echo "  $0 sync"
    echo "  $0 list"
    echo "  $0 delete"
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
        delete_secret
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo -e "${RED}Error: Unknown command '$1'${NC}"
        echo
        show_help
        exit 1
        ;;
esac
