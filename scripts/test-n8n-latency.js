#!/usr/bin/env node

/**
 * Script para testar latência do webhook n8n
 * Identifica onde está o gargalo de performance
 */

const WEBHOOK_URL = 'https://n8n.petvoa.com/webhook/agente-2025-site';

async function testLatency() {
  console.log('🔍 Testando latência do webhook n8n...\n');
  
  // Teste 1: Ping simples (mensagem pequena)
  console.log('📍 Teste 1: Mensagem pequena');
  const test1Start = Date.now();
  
  try {
    const response1 = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Oi',
        timestamp: new Date().toISOString(),
        userName: 'Teste',
        userPhone: '+55 11 99999-9999',
        sessionId: '5511999999999'
      })
    });
    
    const time1 = Date.now() - test1Start;
    const data1 = await response1.json();
    
    console.log(`⏱️ Tempo total: ${time1}ms`);
    console.log(`📦 Resposta: ${JSON.stringify(data1).substring(0, 100)}...`);
    console.log('');
    
    // Teste 2: Mensagem média
    console.log('📍 Teste 2: Mensagem média');
    const test2Start = Date.now();
    
    const response2 = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Olá, gostaria de saber mais informações sobre o transporte do meu pet para os Estados Unidos',
        timestamp: new Date().toISOString(),
        userName: 'Teste',
        userPhone: '+55 11 99999-9999',
        sessionId: '5511999999999'
      })
    });
    
    const time2 = Date.now() - test2Start;
    const data2 = await response2.json();
    
    console.log(`⏱️ Tempo total: ${time2}ms`);
    console.log(`📦 Resposta: ${JSON.stringify(data2).substring(0, 100)}...`);
    console.log('');
    
    // Teste 3: Múltiplas requisições em sequência
    console.log('📍 Teste 3: 3 requisições em sequência');
    const times = [];
    
    for (let i = 0; i < 3; i++) {
      const start = Date.now();
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Teste ${i + 1}`,
          timestamp: new Date().toISOString(),
          userName: 'Teste',
          userPhone: '+55 11 99999-9999',
          sessionId: '5511999999999'
        })
      });
      
      const time = Date.now() - start;
      times.push(time);
      const data = await response.json();
      console.log(`   ${i + 1}. Tempo: ${time}ms`);
    }
    
    const avgTime = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
    console.log(`\n📊 Tempo médio: ${avgTime}ms`);
    
    // Análise final
    console.log('\n' + '='.repeat(50));
    console.log('📈 ANÁLISE DE PERFORMANCE:');
    console.log('='.repeat(50));
    
    if (avgTime < 500) {
      console.log('✅ Webhook está respondendo RÁPIDO (<500ms)');
      console.log('   → A IA provavelmente está usando modelo leve (nano/turbo)');
    } else if (avgTime < 2000) {
      console.log('⚠️ Webhook está com latência MÉDIA (500-2000ms)');
      console.log('   → Pode ser processamento da IA ou latência de rede');
    } else {
      console.log('❌ Webhook está LENTO (>2000ms)');
      console.log('   → Verificar:');
      console.log('     • Modelo de IA usado (talvez seja muito pesado)');
      console.log('     • Processamento no n8n (muitos nodes?)');
      console.log('     • Latência do servidor');
    }
    
    console.log('\n💡 SUGESTÕES:');
    if (avgTime > 1000) {
      console.log('1. Use GPT-3.5-turbo ou GPT-4o-mini ao invés de modelos pesados');
      console.log('2. Simplifique o workflow do n8n (menos nodes)');
      console.log('3. Configure timeout maior no frontend se necessário');
      console.log('4. Considere usar streaming de resposta');
    } else {
      console.log('✨ Performance está boa! Se ainda parece lento:');
      console.log('   • Verifique a conexão internet do usuário');
      console.log('   • Teste em diferentes navegadores');
      console.log('   • Verifique o console (F12) para outros erros');
    }
    
  } catch (error) {
    console.error('❌ Erro ao testar webhook:', error.message);
    console.log('\nPossíveis problemas:');
    console.log('• Webhook está offline');
    console.log('• URL incorreta');
    console.log('• Problema de CORS');
    console.log('• Timeout muito longo');
  }
}

// Executar teste
console.log('🚀 Iniciando teste de latência...\n');
testLatency();