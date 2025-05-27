<template>
  <div class="search-title">
    <h2>Transferir a</h2>
  </div>

  <!-- Fila: búsqueda por CBU/CVU/alias -->
  <div class="search-row">
    <input
      v-model="query"
      class="search-input"
      placeholder="Introducir CBU, CVU o alias..."
      @input="errors.query = ''"
      @keyup.enter="emitSearch"
      :class="{ error: errors.query }"
    />
    <span class="error-message" v-if="errors.query">
      {{ errors.query }}
    </span>
  </div>

  <!-- Fila: título opcional -->
  <div class="search-row">
    <input
      v-model="title"
      class="search-input"
      type="text"
      placeholder="Título (opcional)"        
    />
  </div>

  <!-- Fila: monto -->
  <div class="search-row">
    <input
      v-model.number="monto"
      class="search-input"
      type="number"
      placeholder="Monto"
      min="1"
      @input="errors.monto = ''"
      :class="{ error: errors.monto }"
    />
    <span class="error-message" v-if="errors.monto">
      {{ errors.monto }}
    </span>
  </div>

  <!-- Fila: método de pago -->
  <div class="search-row">
    <select
      v-model="cardId"
      class="search-input"
      @change="errors.cardId = ''"
      :class="{ error: errors.cardId }"
    >
      <option disabled value="">Seleccionar un método</option>
      <option value="balance">
        Balance {{ accountStore.balance.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }) }}
      </option>
      <option v-for="card in tarjetas" :key="card.id" :value="card.id">
        {{ card.type }} - ****{{ card.number.slice(-4) }}
      </option>
    </select>
    <span class="error-message" v-if="errors.cardId">
      {{ errors.cardId }}
    </span>
  </div>

  <p v-if="mensajeExito" class="success-message">
    {{ mensajeExito }}
  </p>
  <p v-if="mensajeError" class="error-message">
    {{ mensajeError }}
  </p>
  
  <button class="search-btn" @click="emitSearch">
    Transferir
  </button>

</template>

<script setup>
import { onMounted, ref } from 'vue'
import { usePaymentStore } from '@/stores/PaymetStore'
import { useCardStore } from '@/stores/CardStore'
import { useAccountStore } from '@/stores/AccountStore'

const query = ref('')
const title = ref('')        // Nuevo: estado para el título
const monto = ref('')
const cardId = ref('')
const detalle = ref('')      // Ya existía para descripción libre
const mensajeExito = ref('')
const mensajeError = ref('')

const emit = defineEmits(['search'])
const paymetStore = usePaymentStore()
const cardStore = useCardStore()
const accountStore = useAccountStore()
const tarjetas = ref([])

onMounted(async () => {
  await cardStore.getCards()
  tarjetas.value = cardStore.tarjetas
})

// --- Nuevo: estado de errores de validación ---
const errors = ref({
  query: '',
  monto: '',
  cardId: ''
})

function validate() {
  let isValid = true
  errors.value = { query: '', monto: '', cardId: '' }

  if (!query.value.trim()) {
    errors.value.query = 'Campo obligatorio'
    isValid = false
  }
  if (!monto.value || monto.value <= 0) {
    errors.value.monto = 'Campo obligatorio'
    isValid = false
  }
  if (!cardId.value) {
    errors.value.cardId = 'Seleccionar un método de pago'
    isValid = false
  }
  if (cardId.value === 'balance' && monto.value > accountStore.balance) {
    errors.value.monto = 'No tenés saldo suficiente'
    isValid = false
  }

  return isValid
}

function detectTipoEntrada(entrada) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const cvuRegex = /^\d{22}$/
  const cvuAlphanumericRegex = /^[A-Z0-9]{20}$/

  if (emailRegex.test(entrada)) return 'email'
  if (cvuRegex.test(entrada) || cvuAlphanumericRegex.test(entrada)) return 'cvu'
  return 'alias'
}

async function transferirPorEmail(email, cardId, motivo, monto) {
  try {
    await paymetStore.transferViaEmail(email, cardId, motivo, monto)
    mensajeExito.value = 'Transferencia realizada con éxito'
    resetFormulario()
    setTimeout(() => (mensajeExito.value = ''), 3000)
  } catch (err) {
    mensajeError.value = "Error al hacer la transferecia"
    console.error('Error al transferir por email:', err)
  }
}

async function transferirPorCVU(cvu, cardId, motivo, monto) {
  try {
    await paymetStore.transferViaCVU(cvu, cardId, motivo, monto)
    mensajeExito.value = 'Transferencia realizada con éxito'
    resetFormulario()
    setTimeout(() => (mensajeExito.value = ''), 3000)
  } catch (err) {
    mensajeError.value = "Error al hacer la transferecia"
    console.error('Error al transferir por CVU:', err)
  }
}

async function transferirPorAlias(alias, cardId, motivo, monto) {
  try {
    await paymetStore.transferViaAlias(alias, cardId, motivo, monto)
    mensajeExito.value = 'Transferencia realizada con éxito'
    resetFormulario()
    setTimeout(() => (mensajeExito.value = ''), 3000)
  } catch (err) {
    mensajeError.value = "Error al hacer la transferecia"
    console.error('Error al transferir por alias:', err)
  }
}

function emitSearch() {
  if (!validate()) return

  const term = query.value.trim()

  // Nuevo: combinar título y detalle en un único 'motivo'
  const textoDetalle = detalle.value.trim()
  const textoTitulo = title.value.trim()
  const motivo = textoTitulo
    ? `${textoTitulo}${textoDetalle ? ' - ' + textoDetalle : ''}`
    : textoDetalle

  const idTarjeta = cardId.value === 'balance' ? null : cardId.value
  const tipo = detectTipoEntrada(term)

  switch (tipo) {
    case 'email':
      transferirPorEmail(term, idTarjeta, motivo, monto.value)
      break
    case 'cvu':
      transferirPorCVU(term, idTarjeta, motivo, monto.value)
      break
    case 'alias':
      transferirPorAlias(term, idTarjeta, motivo, monto.value)
      break
  }
}

function resetFormulario() {
  query.value = ''
  title.value = ''         // Nuevo: limpiar título
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
    border-color: var(--blue-link);
  }
  .search-btn {
    background: var(--blue-button);
    color: var(--white-text);
    padding: 1rem;
    border-radius: var(--button-radius);
    font-size: var(--font-text);
    margin-top: 0.75rem;
    cursor: pointer;
    transition: background 0.2s;
  }
  .search-btn:disabled {
    background: #134297;
    cursor: not-allowed;
  }
  .search-btn:hover:enabled {
    background: var(--blue-button-hover);
  }
  .success-message {
  color: var(--green);
  margin-top: 0.5rem;
}
  .error-message{
    color: var(--red);
  margin-top: 0.5rem;
  }

.error {
  border: 2px solid var(--red-error-message);
}
.error-message {
  color: var(--red-error-message);
  font-size: var(--font-mini);
  margin-top: 0.25rem;
}
  </style>
  