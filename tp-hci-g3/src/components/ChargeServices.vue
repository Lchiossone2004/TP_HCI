<template>
  <div class="collect-services">
    <div class="generate-section">
      <h2>Generar cobro</h2>
      <form @submit.prevent="generatePayment" class="generate-form">
        <div class="form-group">
          <label>Detalle</label>
          <div class="amount-input" :class="{ 'error': errors.amount }">
            <input 
              v-model="description"
              type="text"
              placeholder="detalle"
            >
          </div>
          <span class="error-message" v-if="errors.description">{{ errors.description }}</span>
        </div>
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
          <label>Código único:</label>
          <div class="copy-container">
            <span>{{ currentPayment.uuid }}</span>
            <button @click="copyToClipboard(currentPayment.uuid)" class="copy-btn">
              <span class="material-symbols-rounded">content_copy</span>
            </button>
          </div>
        </div>
        <div class="info-row">
          <label>Monto: </label>
          <span>${{ currentPayment.amount }}</span>
        </div>
        <div class="info-row">
          <label>Concepto: </label>
          <span>{{ currentPayment.description }}</span>
        </div>
      </div>
    </div>

    <div class="pending-section">
      <h2>Pagos pendientes</h2>
      <div class="pending-list">
        <div v-for="payment in pendingPayments" :key="payment.uuid" class="pending-card">
          <div class="payment-amount">Monto: ${{ payment.amount }}</div>
          <div class="payment-details">
            <div class="detail-row">
              <span>Code: {{ payment.uuid }}</span>
              <button @click="copyToClipboard(payment.uuid)" class="copy-btn">
                <span class="material-symbols-rounded">content_copy</span>
              </button>
            </div>
            <div class="detail-row">
              <span>Detalle: {{ payment.description }}</span>
            </div>
            <div class="actions">
              <button 
                @click="deletePendingPayment(payment)"
                class="delete-btn"
                :disabled="isDeleting"
              >
                <span class="material-symbols-rounded">delete</span>
                {{ isDeleting && paymentToDelete?.id === payment.id ? 'Eliminando...' : 'Eliminar' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-snackbar
      v-model="showSnackbar"
      :color="snackbarColor"
      :timeout="3000"
      location="top"
    >
      {{ snackbarText }}
    </v-snackbar>
  </div>
  <Modal v-model="showDeleteDialog" title="Confirmar eliminación">
  <div class="confirm-delete">
    <p>¿Está seguro que desea eliminar este cobro?</p>
    <p class="payment-info">Monto: ${{ paymentToDelete?.amount }} - {{ paymentToDelete?.description }}</p>
    <div class="button-group">
      <button class="delete-confirm-btn" @click="confirmDelete" :disabled="isDeleting">
        {{ isDeleting ? 'Eliminando...' : 'Eliminar' }}
      </button>
      <button class="cancel-btn" @click="showDeleteDialog = false">
        Cancelar
      </button>
    </div>
  </div>
</Modal>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePaymentStore } from '@/stores/PaymetStore'
import Modal from './Modal.vue'

const paymentStore = usePaymentStore()
const loading = ref(false)
const currentPayment = ref(null)
const pendingPayments = ref([])
const amount = ref('')
const description = ref('')
const showSnackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('success')
const showDeleteDialog = ref(false)
const isDeleting = ref(false)
const paymentToDelete = ref(null)

const errors = ref({
  amount: '',
  description: ''
})

const showNotification = (text, color = 'success') => {
  snackbarText.value = text
  snackbarColor.value = color
  showSnackbar.value = true
}

const deletePendingPayment = (payment) => {
  paymentToDelete.value = payment
  showDeleteDialog.value = true
}

const confirmDelete = async () => {
  if (!paymentToDelete.value) return
  
  isDeleting.value = true
  try {
    await paymentStore.deleteServicePayment(paymentToDelete.value.id)
    showNotification('Cobro eliminado exitosamente')
    // Recargar la lista de pagos pendientes
    await loadPendingPayments()
  } catch (error) {
    console.error('Error al eliminar el cobro:', error)
    showNotification(
      'Error al eliminar el cobro. Por favor intente nuevamente.',
      'error'
    )
  } finally {
    isDeleting.value = false
    showDeleteDialog.value = false
    paymentToDelete.value = null
  }
}

const generatePayment = async () => {
  // Reset errors
  errors.value = { amount: '', description: '' }
  
  // Validations
  if (!amount.value) {
    errors.value.amount = 'Campo requerido'
    return
  }
  if (!description.value) {
    errors.value.description = 'Campo requerido'
    return
  }

  loading.value = true
  try {
    const payment = await paymentStore.generateServicePayment(
      amount.value,
      description.value
    )
    
    currentPayment.value = payment
    // Limpiar formulario
    amount.value = ''
    description.value = ''
    
    // Actualizar lista de pagos pendientes
    await loadPendingPayments()
    
    showNotification('Cobro generado exitosamente')
  } catch (error) {
    console.error('Error:', error)
    showNotification(
      'Error al generar el cobro. Por favor intente nuevamente.',
      'error'
    )
  } finally {
    loading.value = false
  }
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    showNotification('Copiado al portapapeles')
  } catch (err) {
    console.error('Error al copiar:', err)
    showNotification('Error al copiar al portapapeles', 'error')
  }
}

const loadPendingPayments = async () => {
  try {
    const payments = await paymentStore.getPendingServicePayments()
    pendingPayments.value = payments
  } catch (error) {
    console.error('Error loading payments:', error)
    showNotification(
      'Error al cargar los pagos pendientes',
      'error'
    )
  }
}

onMounted(loadPendingPayments)
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

.success-message {
  background-color: var(--green);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: var(--icon-radius);
  margin-top: 1rem;
}

.actions {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.delete-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--red-danger);
  color: white;
  border: none;
  border-radius: var(--button-radius);
  cursor: pointer;
  font-size: 0.9rem;
}

.delete-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.delete-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.confirm-delete {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.payment-info {
  color: var(--dark-grey-text);
  font-size: var(--font-text);
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.delete-confirm-btn, .cancel-btn {
  padding: 0.75rem 2rem;
  border-radius: var(--button-radius);
  border: none;
  font-size: var(--font-text);
  cursor: pointer;
  transition: background-color 0.2s;
}

.delete-confirm-btn {
  background: var(--red-danger);
  color: var(--white-text);
}

.delete-confirm-btn:hover:not(:disabled) {
  background: var(--red-button);
}

.delete-confirm-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.cancel-btn {
  background: var(--background-grey);
  color: var(--dark-blue);
}

.cancel-btn:hover {
  background: var(--light-grey);
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