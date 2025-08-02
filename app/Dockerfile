# Production Dockerfile for React Vite App
FROM oven/bun:1-alpine AS base

WORKDIR /usr/src/app

# Install dependencies
FROM base AS deps
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile --production

# Build the application
FROM base AS builder
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

ENV NODE_ENV=production
COPY . ./
RUN bun run build

# Copy built application
COPY --from=builder /usr/src/app/dist ./

EXPOSE ${APP_PORT}

CMD [ "bun", "run", "dist/main.js" ]
