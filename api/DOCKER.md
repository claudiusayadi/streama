# Streama - Docker Setup

This guide explains how to run the Streama project using Docker with Bun runtime.

## Quick Start

### Prerequisites

- Docker 20.10+
- Docker Compose 2.0+
- Git

### 1. Clone and Setup Environment

```bash
git clone git@github.com:claudiusayadi/streama.git
cd streama/api
cp .env.example .env
```

Edit `.env` file with your configuration values:

- Set your TMDB API key
- Set database URL (DB_URL)
- Set JWT secret
- Configure other environment variables

### 2. Run with Docker Compose

#### Production Mode

```bash
# Start API service
docker compose up

# View logs
docker compose logs -f

# Stop service
docker compose down
```

#### Development Mode with Hot Reload

```bash
# Start development service
docker compose -f compose.dev.yml up

# View development logs
docker compose -f compose.dev.yml logs -f
```

## Project Structure

```
streama/api/
├── Dockerfile              # Production build
├── Dockerfile.dev          # Development build
├── compose.yml             # Production compose
├── compose.dev.yml         # Development compose
├── .dockerignore           # Files excluded from build
├── .env.example            # Environment template
└── src/
    ├── health/             # Health check endpoint
    └── ...
```

## Services

### API Service

- **Port**: $PORT (dynamic from environment)
- **Runtime**: Bun 1.x
- **Framework**: NestJS
- **Health Check**: `GET /health`

## Health Checks

The API includes health check endpoint:

```bash
# Check API health
curl http://localhost:$PORT/health

# Check service status
docker compose ps
```

## Configuration

### Environment Variables

Key environment variables for Docker deployment:

```env
# API
NODE_ENV=production
PORT=3000

# Database
DB_URL=postgresql://user:password@host:port/database

# TMDB API
TMDB_API_KEY=your-tmdb-api-key

# JWT
JWT_SECRET=your-super-secret-jwt-key
```

### Database Migrations

Run database migrations in Docker:

```bash
# Access API container
docker compose exec api bun run migration:run

# Or during container startup, migrations run automatically
```

## Docker Images

### Production Image

- Multi-stage build for optimized size
- Only production dependencies
- Built artifacts only
- Runs as non-root user
- Size: ~150MB

### Development Image

- All dependencies included
- Source code mounted as volume
- Hot reload enabled
- Development tools available

## Troubleshooting

### Common Issues

1. **Port conflicts**

   ```bash
   # Change port in .env file
   PORT=3001
   ```

2. **Database connection issues**

   ```bash
   # Check database URL in .env
   DB_URL=postgresql://user:password@host:port/database
   ```

3. **Permission issues**

   ```bash
   # Fix volume permissions
   sudo chown -R $USER:$USER .
   ```

4. **Clean restart**
   ```bash
   # Clean everything and restart
   docker compose down
   docker compose up --build
   ```

### Logs and Debugging

```bash
# View service logs
docker compose logs -f

# Access container shell
docker compose exec api bun sh
```

## Deployment

### Production Deployment

1. **Build optimized image**

   ```bash
   docker build -t streama-api:latest .
   ```

2. **Push to registry**

   ```bash
   docker tag streama-api:latest your-registry/streama-api:latest
   docker push your-registry/streama-api:latest
   ```

3. **Deploy with compose**
   ```bash
   # On production server
   docker compose up -d
   ```

### Environment-specific Overrides

Create environment-specific compose files:

- `compose.dev.yml` - Development overrides
- `compose.prod.yml` - Production overrides
- `compose.staging.yml` - Staging overrides

## Monitoring

The API includes built-in health check endpoint:

- **Health Check**: `GET /health`
- **Container Health**: `docker compose ps`
- **Service Logs**: `docker compose logs -f`

## Security

Production security considerations:

- Non-root user in containers
- Secrets management via environment variables
- Resource limits configured
- Regular image updates

---

For more information, see the main [README.md](./README.md) file.
