#!/bin/sh

echo "🚀 Starting Pet Voa application..."
echo "📦 Environment: $NODE_ENV"
echo "🔌 Port: $PORT"
echo "🌐 Hostname: $HOSTNAME"

# Set defaults if not provided
export PORT=${PORT:-3000}
export HOSTNAME=${HOSTNAME:-0.0.0.0}
export NODE_ENV=${NODE_ENV:-production}

echo "✅ Starting Next.js server on $HOSTNAME:$PORT"

# Start the application
npm start