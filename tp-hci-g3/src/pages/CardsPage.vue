<template>
  <div class="layout">
    <main class="main-content">
      <h1 class="header">Mis Tarjetas</h1>
      <div class="cards-section">
        <div class="section-header">
          <h2>Dinero en cuenta</h2>
          <ShowInfoButton>
            <button class="add-money-btn">
              <span class="material-symbols-rounded">add</span>
              Ingresar dinero
            </button>
          </ShowInfoButton>
        </div>
        <div class="balance-container">
          <BalanceCard />
        </div>
      </div>

      <div class="cards-section">
        <div class="section-header">
          <h2>Tarjetas Vinculadas</h2>
          <AddCardButton @add-card="handleAddCard">
            <button class="add-card-btn">
              <span class="material-symbols-rounded">add</span>
              Agregar tarjeta
            </button>
          </AddCardButton>
        </div>
        <div class="cards-container">
          <div v-if="!cards.length" class="no-cards-message">
            No hay tarjetas vinculadas
          </div>
          <div v-else class="cards-grid">
            <Cards
              v-for="(card, index) in cards"
              :key="card.id"
              :card="card"
              @delete="handleDeleteCard(index)"
            />
          </div>
        </div>
      </div>    
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BalanceCard from '@/components/BalanceCard.vue'
import Cards from '@/components/Cards.vue'
import AddCardButton from '@/components/AddCardButton.vue'
import ShowInfoButton from '@/components/ShowInfoButton.vue'

const showMyInfoModal = ref(false)
const cards = ref([])

const accountInfo = ref({
  cvu: '0000003100064484890001',
  alias: 'mateo.gorriti'
})

const handleAddCard = (newCard) => {
  cards.value.push(newCard)
  localStorage.setItem('userCards', JSON.stringify(cards.value))
}

const handleDeleteCard = (index) => {
  cards.value.splice(index, 1)
  localStorage.setItem('userCards', JSON.stringify(cards.value))
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    // Aquí podrías añadir una notificación de éxito
  } catch (err) {
    console.error('Error al copiar:', err)
  }
}

onMounted(() => {
  const savedCards = localStorage.getItem('userCards')
  if (savedCards) {
    cards.value = JSON.parse(savedCards)
  }
})
</script>

<style scoped>
.main-content {
  margin-left: 21vw;
  padding: 1rem;
  min-height: 100vh;
  background-color: var(--background-grey);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.header {
  font-size: var(--font-title);
  color: var(--black-text);
  margin-bottom: 1rem;
}

.cards-section {
  background: var(--dark-blue);
  border-radius: var(--general-radius);
  padding: 2rem;
  color: var(--white-text);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: var(--font-subtitle);
  margin: 0;
}

.add-money-btn,
.add-card-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--blue-button);
  color: var(--white-text);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--button-radius);
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-money-btn:hover,
.add-card-btn:hover {
  background: var(--blue-button-hover);
}

.cards-container {
  min-height: 200px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 2rem;
}

.no-cards-message {
  text-align: center;
  padding: 3rem;
  font-size: var(--font-text);
  color: var(--white-text);
  opacity: 0.7;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-value-container {
  position: relative;
  flex: 1;
}

.info-value {
  display: block;
  width: 100%;
  padding: 0.75rem;
  background-color: var(--background-grey);
  border-radius: var(--icon-radius);
  padding-right: 2.5rem;
}

.copy-icon {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--dark-blue);
}

@media (max-width: 1024px) {
  .cards-grid {
    grid-template-columns: 1fr;
    max-width: 750px;
    margin: 0 auto;
  }
}
</style>