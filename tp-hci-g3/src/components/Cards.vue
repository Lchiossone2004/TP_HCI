<template>
  <div class="credit-card" :class="cardTypeClass">
    <div class="card-header">
  <div class="left-section">
    <template v-if="cardBrand">
      <img 
        :src="getCardLogo(props.card.number)" 
        :alt="cardBrand" 
        :class="['card-logo', `card-logo-${cardBrand}`]"
      />
    </template>
    <template v-else>
      <span class="material-symbols-rounded generic-icon">credit_card</span>
    </template>

    <span class="card-type">{{ props.card.type }}</span>
  </div>

  <button class="delete-btn" @click="showConfirmDelete = true">
    <span class="material-symbols-rounded">delete</span>
  </button>
</div>



    <div class="card-number">
      •••• •••• •••• {{ card.number.slice(-4) }}
    </div>
    <div class="card-footer">
      <div class="card-holder">
        <span class="value">{{ card.fullName }}</span>
        <span class="expiry">{{ card.expirationDate }}</span>
      </div>
    </div>

    
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
import { ref, computed } from 'vue'
import Modal from './Modal.vue'
import visaLogo from '@/assets/images/cardEmisors/visa.png'
import mastercardLogo from '@/assets/images/cardEmisors/mastercard.png'
import amexLogo from '@/assets/images/cardEmisors/amex.png'

const props = defineProps({
  card: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete'])
const showConfirmDelete = ref(false)

const cardBrand = computed(() => {
  const type = getCardType(props.card.number)
  return type ? type.toLowerCase() : null
})



const getCardType = (number) => {
  if (!number) return null
  const firstDigit = number[0]
  if (firstDigit === '4') return 'visa'
  if (firstDigit === '5') return 'mastercard'
  if (firstDigit === '3') return 'amex'
  return null
}


const getCardLogo = (number) => {
  const firstDigit = number[0]
  if (firstDigit === '4') return visaLogo
  if (firstDigit === '5') return mastercardLogo
  if (firstDigit === '3') return amexLogo
  return '' 
}

const cardTypeClass = computed(() => {
  const type = getCardType(props.card.number)
  return type ? `card-${type}` : 'card-generic'
})



const handleConfirmDelete = () => {
  emit('delete')
  showConfirmDelete.value = false
}
</script>

<style scoped>
.card-generic {
  background: linear-gradient(135deg, #ffffff, #6a6a6a);

}


.credit-card {
  border-radius: var(--general-radius);
  padding: 1.5rem;
  width: 360px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--black-text);
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-visa {
  background: linear-gradient(135deg, #c8b2ff, #5d29ee);
}

.card-mastercard {
  background: linear-gradient(135deg, #FFEC86, #FF7C1D);
}

.card-amex {
  background: linear-gradient(135deg, #b4fff4, #0d809a);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 40px;
}

.card-logo {
  height: 30px;
  object-fit: contain;
}
.card-logo-mastercard {
  height: 40px;
  margin-top: -5px;
}

.card-logo-amex {
  height: 50px;
  margin-top: -10px;
}

.delete-btn {
  background: none;
  border: none;
  color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  transition: color 0.2s;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.card-type {
  font-size: 0.9rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.7);
  position: relative;
  top: -2px;
}

.delete-btn:hover {
  color: rgba(0, 0, 0, 0.9);
  background-color: rgba(0, 0, 0, 0.1);
}

.card-number {
  font-size: 1.4rem;
  letter-spacing: 2px;
  font-family: "Courier New", monospace;
  color: rgba(0, 0, 0, 0.9);
  margin: 1rem 0;
}

.card-footer {
  margin-top: auto;
}

.card-holder {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.value {
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(0, 0, 0, 0.9);
}

.expiry {
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.8);
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
  background: var(--red-button);
}

.cancel-btn {
  background: var(--background-grey);
  color: var(--dark-blue);
}

.cancel-btn:hover {
  background: var(--light-grey);
}

</style>