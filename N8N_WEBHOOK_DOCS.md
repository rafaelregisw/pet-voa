# Documentação Webhook Pet Voa - n8n

## Endpoint
```
https://n8n.petvoa.com/webhook/agente-2025-site
```

## Dados RECEBIDOS pelo n8n

### Do ChatBot flutuante:
```json
{
  "message": "Mensagem do usuário",
  "timestamp": "2025-09-01T07:11:33.685Z",
  "userName": "Nome do usuário",
  "userPhone": "+55 62 98327-7788",
  "sessionId": "5562983277788"
}
```

### Do Chat principal (/chat):
```json
{
  "type": "message",
  "message": "Mensagem do usuário",
  "user": {
    "name": "Nome do usuário",
    "phone": "+55 62 98327-7788"
  },
  "timestamp": "2025-09-01T07:11:33.685Z"
}
```

## RESPOSTA esperada do n8n

O código aceita QUALQUER um desses formatos:

### Formato 1 - Recomendado
```json
{
  "reply": "Resposta do agente aqui"
}
```

### Formato 2 - Alternativo
```json
{
  "response": "Resposta do agente aqui"
}
```

### Formato 3 - Campo message
```json
{
  "message": "Resposta do agente aqui"
}
```

### Formato 4 - Campo text
```json
{
  "text": "Resposta do agente aqui"
}
```

### Formato 5 - String direta
```json
"Resposta do agente aqui"
```

## Configuração no n8n

### No node "Respond to Webhook":

1. **Response Code**: 200
2. **Response Body Type**: JSON
3. **Response Body**: 
```json
{
  "reply": "{{ $json.mensagem_do_agente }}"
}
```

Substitua `{{ $json.mensagem_do_agente }}` pelo campo que contém a resposta do seu agente.

## Exemplo de workflow

1. **Webhook** → Recebe dados
2. **Processar** → Agente/IA processa
3. **Respond to Webhook** → Retorna:
```json
{
  "reply": "Olá! Obrigado por entrar em contato. Como posso ajudar com o transporte do seu pet?"
}
```

## Debug

Se não funcionar, verifique o console do navegador (F12) para ver:
- "Resposta do n8n:" - mostra o que está retornando
- Se aparecer erro, verifique se o Response Body é JSON válido

## Teste manual

```bash
curl -X POST https://n8n.petvoa.com/webhook/agente-2025-site \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Teste",
    "userName": "Teste User",
    "userPhone": "+55 11 99999-9999",
    "sessionId": "123456789"
  }'
```

Resposta esperada:
```json
{
  "reply": "Sua resposta aqui"
}
```