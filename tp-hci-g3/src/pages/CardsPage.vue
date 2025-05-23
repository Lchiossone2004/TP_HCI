<template>
  <div class="layout">
    <main class="main-content">
      <h1 class="header">Mis Tarjetas</h1>
      <div class="cards-section">
        <div class="section-header">
          <h2>Dinero en cuenta</h2>
            <button class="add-money-btn">
              <span class="material-symbols-rounded" @click="handleEnterMoney">add</span>
              Ingresar dinero
            </button>
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
          <div v-if="!cardStore.tarjetas.length" class="no-cards-message">
            No hay tarjetas vinculadas
          </div>
          <div v-else class="cards-grid">
            <Cards
              v-for="card in cardStore.tarjetas"
              :key="card.id"
              :card="card"
              @delete="handleDeleteCard(card.id)"
            />
          </div>
        </div>    
      </div>    
    
    <EnterMoneyModal v-model="mostrarModal" />
  </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import BalanceCard from '@/components/BalanceCard.vue'
import Cards from '@/components/Cards.vue'
import AddCardButton from '@/components/AddCardButton.vue'
import EnterMoneyModal from '@/components/EnterMoneyModal.vue'
import { useCardStore } from '@/stores/CardStore'

const cardStore = useCardStore()
const mostrarModal = ref(false)

const handleAddCard = async (newCard) => {
  try {
    newCard.number = newCard.number.replace(/\s+/g, '')
    await cardStore.addCard(newCard)
    await cardStore.getCards()
  } catch (error) {
    console.error('Error al agregar tarjeta:', error)
  }
}
const handleEnterMoney = () => {
  mostrarModal.value = true
}
const handleDeleteCard = async (id) => {
  try {
    await cardStore.deleteCard(id)
    await cardStore.getCards()
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