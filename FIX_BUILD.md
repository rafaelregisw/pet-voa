# 🔧 Se o Build Falhar no Coolify

## Environment Variables para adicionar:

```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NODE_OPTIONS=--max-old-space-size=1024
REDIS_URL=redis://localhost:6379
NEXT_PUBLIC_WHATSAPP_NUMBER=5562983211122
```

## Se falhar com "out of memory":

Adicione no Coolify:
- Memory Limit: 1GB (durante build)
- Build Args: `NODE_OPTIONS=--max-old-space-size=1024`

## Se falhar com "Cannot find module":

Mude no Dockerfile linha 9:
DE: `RUN npm ci --only=production`
PARA: `RUN npm ci`

## Comandos para debug local:

```bash
# Testar build localmente
docker build -t pet-voa-test .

# Se funcionar local mas não no Coolify:
# Problema é memória do servidor
```