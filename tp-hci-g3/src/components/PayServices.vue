<template>
    <div class="pay-services">
        <div class="payment-form">
        <h2>Pagar servicio</h2>
        <form @submit.prevent="handleSubmit" class="search-form">
            <div class="form-group">
            <label>ID o Link del pago</label>
            <div class="input-container" :class="{ 'error': errors.search }">
                <input 
                v-model="searchQuery"
                type="text"
                placeholder="Ingrese el ID o link del pago"
                >
            </div>
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
            <div class="info-value-container">
                <span class="payment-text">{{ paymentFound.id }}</span>
            </div>
            </div>
            <button @click="showConfirmPayment = true" class="pay-btn">Pagar ahora</button>
        </div>

        <div v-if="error && !errors.search" :class="['notification-message', { 'success': isSuccess, 'error': !isSuccess }]">
            {{ error }}
        </div>
        </div>
        <div class="balance-container">
          <h2 class="title"> Saldo disponible</h2>
          <BalanceCard />
        </div>

  
        <Modal v-model="showConfirmPayment" title="Confirmar pago">
        <div class="confirm-payment">
            <p>¿Está seguro que desea realizar este pago?</p>
            <div class="payment-summary">
            <div class="summary-row">
                <span>Monto:</span>
                <span class="amount">${{ paymentFound?.amount }}</span>
            </div>
            <div class="summary-row">
                <span>ID:</span>
                <span class="payment-text">{{ paymentFound?.id }}</span>
            </div>
            </div>
            <div class="button-group">
            <button @click="confirmPayment" class="confirm-btn">
                Confirmar
            </button>
            <button @click="showConfirmPayment = false" class="cancel-btn">
                Cancelar
            </button>
            </div>
        </div>
        </Modal>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Modal from './Modal.vue'
import BalanceCard from './BalanceCard.vue'
import { useAccountStore } from '@/stores/AccountStore'
import { usePaymentStore } from '@/stores/PaymetStore'

const accountStore = useAccountStore()
const paymentStore = usePaymentStore()

const searchQuery = ref('')
const paymentFound = ref(null)
const error = ref('')
const errors = ref({
  search: ''
})
const showConfirmPayment = ref(false)

const isSuccess = computed(() => error.value === 'Pago procesado exitosamente')

const handleSubmit = async () => {
  errors.value.search = ''
  error.value = ''
  
  if (!searchQuery.value.trim()) {
    errors.value.search = 'Campo vacío, debe ingresar un valor'
    return
  }

  try {
    let code = searchQuery.value
    
    // Si es un link, extraer el código
    if (searchQuery.value.includes('?')) {
      const urlParams = new URLSearchParams(searchQuery.value.split('?')[1])
      code = urlParams.get('code')
    }

    if (!code) {
      error.value = 'Código de pago inválido'
      return
    }

    const payment = await paymentStore.getPaymentByCode(code)
    if (payment) {
      paymentFound.value = payment
      error.value = ''
    }
  } catch (err) {
    error.value = 'No se encontró el pago especificado'
    paymentFound.value = null
    console.error('Error:', err)
  }
}

const processPayment = async () => {
  try {
    if (!paymentFound.value) {
      error.value = 'No hay pago seleccionado'
      return
    }

    if (accountStore.balance < paymentFound.value.amount) {
      error.value = 'Saldo insuficiente, por favor ingrese dinero'
      return
    }

    const code = paymentFound.value.metadata?.code
    await paymentStore.payService(code)
    
    paymentFound.value = null
    searchQuery.value = ''
    error.value = 'Pago procesado exitosamente'
  } catch (err) {
    error.value = err.message || 'Error al procesar el pago'
    console.error('Error:', err)
  }
}

const confirmPayment = () => {
  processPayment()
  showConfirmPayment.value = false
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