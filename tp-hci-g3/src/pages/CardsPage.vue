<template>
  <div class="layout">
    <main class="main-content">
      <div class="header">
        <button class="back-btn" @click="goBack">
          <span class="material-symbols-rounded">arrow_back</span>
          Volver
        </button>
        <h1>Mis Tarjetas</h1>
        <button class="help-btn">
          <span class="material-symbols-rounded">help</span>
        </button>
      </div>

      <div class="cards-section">
        <h2>Billetera Virtual</h2>
        <div class="cards-grid">
          <BalanceCard />
        </div>
      </div>

      <div class="cards-section">
        <div class="section-header">
          <h2>Tarjetas Vinculadas</h2>
          <button class="add-card-btn" @click="showAddCardModal = true">
            <span class="material-symbols-rounded">add</span>
            Agregar tarjeta
          </button>
        </div>
        <div class="cards-grid">
          <Cards 
            v-for="card in cards" 
            :key="card.id" 
            :card="card"
            @delete="handleDeleteCard"
          />
          <AddCardButton v-if="!cards.length" @click="showAddCardModal = true" />
        </div>
      </div>
    </main>

    <!-- Modal para agregar tarjeta -->
    <Modal v-model="showAddCardModal" title="Agregar tarjeta">
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
            <input 
              v-model="newCard.expiry"
              type="text"
              placeholder="MM/YY"
              maxlength="5"
            >
          </div>
          <div class="form-group">
            <label>CVV</label>
            <input 
              v-model="newCard.cvv"
              type="text"
              placeholder="123"
              maxlength="3"
            >
          </div>
        </div>
        <div class="form-group">
          <label>Nombre en la tarjeta</label>
          <input 
            v-model="newCard.name"
            type="text"
            placeholder="NOMBRE APELLIDO"
          >
        </div>
        <div class="button-group">
          <button type="submit" class="submit-button">Agregar</button>
          <button type="button" class="cancel-button" @click="showAddCardModal = false">
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BalanceCard from '@/components/BalanceCard.vue'
import AddCardButton from '@/components/AddCardButton.vue'
import Cards from '@/components/Cards.vue'
import Modal from '@/components/Modal.vue'

const router = useRouter()
const showAddCardModal = ref(false)

const goBack = () => router.back()

// Estado de las tarjetas
const cards = ref([])
const newCard = ref({
  number: '',
  expiry: '',
  cvv: '',
  name: ''
})

// Funciones para manejar las tarjetas
const handleAddCard = () => {
  cards.value.push({
    id: Date.now(),
    ...newCard.value
  })
  showAddCardModal.value = false
  newCard.value = { number: '', expiry: '', cvv: '', name: '' }
}

const handleDeleteCard = (cardId) => {
  cards.value = cards.value.filter(card => card.id !== cardId)
}

// Formateador para número de tarjeta
const formatCardNumber = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  value = value.replace(/(\d{4})/g, '$1 ').trim()
  newCard.value.number = value
}
</script>

<style scoped>
.main-content {
  margin-left: 21vw;
  padding: 2rem;
  min-height: 100vh;
  background-color: var(--background-grey);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.back-btn {
  background: none;
  border: none;
  color: var(--black-text);
  font-size: var(--font-text);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.help-btn {
  background: none;
  border: none;
  color: var(--black-text);
  cursor: pointer;
}

.cards-section {
  background: var(--white-inputs);
  border-radius: var(--general-radius);
  padding: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.add-card-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--dark-blue);
  color: var(--white-text);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--button-radius);
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-card-btn:hover {
  background: var(--blue-button-hover);
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
}

.add-card-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

@media (max-width: 1200px) {
  .main-content {
    padding: 1.5rem;
  }

  .cards-section {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }

  .cards-section {
    padding: 1rem;
  }

  .form-row {
    flex-direction: column;
  }
}
</style>