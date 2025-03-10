# ---- Build Stage ----
FROM node:20-alpine AS builder

RUN apk add --no-cache python3 make g++

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Initialize database and run migrations
RUN mkdir data

RUN pnpm run db:migrate

# Build the Next.js application with pnpm
RUN pnpm run build

# ---- Production Stage ----
FROM node:20-alpine AS runner

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy necessary files from build stage
COPY --from=builder /app/data ./data-init
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

VOLUME ["/app/data"]

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose the default Next.js port
EXPOSE 3000

# Set the command to use our startup script
ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "server.js"]