<template>
  <div class="credit-card">
    <div class="card-header">
      <span class="card-type">{{ getCardType(card.number) }}</span>
      <button class="delete-btn" @click="showConfirmDelete = true">
        <span class="material-symbols-rounded">delete</span>
      </button>
    </div>
    <div class="card-number">
      •••• •••• •••• {{ card.number.slice(-4) }}
    </div>
    <div class="card-footer">
      <div class="card-holder">
        <span class="label">Titular</span>
        <span class="value">{{ card.name }}</span>
      </div>
      <div class="card-expiry">
        <span class="label">Vence</span>
        <span class="value">{{ card.expiry }}</span>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <Modal v-model="showConfirmDelete" title="Confirmar eliminación">
      <div class="confirm-delete">
        <p>¿Está seguro que desea eliminar esta tarjeta?</p>
        <p class="card-info">Terminada en {{ card.number.slice(-4) }}</p>
        <div class="button-group">
          <button class="delete-confirm-btn" @click="handleConfirmDelete">
            Eliminar
          </button>
          <button class="cancel-btn" @click="showConfirmDelete = false">
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Modal from './Modal.vue'

const props = defineProps({
  card: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete'])
const showConfirmDelete = ref(false)

const getCardType = (number) => {
  const firstDigit = number[0]
  if (firstDigit === '4') return 'VISA'
  if (firstDigit === '5') return 'MASTERCARD'
  if (firstDigit === '3') return 'AMERICAN EXPRESS'
  return 'TARJETA'
}

const handleConfirmDelete = () => {
  emit('delete')
  showConfirmDelete.value = false
}
</script>

<style scoped>
.credit-card {
  background: linear-gradient(135deg, var(--dark-blue), #0a4b85);
  border-radius: var(--general-radius);
  padding: 1.5rem;
  width: 360px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--white-text);
  position: relative;
  flex-shrink: 0; /* Prevenir que la tarjeta se encoja */
  margin: 0 auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-type {
  font-size: var(--font-text);
  font-weight: bold;
}

.delete-btn {
  background: none;
  border: none;
  color: var(--white-text);
  opacity: 0.7;
  cursor: pointer;
  transition: opacity 0.2s;
}

.delete-btn:hover {
  opacity: 1;
}

.card-number {
  font-size: var(--font-big);
  letter-spacing: 2px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
}

.card-holder, .card-expiry {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.label {
  font-size: var(--font-mini);
  opacity: 0.7;
}

.value {
  font-size: var(--font-text);
}
.confirm-delete {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.card-info {
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

.delete-confirm-btn:hover {
  background: #ff3333;
}

.cancel-btn {
  background: var(--background-grey);
  color: var(--dark-blue);
}

.cancel-btn:hover {
  background: var(--light-grey);
}

</style>