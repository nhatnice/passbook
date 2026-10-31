# ==========================================
# Stage 1: Build React Frontend
# ==========================================
FROM node:18-bookworm-slim AS builder

WORKDIR /app

# Install git and build essentials for npm dependencies and native modules
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    python3 \
    make \
    g++ \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies first for Docker layer caching
COPY package.json package-lock.json* yarn.lock* ./
RUN npm install --legacy-peer-deps

# Copy application source code
COPY . .

# Set environment for build
ENV NODE_ENV=production
ENV NODE_OPTIONS=--openssl-legacy-provider

# Build optimized static bundle
RUN npm run build

# ==========================================
# Stage 2: Serve via Nginx
# ==========================================
FROM nginx:alpine AS runner

# Copy custom nginx configuration for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build artifacts from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
