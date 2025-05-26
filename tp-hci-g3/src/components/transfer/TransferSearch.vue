
<template>
  <div class="search-title"> <h2>Transferir a</h2></div>
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
  </div>
  <div class="search-row">
    <select v-model="cardId" class="search-input">
    <option disabled value="">Seleccioná un metodo</option>
    <option value="balance">Balance {{ accountStore.balance.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }) }}</option> 
    <option v-for="card in tarjetas" :key="card.id" :value="card.id">
      {{ card.type }} - ****{{ card.number.slice(-4) }}
    </option>
  </select>
    <input
      v-model="detalle"
      class="search-input"
      type="search-input"
      placeholder="detalle"
    />
  </div>
  <button class="search-btn" @click="emitSearch" :disabled="!query.trim() || !monto || !detalle " >Transferir</button>
    <p v-if="mensajeExito" class="success-message">{{ mensajeExito }}</p>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import { usePaymentStore  } from '@/stores/PaymetStore'
  import { useCardStore } from '@/stores/CardStore'
  import { useAccountStore

   } from '@/stores/AccountStore'
  const query = ref('')
  const monto = ref('')
  const cardId = ref('')
  const detalle = ref('')
  const mensajeExito = ref('')

  const emit = defineEmits(['search'])
  const paymetStore = usePaymentStore()
  const cardStore = useCardStore()
  const accountStore = useAccountStore()
  const tarjetas = ref([])

  onMounted(async () => {
    await cardStore.getCards() // Asegurate que exista esta función
    tarjetas.value = cardStore.tarjetas // Asegurate que `cards` esté en el store
    console.log(tarjetas.value)
  })

  function detectTipoEntrada(entrada) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const cvuRegex = /^\d{22}$/
    const cvuAlphanumericRegex = /^[A-Z0-9]{20}$/ // Matches alphanumeric CVU strings
  
    if (emailRegex.test(entrada)) return 'email'
    if (cvuRegex.test(entrada) || cvuAlphanumericRegex.test(entrada)) return 'cvu'
    return 'alias'
  }
  async function transferirPorEmail(email, cardId, detalle, monto) {
  try {
    await paymetStore.transferViaEmail(email, cardId, detalle, monto)
    mensajeExito.value = 'Transferencia realizada con éxito'
    resetFormulario()
    setTimeout(() => mensajeExito.value = '', 3000)
  } catch (err) {
    console.error('Error al transferir por email:', err)
  }
}

async function transferirPorCVU(cvu, cardId, detalle, monto) {
  try {
    await paymetStore.transferViaCVU(cvu, cardId, detalle, monto)
    mensajeExito.value = 'Transferencia realizada con éxito'
    resetFormulario()
    setTimeout(() => mensajeExito.value = '', 3000)
  } catch (err) {
    console.error('Error al transferir por CVU:', err)
  }
}

async function transferirPorAlias(alias, cardId, detalle, monto) {
  try {
    await paymetStore.transferViaAlias(alias, cardId, detalle, monto)
    mensajeExito.value = 'Transferencia realizada con éxito'
    resetFormulario()
    setTimeout(() => mensajeExito.value = '', 3000)
  } catch (err) {
    console.error('Error al transferir por alias:', err)
  }
}
  
  function emitSearch() {
  const term = query.value.trim()
  if (!term || !monto.value) return

  const tipo = detectTipoEntrada(term)

  const idTarjeta = cardId.value === 'balance' ? null : cardId.value

  switch (tipo) {
    case 'email':
      transferirPorEmail(term, idTarjeta, detalle.value, monto.value)
      break
    case 'cvu':
      transferirPorCVU(term, idTarjeta, detalle.value, monto.value)
      break
    case 'alias':
      transferirPorAlias(term, idTarjeta, detalle.value, monto.value)
      break
  }
}

function resetFormulario() {
  query.value = ''
  monto.value = ''
  cardId.value = ''
  detalle.value = ''
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
    gap: 0.75rem;
    margin-top: 0.75rem;
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
    padding: 1rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    margin-top: 0.75rem;
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
  .success-message {
  color: green;
  margin-top: 0.5rem;
  font-weight: bold;
}
  </style>
  