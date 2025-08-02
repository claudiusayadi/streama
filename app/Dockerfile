# Base image
FROM oven/bun:1-alpine AS base

WORKDIR /usr/src/app

# Dependencies stage
FROM base AS deps

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile --production

# Build stage
FROM base AS builder

WORKDIR /usr/src/app
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

ENV NODE_ENV=production
COPY . ./
RUN bun run build

# Final stage: serving the built app
FROM oven/bun:1-alpine AS runner

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE ${APP_PORT}

CMD [ "bun", "run", "dist/main.js" ]