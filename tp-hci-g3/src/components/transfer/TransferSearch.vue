
<template>
  <div class="search-row">
    <input
      v-model="query"
      class="search-input"
      placeholder="Buscar por CBU, CVU o alias"
      @keyup.enter="emitSearch"
    />
    <input
      v-model.number="monto"
      class="search-input"
      type="number"
      placeholder="Monto"
      min="1"
    />
    <button class="search-btn" @click="emitSearch" :disabled="!query.trim() || !monto">
      Transferir
    </button>
  </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { usePaymentStore  } from '@/stores/PaymetStore'
  
  const query = ref('')
  const monto = ref(null)
  const emit = defineEmits(['search'])
  const paymetStore = usePaymentStore()
  
  function detectTipoEntrada(entrada) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const cvuRegex = /^\d{22}$/
  
    if (emailRegex.test(entrada)) return 'email'
    if (cvuRegex.test(entrada)) return 'cvu'
    return 'alias'
  }
  
  async function transferirPorEmail(email, monto) {
    console.log('Transferir a EMAIL:', email, 'Monto:', monto)
    await paymetStore.transferViaEmail(email,1,"test", monto)
  }
  
  function transferirPorCVU(cvu, monto) {
    console.log('Transferir a CVU:', cvu, 'Monto:', monto)
    // lógica de transferencia por CVU
  }
  
  function transferirPorAlias(alias, monto) {
    console.log('Transferir a ALIAS:', alias, 'Monto:', monto)
    // lógica de transferencia por alias
  }
  
  function emitSearch() {
    const term = query.value.trim()
    if (!term || !monto.value) return
  
    const tipo = detectTipoEntrada(term)
  
    switch (tipo) {
      case 'email':
        transferirPorEmail(term, monto.value)
        break
      case 'cvu':
        transferirPorCVU(term, monto.value)
        break
      case 'alias':
        transferirPorAlias(term, monto.value)
        break
    }
  }
  
  
  </script>
  
  <style scoped>
  .search-panel {
    background: #ffffff;
    border-radius: 16px;
    padding: 1.5rem;
  }
  .search-title {
    color: #1f2937;
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }
  .search-row {
    display: flex;
    gap: 0.5rem;
  }
  .search-input {
    flex: 1;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-size: 1rem;
    background: #dbdbdb;
    color: #1f2937;
    border: 2px solid #ffffff;
    transition: border-color 0.2s;
  }
  .search-input::placeholder {
    color: #aaa;
  }
  .search-input:focus {
    outline: none;
    border-color: #1f2937;
  }
  .search-btn {
    background: #2e7dff;
    color: #fff;
    padding: 0 1rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
  }
  .search-btn:disabled {
    background: #134297;
    cursor: not-allowed;
  }
  .search-btn:hover:enabled {
    background: #1b5edb;
  }
  </style>
  