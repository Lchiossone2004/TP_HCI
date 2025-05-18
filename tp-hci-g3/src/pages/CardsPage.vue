<template>
  <div class="layout">
    <main class="main-content">
      <h1 class="header">Mis Tarjetas</h1>
      <div class="cards-section">
        <div class="section-header">
          <h2>Dinero en cuenta</h2>
          <button class="add-money-btn" @click="showMyInfoModal = true">
            <span class="material-symbols-rounded">add</span>
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
          <button class="add-card-btn" @click="showAddCardModal = true">
            <span class="material-symbols-rounded">add</span>
            Agregar tarjeta
          </button>
        </div>
        <div class="cards-container">
          <div v-if="!cards.length" class="no-cards-message">
            No hay tarjetas vinculadas
          </div>
          <div v-else class="cards-grid">
            <Cards 
              v-for="card in cards" 
              :key="card.id" 
              :card="card"
              @delete="handleDeleteCard"
            />
          </div>
        </div>
      </div>
    </main>
        <!-- Modal para ingresar dinero -->
    <Modal v-model="showMyInfoModal" title="Mis datos">
      <div class="enter-money-form">
        <div class="form-group">
          <label for="cvu">CVU</label>
          <div class="info-row">
            <div class="info-value-container">
              <span class="info-value">{{ accountInfo.cvu }}</span>
              <span class="material-symbols-rounded copy-icon" @click="copyToClipboard(accountInfo.cvu)" title="Copiar CVU">content_copy</span>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="alias">Alias</label>
          <div class="info-row">
            <div class="info-value-container">
              <span class="info-value">{{ accountInfo.alias }}</span>
              <span class="material-symbols-rounded copy-icon" @click="copyToClipboard(accountInfo.alias)" title="Copiar Alias">content_copy</span>
            </div>
          </div>
        </div>
        <button class="submit-button" @click="closeModal">Cerrar</button>
      </div>
    </Modal>

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
import Cards from '@/components/Cards.vue'
import Modal from '@/components/Modal.vue'

const router = useRouter()
const showAddCardModal = ref(false)
const showMyInfoModal = ref(false);
const moneyAmount = ref('')

const accountInfo = ref({
  cvu: '0000003100064484890001',
  alias: 'mateo.gorriti'
})

// Función para copiar al portapapeles
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    // Aquí podrías añadir una notificación de éxito si lo deseas
  } catch (err) {
    console.error('Error al copiar:', err)
  }
}

// Función para cerrar el modal
const closeModal = () => {
  showMyInfoModal.value = false
}


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
  padding: 1rem;
  min-height: 100vh;
  background-color: var(--background-grey);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: var(--black-text);
}

.balance-container {
  padding: 2rem;
  display: flex;
  gap: 2rem;
  align-items: center;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 360px); /* Ancho fijo de tarjeta */
  gap: 2rem;
  padding: 2rem;
  justify-content: center; /* Centra las tarjetas horizontalmente */
}

.add-money-btn {
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

.add-money-btn:hover {
  background: var(--blue-button-hover);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem; /* Mismo padding que el contenido */
  margin-bottom: 0; /* Quitamos el margin bottom */
  color: var(--white-text);
}

.cards-section {
  background: var(--dark-blue);
  border-radius: var(--general-radius);
  padding-top: 2rem; /* Movemos el padding al top */
  color: var(--white-text);
}

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

.add-card-btn:hover {
  background: var(--blue-button-hover);
}

.cards-container {
  min-height: 200px; /* altura mínima para mostrar el mensaje */
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-cards-message {
  color: var(--white-text);
  font-size: var(--font-subtitle);
  opacity: 0.7;
  text-align: center;
  padding: 2rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
  width: 100%;
}

.add-card-form,
.enter-money-form {
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

label {
  font-size: var(--font-text);
  color: var(--dark-blue);
}

input {
  width: 100%;
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

.cancel-button {
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
  width: 100%;
}

.form-group label {
  font-weight: bold;
  color: #03192C;
  font-size: 1.1rem;
  margin-left: 0.5rem;
}

.info-row {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 0.5rem;
}

.info-value-container {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

.info-value {
  color: #666666;
  font-family: monospace;
  font-size: 0.9rem;
  background-color: #f5f5f5;
  padding: 0.5rem;
  border-radius: 4px;
  width: 100%;
  text-align: left;
  padding-right: 2.5rem;
}

.copy-icon {
  color: #03192C;
  cursor: pointer;
  font-size: 1.2rem;
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.copy-icon:hover {
  background-color: #e0e0e0;
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

.modal-overlay {
  position: fixed;
  left: 43vw; /* Alineado con el contenido principal */
  background-color: #00000080;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: var(--general-radius);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 1.5rem;
  position: relative;
  margin: 1rem;
}

@media (max-width: 1200px) {
  .main-content {
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .modal-overlay {
    left: 0; /* En móvil, el modal ocupa toda la pantalla */
  }

  .modal-content {
    width: 95%;
    padding: 1rem;
  }
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
    max-width: none;
  }
}
</style>