# Redis Setup for Pet Voa

## 🚀 Quick Start

### Local Development with Docker

1. **Start Redis container:**
```bash
docker-compose up -d redis
```

2. **Verify Redis is running:**
```bash
docker exec -it petvoa-redis redis-cli ping
# Should return: PONG
```

3. **Run the Next.js app:**
```bash
npm run dev
```

## 📦 What's Included

### Redis Features Implemented:

1. **Caching System** (`lib/redis.ts`)
   - Page/API response caching with TTL
   - Automatic cache invalidation
   - Fallback to source on Redis failure

2. **Rate Limiting**
   - Protect contact form from spam
   - 5 requests per minute per IP
   - Configurable limits

3. **Analytics Tracking**
   - Page view counters
   - Contact form submissions
   - Pet type statistics

4. **Session Storage**
   - Store user sessions
   - Configurable TTL
   - Secure session management

## 🔧 Configuration

### Environment Variables

Create `.env.local`:
```env
# For local Docker
REDIS_URL=redis://localhost:6379

# For Coolify/Production
# REDIS_URL=redis://your-redis-instance:6379
```

## 🐳 Docker Deployment

### Using Docker Compose:
```bash
# Build and run everything
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### For Coolify:

1. **Deploy Redis service:**
   - Use the official Redis Docker image
   - Set memory limit: 256MB
   - Enable persistence (AOF)

2. **Configure your app:**
   - Set `REDIS_URL` environment variable
   - Point to your Redis service

## 📊 API Endpoints

### Track Stats
```bash
# Track page view
curl -X POST http://localhost:3000/api/stats \
  -H "Content-Type: application/json" \
  -d '{"page": "hero"}'

# Get stats
curl http://localhost:3000/api/stats
```

### Contact Form (with rate limiting)
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João",
    "phone": "11999999999",
    "petType": "dog",
    "message": "Quero transportar meu pet"
  }'
```

## 🛠 Redis Commands

### Monitor Redis:
```bash
# Connect to Redis CLI
docker exec -it petvoa-redis redis-cli

# View all keys
KEYS *

# Get specific counter
GET counter:total_views

# Monitor commands in real-time
MONITOR

# Check memory usage
INFO memory
```

### Clear cache:
```bash
# Clear all data (development only!)
docker exec -it petvoa-redis redis-cli FLUSHALL

# Clear specific pattern
docker exec -it petvoa-redis redis-cli --scan --pattern "cache:*" | xargs docker exec -it petvoa-redis redis-cli DEL
```

## 🔒 Production Checklist

- [ ] Set strong Redis password
- [ ] Configure SSL/TLS for Redis connection
- [ ] Set appropriate memory limits
- [ ] Enable Redis persistence (RDB + AOF)
- [ ] Configure backup strategy
- [ ] Set up monitoring/alerts
- [ ] Implement proper error handling
- [ ] Add authentication to stats endpoints

## 💡 Tips

1. **Memory Management:**
   - Redis is configured with LRU eviction policy
   - Max memory: 256MB (adjustable)
   - Old cache entries auto-expire

2. **High Availability:**
   - Consider Redis Sentinel for failover
   - Or use managed Redis (AWS ElastiCache, Redis Cloud)

3. **Performance:**
   - Redis handles 10k+ ops/second easily
   - Use pipelining for bulk operations
   - Consider Redis Cluster for scaling

## 🆘 Troubleshooting

**Redis connection refused:**
```bash
# Check if Redis is running
docker ps | grep redis

# Check Redis logs
docker logs petvoa-redis

# Test connection
docker exec -it petvoa-redis redis-cli ping
```

**Memory issues:**
```bash
# Check memory usage
docker exec -it petvoa-redis redis-cli INFO memory

# Flush old data
docker exec -it petvoa-redis redis-cli FLUSHDB
```

**Rate limiting too strict:**
- Adjust limits in `/app/api/contact/route.ts`
- Change window and max requests as needed