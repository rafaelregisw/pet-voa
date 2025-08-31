#!/usr/bin/env node

/**
 * Script para testar e forçar o cache em produção
 * Faz múltiplas requisições para gerar hits e misses
 */

const SITE_URL = 'https://petvoa.com';

async function testCache() {
  console.log('🚀 Iniciando teste de cache em produção...\n');

  // 1. Teste de cache de API
  console.log('📊 Testando cache de API...');
  
  // Usar a MESMA key para testar cache de verdade
  const cacheKey = 'producao-test-petvoa';
  
  // Primeira requisição (MISS - vai pro banco)
  console.time('Primeira requisição /api/test-cache');
  let response = await fetch(`${SITE_URL}/api/test-cache?key=${cacheKey}&force=true`);
  let data = await response.json();
  console.timeEnd('Primeira requisição /api/test-cache');
  console.log(`   Fonte: ${data.source} | Tempo: ${data.loadTime}\n`);

  // Segunda requisição (HIT - do cache)
  console.time('Segunda requisição /api/test-cache (MESMA KEY)');
  response = await fetch(`${SITE_URL}/api/test-cache?key=${cacheKey}`);
  data = await response.json();
  console.timeEnd('Segunda requisição /api/test-cache (MESMA KEY)');
  console.log(`   Fonte: ${data.source} | Tempo: ${data.loadTime}\n`);

  // 2. Teste de stats (usa cache wrapper)
  console.log('📈 Testando cache de stats...');
  
  // Múltiplas requisições para gerar cache
  for (let i = 0; i < 3; i++) {
    console.time(`Requisição ${i + 1} /api/stats`);
    response = await fetch(`${SITE_URL}/api/stats`);
    data = await response.json();
    console.timeEnd(`Requisição ${i + 1} /api/stats`);
    console.log(`   Total views: ${data.total || data.totalViews || 0}`);
  }

  console.log('\n');

  // 3. Rastrear visitas para gerar dados
  console.log('👁️ Rastreando visitas...');
  
  const pages = ['/', '/chat', '/performancedapagina'];
  for (const page of pages) {
    await fetch(`${SITE_URL}/api/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page })
    });
    console.log(`   ✓ Visita registrada: ${page}`);
  }

  console.log('\n');

  // 4. Verificar estatísticas de cache
  console.log('🎯 Verificando estatísticas de cache...');
  
  response = await fetch(`${SITE_URL}/api/redis-status`);
  data = await response.json();
  
  const cacheStats = data.stats?.cacheStats || {};
  console.log(`   Taxa de acerto: ${cacheStats.hitRate || 0}%`);
  console.log(`   Hits: ${cacheStats.hits || 0}`);
  console.log(`   Misses: ${cacheStats.misses || 0}`);
  console.log(`   Tempo economizado: ${cacheStats.savedTime || 0}ms`);
  console.log(`   Total de requisições: ${cacheStats.totalRequests || 0}`);

  // 5. Teste de performance da página
  console.log('\n📄 Testando performance da página...');
  
  console.time('Carregamento da página principal');
  response = await fetch(SITE_URL);
  await response.text();
  console.timeEnd('Carregamento da página principal');
  
  // Verificar headers de cache
  const cacheControl = response.headers.get('cache-control');
  const cacheStrategy = response.headers.get('x-cache-strategy');
  console.log(`   Cache-Control: ${cacheControl || 'não definido'}`);
  console.log(`   X-Cache-Strategy: ${cacheStrategy || 'não definido'}`);

  console.log('\n✅ Teste completo! Acesse https://petvoa.com/performancedapagina para ver os resultados.');
  console.log('💡 Dica: Pressione Ctrl+Shift+C no site para ver o monitor de cache em tempo real.');
}

// Executar teste
testCache().catch(console.error);