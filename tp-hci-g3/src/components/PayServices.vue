<template>
  <div class="pay-services">
    <div class="payment-form">
      <h2>Pagar servicio</h2>
      <form @submit.prevent="handleSubmit" class="search-form">
        <div class="form-group">
          <label>ID o Link del pago</label>
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Ingrese el ID o link del pago"
            :class="{ 'error': errors.search }"
          >
          <span class="error-message" v-if="errors.search">{{ errors.search }}</span>
        </div>
        <button type="submit" class="search-btn">Buscar</button>
      </form>

      <div v-if="paymentFound" class="payment-details">
        <h3>Detalles del pago</h3>
        <div class="detail-row">
          <label>Monto:</label>
          <span class="amount">${{ paymentFound.amount }}</span>
        </div>
        <div class="detail-row">
          <label>ID:</label>
          <span>{{ paymentFound.id }}</span>
        </div>
        <button @click="processPayment" class="pay-btn">Pagar ahora</button>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const paymentFound = ref(null)
const error = ref('')
const errors = ref({
  search: ''
})

const searchPayment = () => {
  const pendingPayments = JSON.parse(localStorage.getItem('pendingPayments') || '[]')
  const payment = pendingPayments.find(p => 
    p.id === searchQuery.value || p.link === searchQuery.value
  )

  if (payment) {
    paymentFound.value = payment
    error.value = ''
  } else {
    paymentFound.value = null
    error.value = 'No se encontró el pago especificado'
  }
}

const processPayment = () => {
  const pendingPayments = JSON.parse(localStorage.getItem('pendingPayments') || '[]')
  const updatedPayments = pendingPayments.filter(p => p.id !== paymentFound.value.id)
  localStorage.setItem('pendingPayments', JSON.stringify(updatedPayments))
  
  paymentFound.value = null
  searchQuery.value = ''
  error.value = 'Pago procesado exitosamente'
}

const handleSubmit = () => {
  errors.value.search = ''
  
  if (!searchQuery.value.trim()) {
    errors.value.search = 'Campo vacío, debe ingresar un valor'
    return
  }
  
  searchPayment()
}
</script>

<style scoped>
.pay-services {
  width: 100%;
  max-width: min(600px, 100%);
  margin: 0 auto;
}

.payment-form {
  background: white;
  border-radius: var(--general-radius);
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.search-form {
  margin-top: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid transparent;
  background: var(--background-grey);
  border-radius: var(--input-radius);
  font-size: var(--font-text);
  transition: border-color 0.2s;
}

input.error {
  border-color: var(--error-color);
}

.error-message {
  color: var(--error-color);
  font-size: 0.8rem;
  margin-top: 0.25rem;
  margin-left: 0.5rem;
}

.search-btn, .pay-btn {
  background: var(--dark-blue);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--button-radius);
  cursor: pointer;
  width: 100%;
}

.payment-details {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-grey);
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
}

.amount {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--dark-blue);
}

.error-message {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--error-light);
  color: var(--error-color);
  border-radius: var(--general-radius);
}

.pay-btn {
  margin-top: 1.5rem;
}
</style>