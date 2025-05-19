<template>
  <div>
    <!-- Slot para personalizar el botón -->
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
          >
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Vencimiento</label>
            <input v-model="newCard.expiry" type="text" placeholder="MM/YY" maxlength="5">
          </div>
          <div class="form-group">
            <label>CVV</label>
            <input v-model="newCard.cvv" type="text" placeholder="123" maxlength="3">
          </div>
        </div>
        <div class="form-group">
          <label>Nombre en la tarjeta</label>
          <input v-model="newCard.name" type="text" placeholder="NOMBRE APELLIDO">
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
import { ref } from 'vue'
import Modal from './Modal.vue'

const emit = defineEmits(['add-card'])
const showModal = ref(false)
const newCard = ref({
  number: '',
  expiry: '',
  cvv: '',
  name: ''
})

const handleAddCard = () => {
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