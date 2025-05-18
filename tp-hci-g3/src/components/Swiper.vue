<template>
  <div class="slider-card">
    <div class="slide-content" :style="{ transform: `translateX(-${activeSlide * 100}%)` }">
      <template v-for="(component, index) in slides" :key="index">
  <div class="slide-wrapper">
    <component :is="component.type" v-bind="component.props" />
  </div>
</template>

    </div>

    <div class="navigation-arrows" v-if="slides.length > 1">
      <button
        class="nav-arrow left"
        :class="{ disabled: activeSlide === 0 }"
        @click="previousSlide"
        :disabled="activeSlide === 0"
      >
        <span class="material-symbols-rounded">chevron_left</span>
      </button>
      <button
        class="nav-arrow right"
        :class="{ disabled: activeSlide === slides.length - 1 }"
        @click="nextSlide"
        :disabled="activeSlide === slides.length - 1"
      >
        <span class="material-symbols-rounded">chevron_right</span>
      </button>
    </div>
  </div>

  <Modal v-model="showAddCardModal" title="Agregar tarjeta">
    <form @submit.prevent="handleAddCard" class="add-card-form">
      <div class="form-group">
        <label>Número de tarjeta</label>
        <input v-model="newCard.number" type="text" placeholder="XXXX XXXX XXXX XXXX" maxlength="19" @input="formatCardNumber" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Vencimiento</label>
          <input v-model="newCard.expiry" type="text" placeholder="MM/YY" maxlength="5" />
        </div>
        <div class="form-group">
          <label>CVV</label>
          <input v-model="newCard.cvv" type="text" placeholder="123" maxlength="3" />
        </div>
      </div>
      <div class="form-group">
        <label>Nombre en la tarjeta</label>
        <input v-model="newCard.name" type="text" placeholder="NOMBRE APELLIDO" />
      </div>
      <div class="button-group">
        <button type="submit" class="submit-button">Agregar</button>
        <button type="button" class="cancel-button" @click="showAddCardModal = false">Cancelar</button>
      </div>
    </form>
  </Modal>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import BalanceCard from './BalanceCard.vue'
import Cards from './Cards.vue'
import AddCardButton from './AddCardButton.vue'
import Modal from './Modal.vue'

const props = defineProps({
  cards: { type: Array, default: () => [] }
})
const emit = defineEmits(['update:cards'])

const activeSlide = ref(0)
const showAddCardModal = ref(false)
const newCard = ref({ number: '', expiry: '', cvv: '', name: '' })
const cardsInternal = ref([...props.cards])

watch(() => props.cards, (val) => {
  cardsInternal.value = [...val]
})

const slides = computed(() => {
  const cardComponents = cardsInternal.value.map((card, index) => ({
    type: Cards,
    props: {
      card,
      onDelete: () => handleDeleteCard(index)
    }
  }))

  return [
    { type: BalanceCard },
    ...cardComponents,
    { type: AddCardButton, props: { onClick: () => showAddCardModal.value = true } }
  ]
})

watch(cardsInternal, (updated) => {
  emit('update:cards', updated)
  if (activeSlide.value >= slides.value.length) {
    activeSlide.value = slides.value.length - 1
  }
  localStorage.setItem('userCards', JSON.stringify(updated))
}, { deep: true })

onMounted(() => {
  const savedCards = localStorage.getItem('userCards')
  if (savedCards) {
    cardsInternal.value = JSON.parse(savedCards)
  }
})

const handleAddCard = () => {
  cardsInternal.value.push({ id: Date.now(), ...newCard.value })
  newCard.value = { number: '', expiry: '', cvv: '', name: '' }
  showAddCardModal.value = false
}

const handleDeleteCard = (index) => {
  cardsInternal.value.splice(index, 1)
}

const formatCardNumber = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  value = value.replace(/(\d{4})/g, '$1 ').trim()
  newCard.value.number = value
}

const nextSlide = () => {
  if (activeSlide.value < slides.value.length - 1) activeSlide.value++
}

const previousSlide = () => {
  if (activeSlide.value > 0) activeSlide.value--
}
</script>


<style scoped>
.slider-card {
  width: 100%;
  height: 300px;
  background-color: var(--dark-blue);
  border-radius: var(--general-radius);
  position: relative;
  overflow: hidden;
}

.slide-content {
  display: flex;
  transition: transform 0.5s ease-in-out;
  height: 100%;
  width: 100%;
}


.slide-wrapper {
  min-width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

:slotted(*) {
  flex-shrink: 0;
}

.navigation-arrows {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.nav-arrow {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.2s ease;
  pointer-events: auto;
}

.nav-arrow:hover:not(.disabled) {
  background-color: rgba(255, 255, 255, 0.2);
}

.nav-arrow.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-arrow span {
  font-size: 25px;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 1rem;
}
.add-card-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.modal-button {
  padding: 12px 20px;
  text-align: left;
  background-color: #f5f5f5;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  transition: background-color 0.2s ease;
  min-width: 100%;
}
.modal-button:hover {
  background-color: #d5d5d5;
}
.form-row {
  display: flex;
  gap: 1rem;
}
.form-row .form-group {
  flex: 1;
}
label {
  font-size: var(--font-text);
  color: var(--dark-blue);
}

input {
  padding: 0.75rem;
  border: 2px solid var(--light-grey);
  border-radius: var(--icon-radius);
  font-size: var(--font-text);
  transition: border-color 0.2s;
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

.submit-button, .cancel-button {
  padding: 0.75rem 2rem;
  border-radius: var(--button-radius);
  border: none;
  font-size: var(--font-text);
  cursor: pointer;
  transition: background-color 0.2s;
}


.cancel-button {
  background: var(--background-grey);
  color: var(--dark-blue);
}

.cancel-button:hover {
  background: var(--light-grey);
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
  width: 100%;
}

.form-group label {
  font-weight: bold;
  color: #03192C;
  font-size: 1.1rem;
  margin-left: 0.5rem;
}
.submit-button {
  background-color: #03192C;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 80%;
  max-width: 300px;
  display: block;
  margin: 0 auto;
}

.submit-button:hover {
  background-color: #0a4b85;
}
</style>