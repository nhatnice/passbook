# ==========================================
# Stage 1: Build React Frontend
# ==========================================
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies first for Docker layer caching
COPY package.json package-lock.json* yarn.lock* ./
RUN npm install --legacy-peer-deps

# Copy application source code
COPY . .

# Set environment for build
ENV NODE_ENV=production

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
