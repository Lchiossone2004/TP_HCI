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
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import BalanceCard from './BalanceCard.vue'
import Cards from './Cards.vue'
import AddCard from './AddCard.vue'
import { useCardStore } from '@/stores/CardStore'

const cardStore = useCardStore()
const activeSlide = ref(0)
const emit = defineEmits(['slide-change'])

const slides = computed(() => {
  const cardComponents = cardStore.tarjetas.map((card, index) => ({
    type: Cards,
    props: {
      card,
      onDelete: () => handleDeleteCard(card.id) 
    }
  }))
  
  return [
    { type: BalanceCard },
    ...cardComponents,
    {
      type: AddCard,
      props: {
        'onAdd-card': handleAddCard
      }
    }
  ]
})

const handleAddCard = async (newCard) => {
  try {

    newCard.number = newCard.number.replace(/\s+/g, '')
    
    await cardStore.addCard(newCard)
    
    console.log('Tarjeta agregada exitosamente')
  } catch (error) {
    console.error('Error al agregar tarjeta:', error)
  }
}

const handleDeleteCard = async (cardId) => {
  try {

    await cardStore.deleteCard(cardId)
    
    if (activeSlide.value >= slides.value.length) {
      activeSlide.value = slides.value.length - 1
    }
    
    console.log('Tarjeta eliminada exitosamente')
  } catch (error) {
    console.error('Error al eliminar tarjeta:', error)
  }
}

onMounted(async () => {
  try {
    await cardStore.getCards()
  } catch (error) {
    console.error('Error al cargar tarjetas:', error)
  }
})

watch(() => cardStore.tarjetas, () => {
  if (activeSlide.value >= slides.value.length) {
    activeSlide.value = Math.max(0, slides.value.length - 1)
  }
}, { deep: true })

const nextSlide = () => {
  if (activeSlide.value < slides.value.length - 1) activeSlide.value++
}

const previousSlide = () => {
  if (activeSlide.value > 0) activeSlide.value--
}

const cardIdActual = computed(() => {
  // El slide 0 es el BalanceCard, y el último es AddCard
  // Por lo tanto, las tarjetas están entre el índice 1 y slides.length - 2
  const index = activeSlide.value - 1
  if (index >= 0 && index < cardStore.tarjetas.length) {
    return cardStore.tarjetas[index]?.id
  }
  return null
})

watch(activeSlide, () => {
  emit('slide-change', cardIdActual.value)
})
</script>


<style scoped>
.slider-card {
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

@media (max-width: 500px) {
  .slider-card {
    width: 100%;
    margin: 0 auto;
  }

  .navigation-arrows{
    padding: 0 0.5rem;
  }
}

</style>