# 🚀 Deploy no Coolify - Pet Voa

## ✅ Escolha: **Docker Compose Empty (Opção 2)**

### 📋 Passo a Passo ULTRATHINK:

## 1️⃣ No Coolify, escolha:
```
Docker Compose Empty
"You can deploy complex application easily with Docker Compose, without Git"
```

## 2️⃣ Cole este docker-compose.yml:

```yaml
version: '3.8'

services:
  # Redis Cache
  redis:
    image: redis:7-alpine
    restart: unless-stopped
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes --maxmemory 256mb --maxmemory-policy allkeys-lru
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Next.js App
  app:
    image: ghcr.io/rafaelregis/pet-voa:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - REDIS_URL=redis://redis:6379
      - NEXT_PUBLIC_WHATSAPP_NUMBER=5562983211122
      - NEXT_PUBLIC_URL=https://petvoa.com.br
    depends_on:
      - redis

volumes:
  redis_data:
```

## 3️⃣ Configure as Variáveis de Ambiente no Coolify:

```env
NODE_ENV=production
REDIS_URL=redis://redis:6379
NEXT_PUBLIC_WHATSAPP_NUMBER=5562983211122
NEXT_PUBLIC_URL=https://seu-dominio.com.br
```

## 4️⃣ Build e Push da Imagem Docker:

No seu terminal local, execute:

```bash
# Build da imagem
docker build -t pet-voa:latest .

# Tag para seu registry
docker tag pet-voa:latest ghcr.io/SEU_USUARIO/pet-voa:latest

# Push para GitHub Container Registry
docker push ghcr.io/SEU_USUARIO/pet-voa:latest
```

## 5️⃣ Configure o Domínio no Coolify:

- Domain: `petvoa.com.br` ou `seu-dominio.com`
- SSL: Ative "Force HTTPS"
- Let's Encrypt: Ative para SSL automático

## 🎯 Alternativa Simples (Sem Build Local):

Se não quiser fazer build local, use o **Dockerfile** direto:

### No Coolify, escolha "Dockerfile" e cole:

```dockerfile
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

Depois adicione o Redis como serviço separado no Coolify.

## ⚡ Dicas ULTRATHINK:

1. **Memória**: Configure pelo menos 512MB RAM para o app
2. **CPU**: 0.5 vCPU é suficiente
3. **Health Check**: Já configurado no docker-compose
4. **Logs**: Monitore em Coolify > Logs
5. **SSL**: Use Let's Encrypt automático do Coolify

## 🔧 Troubleshooting:

**Redis não conecta?**
- Verifique se o nome do serviço é `redis`
- URL deve ser `redis://redis:6379`

**Build falha?**
- Aumente memória durante build para 1GB
- Use `NODE_OPTIONS=--max-old-space-size=1024`

**Site lento?**
- Ative o Redis corretamente
- Verifique logs: `docker logs petvoa-redis`

## ✅ Resumo:

Use **Docker Compose Empty** porque você tem:
- ✅ 2 serviços (Next.js + Redis)
- ✅ Comunicação entre containers
- ✅ Volumes persistentes
- ✅ Healthchecks

Pronto para deploy! 🚀