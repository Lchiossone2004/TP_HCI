<template>
  <div class="layout">
    <main class="main-content">
      <div class="top-section">
        <div class="operations-buttons">
          <OperationsButtons bgColor="var(--azul-oscuro)" width="360px" height="300px">
            <div class="grid-container">
              <div class="grid-item">
                <button class="operation-button">
                  <span class="material-symbols-rounded icon">add</span>
                </button>
                <h4>Ingresar</h4>
              </div>
              <div class="grid-item">
                <button class="operation-button" @click="irATransferencias">
                  <span class="material-symbols-rounded icon">sync_alt</span>
                </button>
                <h4>Transferir</h4>
              </div>
              <div class="grid-item">
                <button class="operation-button" @click="showMyInfoModal = true">
                  <span class="material-symbols-rounded icon">id_card</span>
                </button>
                <h4>Mis datos</h4>
              </div>
              <div class="grid-item">
                <button class="operation-button" @click="showMoreModal = true">
                  <span class="material-symbols-rounded icon">more_horiz</span>
                </button>
                <h4>Más</h4>
              </div>
            </div>
          </OperationsButtons>
        </div>
        <div class="balance-and-cards">
          <Swiper :cards="cards">
            <template #default="{ index }">
              <BalanceCard v-if="index === 0" />
              <Cards 
                v-else-if="index <= cards.length"
                :card="cards[index - 1]"
                @delete="() => handleDeleteCard(index - 1)"
              />
              <AddCardButton 
                v-else-if="index === cards.length + 1"
                @click="showAddCardModal = true" 
              />
            </template>
          </Swiper>
        </div>
      </div>
      <div class="bottom-section">
        <!-- Actividad reciente -->
        <div class="inner1">
          <div class="header-activity-card">
            <span>Actividad reciente</span>
            <button class="more-activities" @click="goToMovements">
              <span class="material-symbols-rounded arrow">chevron_right</span>
            </button>
          </div>
          <Activity :activities="recentActivities" />
        </div>
        <!-- Gráfico de Gastos Mensuales -->
        <div class="inner2">
          <div class="activity-card-outer">
            <div class="header-activity-card">
              <span>Gastos mensuales</span>
              <button class="more-activities" @click="goToMovements">
                <span class="material-symbols-rounded arrow">chevron_right</span>
              </button>
            </div>
            <ExpensesChart 
              :activities="currentMonthActivities"
              :month="currentMonth" 
              :year="currentYear"  
            />
          </div>
        </div>
      </div>
    </main>
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
    <Modal v-model="showMoreModal" title="Más">
      <div class="button-container">
        <button class="modal-button" @click="accion1">
          Cobrar servicios
          <span class="material-icons icon-right">chevron_right</span>
        </button>
        <button class="modal-button" @click="accion2">
          Pagar servicios
          <span class="material-icons icon-right">chevron_right</span>
        </button>
      </div>
      <button class="submit-button" @click="closeModal">Cerrar</button>
    </Modal>
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
import OperationsButtons from '@/components/OperationsButtons.vue';
import BalanceCard from '@/components/BalanceCard.vue';
import AddCardButton from '@/components/AddCardButton.vue';
import ExpensesChart from '@/components/ExpensesChart.vue';
import Swiper from '@/components/Swiper.vue';
import Activity from '@/components/Activity.vue';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { Chart } from 'chart.js/auto';
import { useRouter } from 'vue-router';
import Modal from '@/components/Modal.vue';
import Cards from '@/components/Cards.vue';

const router = useRouter();
const isMobile = ref(window.innerWidth <= 1024);
const isVerySmall = ref(window.innerWidth <= 600);
const isMedium = ref(window.innerWidth <= 800);
const showMyInfoModal = ref(false);
const showMoreModal = ref(false);
const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());

const showAddCardModal = ref(false);
const cards = ref([]);
const newCard = ref({
  number: '',
  expiry: '',
  cvv: '',
  name: ''
});

const handleAddCard = () => {
  cards.value.push({
    id: Date.now(),
    ...newCard.value
  });
  showAddCardModal.value = false;
  newCard.value = { number: '', expiry: '', cvv: '', name: '' };
  localStorage.setItem('userCards', JSON.stringify(cards.value));
};

const handleDeleteCard = (index) => {
  cards.value.splice(index, 1);
  localStorage.setItem('userCards', JSON.stringify(cards.value));
};

const formatCardNumber = (event) => {
  let value = event.target.value.replace(/\D/g, '');
  value = value.replace(/(\d{4})/g, '$1 ').trim();
  newCard.value.number = value;
};

onMounted(() => {
  const savedCards = localStorage.getItem('userCards');
  if (savedCards) {
    cards.value = JSON.parse(savedCards);
  }
});

// Account information
const accountInfo = ref({
  cvu: '0000003100064484890001',
  alias: 'mateo.gorriti'
});

// Modal control
const closeModal = () => {
  showMyInfoModal.value = false;
  showMoreModal.value = false;
};

const handleResize = () => {
  isMobile.value = window.innerWidth <= 1024;
  isVerySmall.value = window.innerWidth <= 600;
  isMedium.value = window.innerWidth <= 800;
};

function goToMovements() {
  router.push({ name: 'Actividad' });
}

function irATransferencias() {
  router.push({ name: 'Transfer' });
}

const accion1 = () => {}
const accion2 = () => {}

const allActivities = ref([
  { icon: 'shopping_bag', title: 'Prüne', subtitle: 'Hoy 19:43', amount: -57800, date: '2025-05-14T19:43:00' },
  { icon: 'restaurant', title: 'Pedidos Ya', subtitle: 'Ayer 21:18', amount: -17550, date: '2025-05-13T21:18:00' },
  { icon: 'sync_alt', title: 'Pablo Gomez', subtitle: '19/9 10:25', amount: 57800, date: '2025-09-19T10:25:00' },
  { icon: 'sync_alt', title: 'Mónica Domínguez', subtitle: '17/9 15:56', amount: -1525, date: '2025-09-17T15:56:00' },
  { icon: 'event', title: 'Mateo Gorriti', subtitle: '17/9 09:28', amount: 100000, date: '2025-09-17T09:28:00' },
  { icon: 'sync_alt', title: 'Pablo Gomez', subtitle: '15/9 11:32', amount: 20000, date: '2025-09-15T11:32:00' },
  { icon: 'shopping_cart', title: 'DISCO CENCOSUD', subtitle: '13/9 18:37', amount: -127845, date: '2025-09-13T18:37:00' },
  { icon: 'sync_alt', title: 'Pablo Gomez', subtitle: '12/9 08:01', amount: 463, date: '2025-09-12T08:01:00' },
])

const recentActivities = computed(() => {
  return [...allActivities.value]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);
});

const currentMonthActivities = computed(() => {
  return allActivities.value.filter(activity => {
    const activityDate = new Date(activity.date);
    return activityDate.getMonth() === currentMonth.value &&
           activityDate.getFullYear() === currentYear.value;
  });
});
</script>

<style scoped>
.app{
  display:flex;
}
.main-content {
  margin-left: 21vw;
  padding: 1rem;
  min-height: 100vh;
  background-color: #eeeeee;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
  width: calc(100% - 21vw);

}

.top-section {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 1rem;
}

.operations-buttons {
  width: 360px;
  height: 300px;
  flex-shrink: 0;
  background-color: #03192c;
  border-radius: 20px;
  margin: 0 auto;
}

.grid-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
  row-gap: 0.8rem;
  column-gap: 0.4rem;
  text-align: center;
  color: white;
  box-sizing: border-box;
}

.grid-item button {
  width: 80px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background-color: #093256;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.grid-item button:hover {
  background-color: #0a4b85;
}

.grid-item .material-symbols-rounded {
  font-size: 35px;
  color: white;
}

.grid-item h4 {
  margin: 0.3rem 0 0;
  font-size: 17px;
}

.balance-and-cards {
  flex: 1;
  height: 300px;
  background-color: #03192C;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 500px;
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

.bottom-section {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  gap: 1rem;
  width: 100%;
}

.inner1 {
  flex: 1;
  min-width: 360px; 
}

.inner2 {
  width: 50%;
  min-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 300px;
  height: 100%;
}

.activity-card-outer {
  width: 100%;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
}

.header-activity-card {
  background: #fff;
  font-size: 25px;
  padding: 1rem 1rem 0.1rem 1.7rem;
  display: flex;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  color: #1f1f1f;
  position: relative;
  z-index: 2;
}

.more-activities {
  background-color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.arrow {
  font-size: 25px;
  color: #03192C;
}

.more-activities:hover {
  background-color: #eaeaea;
}

.activity-card {
  background-color: #FFFF;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  padding: 1rem;
  box-sizing: border-box;
  width: 100%;
}

.enter-money-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
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

.button-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
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

.icon-right {
  font-size: 25px;
}

.modal-button:hover {
  background-color: #d5d5d5;
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

@media (max-width: 1200px) {
  .top-section,
  .bottom-section {
    flex-direction: column;
    align-items: center;
  }

  .balance-and-cards,
  .inner1,
  .inner2 {
    width: 100%;
    min-width: 0;
    max-width: 750px; /* Mismo que en MovementsAndSpendings */
    margin: 0 auto;
  }
}

</style>