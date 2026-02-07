# -------- Base --------
FROM oven/bun:alpine AS base
WORKDIR /app

# -------- Dependencies --------
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile || bun install

# -------- Build --------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

# -------- Runner (Production) --------
FROM oven/bun:alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Only copy what is needed to run
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.* ./

EXPOSE 3000

CMD ["bun", "run", "start"]
