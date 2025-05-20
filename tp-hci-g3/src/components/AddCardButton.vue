<template>
  <div>
    <div @click="showModal = true">
      <slot></slot>
    </div>

    <Modal v-model="showModal" title="Agregar tarjeta">
      <form @submit.prevent="handleAddCard" class="add-card-form">
        <div class="form-group">
          <label>Número de tarjeta</label>
          <input 
            v-model="newCard.number"
            type="text"
            placeholder="XXXX XXXX XXXX XXXX"
            maxlength="19"
            @input="formatCardNumber"
            :class="{ 'error': errors.number }"
          >
          <span class="error-message" v-if="errors.number">{{ errors.number }}</span>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Vencimiento</label>
            <input 
              v-model="newCard.expiry"
              type="text"
              placeholder="MM/YY"
              maxlength="5"
              @input="formatExpiry"
              :class="{ 'error': errors.expiry }"
            >
            <span class="error-message" v-if="errors.expiry">{{ errors.expiry }}</span>
          </div>
          <div class="form-group">
            <label>CVV</label>
            <input 
              v-model="newCard.cvv"
              type="text"
              :placeholder="isAmex ? '1234' : '123'"
              :maxlength="isAmex ? 4 : 3"
              @input="formatCVV"
              :class="{ 'error': errors.cvv }"
            >
            <span class="error-message" v-if="errors.cvv">{{ errors.cvv }}</span>
          </div>
        </div>
        <div class="form-group">
          <label>Nombre en la tarjeta</label>
          <input 
            v-model="newCard.name"
            type="text"
            placeholder="NOMBRE APELLIDO"
            @input="formatName"
            :class="{ 'error': errors.name }"
          >
          <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
        </div>
        <div class="button-group">
          <button type="submit" class="submit-button">Agregar</button>
          <button type="button" class="cancel-button" @click="showModal = false">Cancelar</button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Modal from './Modal.vue'

const emit = defineEmits(['add-card'])
const showModal = ref(false)
const newCard = ref({
  number: '',
  expiry: '',
  cvv: '',
  name: ''
})

const isAmex = computed(() => {
  return newCard.value.number.startsWith('3')
})

const errors = ref({
  number: '',
  expiry: '',
  cvv: '',
  name: ''
})

const validateForm = () => {
  let isValid = true
  errors.value = {
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  }

  // Validar campos vacíos
  if (!newCard.value.number) {
    errors.value.number = 'Campo obligatorio'
    isValid = false
  }
  if (!newCard.value.expiry) {
    errors.value.expiry = 'Campo obligatorio'
    isValid = false
  }
  if (!newCard.value.cvv) {
    errors.value.cvv = 'Campo obligatorio'
    isValid = false
  } else {
    // Validar longitud del CVV según tipo de tarjeta
    const requiredLength = isAmex.value ? 4 : 3
    if (newCard.value.cvv.length !== requiredLength) {
      errors.value.cvv = `El CVV debe tener ${requiredLength} dígitos`
      isValid = false
    }
  }
  if (!newCard.value.name) {
    errors.value.name = 'Campo obligatorio'
    isValid = false
  }

  return isValid
}

const handleAddCard = () => {
  if (!validateForm()) return

  emit('add-card', {
    id: Date.now(),
    ...newCard.value
  })
  newCard.value = { number: '', expiry: '', cvv: '', name: '' }
  showModal.value = false
}

const formatCardNumber = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  value = value.replace(/(\d{4})/g, '$1 ').trim()
  newCard.value.number = value
}

const formatExpiry = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  
  if (value.length >= 2) {
    const month = value.substring(0, 2)
    const year = value.substring(2)
    if (parseInt(month) > 12) {
      errors.value.expiry = 'Mes inválido'
      return
    }
    newCard.value.expiry = month + (year.length ? '/' + year : '')
  } else {
    newCard.value.expiry = value
  }
}

const formatCVV = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  const maxLength = isAmex.value ? 4 : 3
  newCard.value.cvv = value.slice(0, maxLength)
}

const formatName = (event) => {
  newCard.value.name = event.target.value.replace(/[^a-zA-Z\s]/g, '')
}
</script>

<style scoped>
.add-card-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 100%;
}

.form-row {
  display: flex;
  gap: 1rem;
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

label {
  font-size: var(--font-text);
  color: var(--dark-blue);
  font-weight: bold;
  margin-left: 0.5rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--light-grey);
  border-radius: var(--icon-radius);
  font-size: var(--font-text);
  transition: border-color 0.2s;
  box-sizing: border-box;
}

input:focus {
  border-color: var(--blue-link);
  outline: none;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

.submit-button,
.cancel-button {
  padding: 0.75rem 2rem;
  border-radius: var(--button-radius);
  border: none;
  font-size: var(--font-text);
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button {
  background: var(--dark-blue);
  color: var(--white-text);
}

.submit-button:hover {
  background: var(--blue-button-hover);
}

.cancel-button {
  background: var(--background-grey);
  color: var(--dark-blue);
}

.cancel-button:hover {
  background: var(--light-grey);
}

.error {
  border-color: var(--error-color, #dc3545) !important;
}

.error-message {
  color: var(--error-color, #dc3545);
  font-size: 0.8rem;
  margin-top: 0.25rem;
  margin-left: 0.5rem;
}

@media (max-width: 480px) {
  .form-row {
    flex-direction: column;
  }

  .button-group {
    flex-direction: column;
  }

  .submit-button,
  .cancel-button {
    width: 100%;
  }
}
</style>