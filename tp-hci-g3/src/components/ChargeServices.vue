<template>
  <div class="collect-services">
    <div class="generate-section">
      <h2>Generar cobro</h2>
      <form @submit.prevent="generatePayment" class="generate-form">
        <div class="form-group">
            <label>Monto a cobrar</label>
            <div class="amount-input" :class="{ 'error': errors.amount }">
            <span class="currency">$</span>
            <input 
                v-model="amount"
                type="number"
                min="1"
                step="0.01"
                placeholder="0.00"
            >
            </div>
            <span class="error-message" v-if="errors.amount">{{ errors.amount }}</span>
        </div>
        <button type="submit" class="submit-btn">Generar cobro</button>
      </form>

      <div v-if="currentPayment" class="payment-info">
        <h3>Información del cobro</h3>
        <div class="info-row">
          <label>ID del pago:</label>
          <div class="copy-container">
            <span>{{ currentPayment.id }}</span>
            <button @click="copyToClipboard(currentPayment.id)" class="copy-btn">
              <span class="material-symbols-rounded">content_copy</span>
            </button>
          </div>
        </div>
        <div class="info-row">
          <label>Link de pago:</label>
          <div class="copy-container">
            <span>{{ currentPayment.link }}</span>
            <button @click="copyToClipboard(currentPayment.link)" class="copy-btn">
              <span class="material-symbols-rounded">content_copy</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="pending-section">
      <h2>Pagos pendientes</h2>
      <div class="pending-list">
        <div v-for="payment in pendingPayments" :key="payment.id" class="pending-card">
          <div class="payment-amount">${{ payment.amount }}</div>
          <div class="payment-details">
            <div class="detail-row">
              <span>ID: {{ payment.id }}</span>
              <button @click="copyToClipboard(payment.id)" class="copy-btn">
                <span class="material-symbols-rounded">content_copy</span>
              </button>
            </div>
            <div class="detail-row">
              <span class="link">{{ payment.link }}</span>
              <button @click="copyToClipboard(payment.link)" class="copy-btn">
                <span class="material-symbols-rounded">content_copy</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const amount = ref('')
const errors = ref({
  amount: ''
})
const currentPayment = ref(null)
const pendingPayments = ref([])

const generatePayment = () => {
  errors.value.amount = ''
  
  if (!amount.value) {
    errors.value.amount = 'Campo vacío, debe ingresar un valor'
    return
  }

  const newPayment = {
    id: generateId(),
    amount: parseFloat(amount.value),
    link: generateLink(),
    timestamp: Date.now()
  }
  
  currentPayment.value = newPayment
  pendingPayments.value.push(newPayment)
  amount.value = ''
  
  localStorage.setItem('pendingPayments', JSON.stringify(pendingPayments.value))
}

const generateId = () => {
  return 'PAY-' + Math.random().toString(36).substr(2, 9).toUpperCase()
}

const generateLink = () => {
  const baseUrl = window.location.origin
  return `${baseUrl}/pay/${generateId()}`
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Error al copiar:', err)
  }
}

onMounted(() => {
  const saved = localStorage.getItem('pendingPayments')
  if (saved) {
    pendingPayments.value = JSON.parse(saved)
  }
})
</script>

<style scoped>
.collect-services {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;
}

.generate-section, .pending-section {
  background: white;
  border-radius: var(--general-radius);
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.generate-form {
  margin-top: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.amount-input {
  display: flex;
  align-items: center;
  background: var(--background-grey);
  border-radius: var(--icon-radius);
  padding: 0.75rem 1rem;
  border: 2px solid transparent;
  transition: border-color 0.2s;
}

.amount-input.error {
  border-color: var(--red-danger);
}

.error-message {
  color: var(--red-danger);
  font-size: 0.8rem;
  margin-top: 0.25rem;
  margin-left: 0.5rem;
}

.currency {
  color: var(--text-grey);
  margin-right: 0.5rem;
}

input {
  border: none;
  background: none;
  font-size: var(--font-text);
  width: 100%;
  border-radius: var(--icon-radius);
}

.submit-btn {
  background: var(--dark-blue);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--button-radius);
  cursor: pointer;
}

.payment-info {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-grey);
}

.info-row {
  margin: 1rem 0;
}

.copy-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--background-grey);
  padding: 0.75rem 1rem;
  border-radius: var(--icon-radius);
  border: 2px solid transparent;
  overflow: hidden;
  word-break: break-all;
}

.copy-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--dark-blue);
}

.pending-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.pending-card {
  background: var(--background-grey);
  padding: 1rem;
  border-radius: var(--general-radius);
}

.payment-amount {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--dark-blue);
  margin-bottom: 0.5rem;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.25rem 0;
}

.link {
  color: var(--text-grey);
  font-size: 0.9rem;
}

@media (max-width: 1300px) {
  .collect-services {
    grid-template-columns: 1fr;
  }

  .generate-section, .pending-section {
    margin-bottom: 1rem;
  }
}

</style>