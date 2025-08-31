# 🚀 Deploy no Coolify - Pet Voa

## Passo a Passo Completo

### 1. **Preparar o Repositório GitHub**
```bash
git add .
git commit -m "🚀 Ready for production"
git push origin main
```

### 2. **Configurar no Coolify**

#### **Opção A: Com Docker Compose (Recomendado)**
1. No Coolify, escolher **"Docker Compose"**
2. Conectar seu GitHub
3. Apontar para o arquivo `docker-compose.yml`
4. Deploy automático!

#### **Opção B: Serviços Separados**
1. **Criar App Next.js:**
   - New Resource → Application
   - Source: GitHub
   - Build Pack: Node.js
   - Port: 3000

2. **Criar Redis Separado:**
   - New Resource → Database
   - Type: Redis
   - Version: 7-alpine
   - Anotar a URL gerada

3. **Configurar Variáveis de Ambiente no App:**
   ```
   REDIS_URL=redis://redis-xxxxx:6379  # URL do Redis criado
   NODE_ENV=production
   ```

### 3. **Variáveis de Ambiente Necessárias**

No Coolify, adicionar em **Environment Variables**:

```env
# Redis (se usar Redis separado)
REDIS_URL=redis://redis-service:6379

# Ou Redis externo
# REDIS_URL=redis://username:password@redis.exemplo.com:6379

# Node
NODE_ENV=production

# Otimizações
REDIS_MAX_RETRIES=5
RATE_LIMIT_MAX_REQUESTS=20
CACHE_TTL_DEFAULT=7200
```

### 4. **Domínio Customizado**

1. Em **Domains**, adicionar: `petvoa.com`
2. Coolify vai gerar SSL automaticamente (Let's Encrypt)
3. Configurar DNS no seu provedor:
   ```
   Type: A
   Name: @
   Value: [IP do servidor Coolify]
   ```

### 5. **Monitoramento do Redis**

Para ver se o Redis está funcionando:

1. **No Coolify:**
   - Ver logs do container Redis
   - Deve aparecer: "Ready to accept connections"

2. **Testar Conexão:**
   ```bash
   # SSH no servidor
   docker exec -it redis-container redis-cli
   > ping
   PONG
   ```

### 6. **Como o Redis Funciona no Seu Site**

```mermaid
graph LR
    A[Visitante] --> B[Next.js App]
    B --> C{Redis Disponível?}
    C -->|Sim| D[Redis Cache]
    C -->|Não| E[Memory Cache]
    D --> F[Resposta Rápida]
    E --> F
```

### 7. **O que o Redis Guarda**

- ✅ **Contador de visitas** - Quantas pessoas visitaram
- ✅ **Rate limiting** - Proteção contra spam
- ✅ **Cache de dados** - Site mais rápido
- ✅ **Sessões temporárias** - Info do chat

### 8. **Troubleshooting**

**Redis não conecta?**
```bash
# Verificar se está rodando
docker ps | grep redis

# Ver logs
docker logs redis-container

# Testar conexão
docker exec -it redis-container redis-cli ping
```

**Site lento?**
- Verificar se `REDIS_URL` está correto
- Ver logs: deve aparecer "✅ Redis connected successfully"

**Fallback funcionando?**
- Se aparecer "💾 Memory cache" nos logs, Redis não está conectado
- Se aparecer "🚀 Redis cache" está tudo OK!

### 9. **Comandos Úteis**

```bash
# Ver todas as chaves no Redis
docker exec -it redis redis-cli KEYS *

# Ver contador de visitas
docker exec -it redis redis-cli GET counter:total_views

# Limpar cache
docker exec -it redis redis-cli FLUSHALL

# Backup do Redis
docker exec -it redis redis-cli SAVE
```

### 10. **Segurança**

✅ **O que já está seguro:**
- Redis só aceita conexões internas (não exposto pra internet)
- SSL automático no site
- Rate limiting contra ataques
- Sem senhas ou dados sensíveis salvos

⚠️ **Importante:**
- Não compartilhar `REDIS_URL` 
- Não expor porta 6379 pra internet
- Usar sempre HTTPS

---

## 📊 Resultado Esperado

Quando tudo estiver funcionando:

1. **Site em `https://petvoa.com`** ✅
2. **Cadeado verde no navegador** 🔒
3. **Redis acelerando tudo** 🚀
4. **Logs mostrando:** `✅ Redis connected successfully (Coolify)`
5. **Badge "Site Seguro" aparecendo** 🛡️

---

## 🆘 Suporte

Se algo der errado:
1. Verificar logs no Coolify
2. Testar local com `npm run dev`
3. Verificar variáveis de ambiente
4. Redis tem 2GB RAM mínimo?