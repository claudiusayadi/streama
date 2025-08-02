# Use Bun's official image as base
FROM oven/bun:1 AS base
WORKDIR /usr/src/api

# Install dependencies into tmp directory
# This will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /tmp/dev
COPY package.json bun.lock /tmp/dev/
RUN cd /tmp/dev && bun install --frozen-lockfile

# Install with --production (exclude devDependencies)
RUN mkdir -p /tmp/prod
COPY package.json bun.lock /tmp/prod/
RUN cd /tmp/prod && bun install --frozen-lockfile --production

# Copy node_modules from tmp directory
# Then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /tmp/dev/node_modules node_modules
COPY . .

# Build the application
ENV NODE_ENV=production
RUN bun run build

# Copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /tmp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/api/dist ./dist
COPY --from=prerelease /usr/src/api/package.json .

# Expose port
EXPOSE 5134

# Run the app
USER bun
CMD ["bun", "run", "dist/main.js"]
