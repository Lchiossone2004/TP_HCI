<template>
  <div class="pay-services">
    <div class="payment-form">
      <h2>Pagar servicio</h2>
      <form @submit.prevent="handleSubmit" class="search-form">
        <div class="form-group">
          <label>Código o Link del pago</label>
          <div class="input-container" :class="{ 'error': errors.search }">
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="Ingrese el código o link"
            >
          </div>
          <span class="error-message" v-if="errors.search">{{ errors.search }}</span>
        </div>
        <button type="submit" class="search-btn">Pagar</button>
      </form>

      <div v-if="error" :class="['notification-message', { 'success': isSuccess, 'error': !isSuccess }]">
        {{ error }}
      </div>
    </div>

    <div class="balance-container">
      <h2 class="title">Saldo disponible</h2>
      <BalanceCard />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BalanceCard from './BalanceCard.vue'
import { useAccountStore } from '@/stores/AccountStore'
import { usePaymentStore } from '@/stores/PaymetStore'

const accountStore = useAccountStore()
const paymentStore = usePaymentStore()

const searchQuery = ref('')
const error = ref('')
const errors = ref({
  search: ''
})

const isSuccess = computed(() => error.value === 'Pago procesado exitosamente')

const handleSubmit = async () => {
  errors.value.search = ''
  error.value = ''

  if (!searchQuery.value.trim()) {
    errors.value.search = 'Debe ingresar un código o URL'
    return
  }

  try {
    let code = searchQuery.value

    if (code.includes('?')) {
      const urlParams = new URLSearchParams(code.split('?')[1])
      code = urlParams.get('code')
    }

    if (!code) {
      error.value = 'Código inválido'
      return
    }

    const payment = await paymentStore.makePayment(code)

    if (!payment) {
      error.value = 'No se encontró el pago'
      return
    }

    if (accountStore.balance < payment.amount) {
      error.value = 'Saldo insuficiente, por favor ingrese dinero'
      return
    }
    error.value = 'Pago procesado exitosamente'
    searchQuery.value = ''

  } catch (err) {
    error.value = err.message || 'Error al procesar el pago'
    console.error('Error:', err)
  }
}
</script>

<style scoped>
.pay-services {
  width: 100%;
  max-width: min(600px, 100%);
  margin: 0 auto;

}
.balance-container {
  background: var(--dark-blue);
  border-radius: var(--general-radius);
  padding: 2rem;
  margin-top: 2rem;
  color: var(--white-text);
}
.payment-form {
  background: white;
  border-radius: var(--general-radius);
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.title {
  margin-bottom: 1rem;
}
.search-form {
  margin-top: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.input-container {
  display: flex;
  align-items: center;
  background: var(--background-grey);
  border-radius: var(--icon-radius);
  border: 2px solid transparent;
  transition: border-color 0.2s;
}

.input-container.error {
  border-color: var(--red-danger);
}

input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  font-size: var(--font-text);
}

input:focus {
  outline: none;
}

.error-message {
  color: var(--red-danger);
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

.pay-btn {
  margin-top: 1.5rem;
}

.info-value-container {
  background: var(--background-grey);
  padding: 0.75rem 1rem;
  border-radius: var(--icon-radius);
  width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.success-message {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--green);
  color: white;
  border-radius: var(--general-radius);
}

.payment-text {
  font-size: var(--font-text);
  font-family: monospace;
  color: var(--dark-grey-text);
}

.confirm-payment {
  padding: 1rem;
  text-align: center;
}

.payment-summary {
  margin: 1.5rem 0;
  padding: 1rem;
  background: var(--background-grey);
  border-radius: var(--icon-radius);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.confirm-btn, .cancel-btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: var(--button-radius);
  cursor: pointer;
  font-size: var(--font-text);
}

.confirm-btn {
  background: var(--dark-blue);
  color: white;
}

.cancel-btn {
  background: var(--background-grey);
  color: var(--dark-blue);
}

.notification-message {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: var(--general-radius);
  color: white;
}

.notification-message.success {
  background: var(--green);
}

.notification-message.error {
  background: var(--red-danger);
}

</style>