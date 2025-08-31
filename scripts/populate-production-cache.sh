#!/bin/bash

echo "🚀 Populando cache em produção..."
echo ""

# Popular o cache com dados de teste
echo "📊 Populando cache com dados..."
curl -s https://petvoa.com/api/populate-cache | jq

echo ""
echo "⏳ Aguardando 2 segundos..."
sleep 2

# Verificar estatísticas
echo ""
echo "📈 Verificando estatísticas de cache..."
curl -s https://petvoa.com/api/redis-status | jq '.stats.cacheStats'

echo ""
echo "✅ Cache populado! Acesse https://petvoa.com/performancedapagina"
echo "💡 Dica: Use Ctrl+Shift+C no site para ver o monitor em tempo real"