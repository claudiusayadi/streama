#!/bin/bash

# Script to sync environment variables to GitHub repository secrets
# Usage: ./scripts/sync-secrets.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color
ENV="$(pwd)/.env"


# Check if .env file exists
if [ ! -f $ENV ]; then
    echo -e "${RED}Error: .env file not found${NC}"
    echo "Please create a .env file with your environment variables"
    exit 1
fi

# Check if user is authenticated with GitHub CLI
if ! gh auth status >/dev/null 2>&1; then
    echo -e "${RED}Error: Not authenticated with GitHub CLI${NC}"
    echo "Please run: gh auth login"
    exit 1
fi

echo -e "${YELLOW}Syncing environment variables to GitHub repository secrets...${NC}"

# Read .env file and set secrets (excluding comments and empty lines)
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

        # Set the secret using GitHub CLI
        if echo "$value" | gh secret set "$key" --body -; then
            echo -e "${GREEN}✓ Successfully set $key${NC}"
        else
            echo -e "${RED}✗ Failed to set $key${NC}"
        fi
    fi
done < $ENV

echo -e "${GREEN}✓ Secrets sync completed!${NC}"
echo
echo -e "${YELLOW}You can view your secrets at:${NC}"
echo "https://github.com/$(gh repo view --json owner,name --jq '.owner.login + "/" + .name')/settings/secrets/actions"
