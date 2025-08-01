# === Stage 1: Build ===
FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# === Stage 2: Production ===
FROM node:22-alpine

# Only copy required files from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

EXPOSE 3232

CMD ["node","dist/main.js"]