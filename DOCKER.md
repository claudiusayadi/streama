# Streama - Docker Setup

## Overview

This is a monorepo containing:

- `api/` - NestJS backend API
- `app/` - React frontend application

## Quick Start

### Prerequisites

- Docker 20.10+
- Docker Compose 2.0+

### Setup

```bash
git clone git@github.com:claudiusayadi/streama.git
cd streama
cp .env.example .env
```

### Development

```bash
# Start development environment (auto-builds from Dockerfile.dev)
bun run dev

# View logs
bun run docker:logs

# Stop
bun run docker:down
```

### Production

```bash
# Pull latest production image and start
bun run start
```

## Docker Files

- `compose.yml` - Production using `ghcr.io/claudiusayadi/streama:api:latest`
- `compose.override.yml` - Development overrides (auto-loaded)

## Available Scripts

| Script                   | Description                       |
| ------------------------ | --------------------------------- |
| `bun run dev`            | Start development with hot reload |
| `bun run start`          | Start production                  |
| `bun run docker:logs`    | View logs                         |
| `bun run docker:restart` | Restart services                  |

## CI/CD

GitHub Actions automatically builds and pushes to `ghcr.io/claudiusayadi/streama:api:latest` on main branch pushes.
