# Simple single-stage Dockerfile for Coolify
FROM node:20-alpine

# Install dependencies
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (dev + prod)
RUN npm ci

# Copy application files
COPY . .

# Build the Next.js app
RUN npm run build

# Clean dev dependencies
RUN npm prune --production

# Set environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]