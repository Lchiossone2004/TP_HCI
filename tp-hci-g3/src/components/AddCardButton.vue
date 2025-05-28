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
            @input="errors.number = ''; formatCardNumber($event)"
            :class="{ error: errors.number }"
          />
          <span class="error-message" v-if="errors.number">
            {{ errors.number }}
          </span>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Vencimiento</label>
            <input
              v-model="newCard.expirationDate"
              type="text"
              placeholder="MM/YY"
              maxlength="5"
              @input="errors.expirationDate = ''; formatExpiry($event)"
              :class="{ error: errors.expirationDate }"
            />
            <span class="error-message" v-if="errors.expirationDate">
              {{ errors.expirationDate }}
            </span>
          </div>
          <div class="form-group">
            <label>CVV</label>
            <input
              v-model="newCard.cvv"
              type="text"
              :placeholder="isAmex ? '1234' : '123'"
              :maxlength="isAmex ? 4 : 3"
              @input="errors.cvv = ''; formatCVV($event)"
              :class="{ error: errors.cvv }"
            />
            <span class="error-message" v-if="errors.cvv">
              {{ errors.cvv }}
            </span>
          </div>
        </div>

        <div class="form-group">
          <label>Nombre en la tarjeta</label>
          <input
            v-model="newCard.fullName"
            type="text"
            placeholder="NOMBRE APELLIDO"
            @input="errors.fullName = ''; formatName($event)"
            :class="{ error: errors.fullName }"
          />
          <span class="error-message" v-if="errors.fullName">
            {{ errors.fullName }}
          </span>
        </div>

        <div class="form-group">
          <label>Tipo de tarjeta</label>
          <div>
            <label>
              <input
                type="radio"
                value="CREDIT"
                v-model="newCard.type"
                @change="errors.type = ''"
              />
              Crédito
            </label>
            <label>
              <input
                type="radio"
                value="DEBIT"
                v-model="newCard.type"
                @change="errors.type = ''"
              />
              Débito
            </label>
          </div>
          <span class="error-message" v-if="errors.type">
            {{ errors.type }}
          </span>
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
  type: '',
  number: '',
  expirationDate: '',
  fullName: '',
  cvv: '',
  metadata: {},
})

const isAmex = computed(() =>
  newCard.value.number.replace(/\s/g, '').startsWith('3')
)

// estado de errores
const errors = ref({
  number: '',
  expirationDate: '',
  cvv: '',
  fullName: '',
  type: ''
})

const validateForm = () => {
  let isValid = true
  errors.value = { number: '', expirationDate: '', cvv: '', fullName: '', type: '' }

  if (!newCard.value.number) {
    errors.value.number = 'Campo obligatorio'
    isValid = false
  }
  if (!newCard.value.expirationDate) {
    errors.value.expirationDate = 'Campo obligatorio'
    isValid = false
  } else {
    const [month, year] = newCard.value.expirationDate.split('/').map(Number)
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear() % 100
    const currentMonth = currentDate.getMonth() + 1

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      errors.value.expirationDate = 'La tarjeta ha vencido'
      isValid = false
    }
  }
  if (!newCard.value.cvv) {
    errors.value.cvv = 'Campo obligatorio'
    isValid = false
  } else {
    const requiredLength = isAmex.value ? 4 : 3
    if (newCard.value.cvv.length !== requiredLength) {
      errors.value.cvv = `El CVV debe tener ${requiredLength} dígitos`
      isValid = false
    }
  }
  if (!newCard.value.fullName) {
    errors.value.fullName = 'Campo obligatorio'
    isValid = false
  }
  if (!newCard.value.type) {
    errors.value.type = 'Seleccionar el tipo de tarjeta'
    isValid = false
  }

  return isValid
}

const handleAddCard = () => {
  if (!validateForm()) return

  emit('add-card', { ...newCard.value })

  newCard.value = {
    type: '',
    number: '',
    expirationDate: '',
    fullName: '',
    cvv: '',
  }

  showModal.value = false
}

// ---------- Funciones de formato y validación ----------

const formatCardNumber = (event) => {
  // Nuevo: extraer solo dígitos
  let digits = event.target.value.replace(/\D/g, '')
  // Nuevo: agrupar de a 4 dígitos
  const grouped = digits.match(/.{1,4}/g)?.join(' ') || ''
  newCard.value.number = grouped
}

const formatExpiry = (event) => {
  // Nuevo: extraer solo dígitos y límite de 4 caracteres (MMYY)
  let digits = event.target.value.replace(/\D/g, '').slice(0, 4)
  // Nuevo: si ya hay dos dígitos, validar mes y agregar "/"
  if (digits.length >= 2) {
    const month = digits.slice(0, 2)
    const mNum = parseInt(month, 10)
    if (mNum < 1 || mNum > 12) {
      errors.value.expirationDate = 'Mes inválido'
    } else {
      errors.value.expirationDate = ''
    }
    digits = month + (digits.length > 2 ? '/' + digits.slice(2) : '/')
  }
  newCard.value.expirationDate = digits
}

const formatCVV = (event) => {
  // Nuevo: solo dígitos, hasta 4 o 3 según Amex
  const digits = event.target.value.replace(/\D/g, '')
  const max = isAmex.value ? 4 : 3
  newCard.value.cvv = digits.slice(0, max)
}

const formatName = (event) => {
  // Nuevo: solo letras y espacios
  newCard.value.fullName = event.target.value.replace(/[^A-Za-z\s]/g, '')
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
.form-group > div {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-top: 0.5rem;
}

.form-group input[type="radio"] {
  margin-right: 0.5rem;
  accent-color: var(--blue-link); 
}

.form-group label {
  display: flex;
  align-items: center;
  font-weight: normal;
  gap: 0.25rem;
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
  font-size: var(--font-text);
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button {
  background: var(--blue-button);
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
  background: var(--button-grey-hover);
}

.error {
  border-color: var(--red-error-message);
}
.error-message {
  color: var(--red-error-message);
  font-size: var(--font-mini);
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