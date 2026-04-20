FROM node:20-alpine AS base

WORKDIR /app

COPY package.json package-lock.json* ./

FROM base AS development
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi
EXPOSE 3000

FROM base AS dependencies
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

FROM dependencies AS builder
COPY . .
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 3000

CMD ["npm", "run", "start", "--", "--hostname", "0.0.0.0", "--port", "3000"]
