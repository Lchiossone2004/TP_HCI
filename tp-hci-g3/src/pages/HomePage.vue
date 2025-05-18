<template>
  <div class="layout">
    <main class="main-content">
      <div class="top-section">
          <OperationsButtons/>
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
import { ref, onMounted,computed } from 'vue';
import { useRouter } from 'vue-router';
import Modal from '@/components/Modal.vue';
import Cards from '@/components/Cards.vue';

const router = useRouter();
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



// Modal control
const closeModal = () => {
  showMyInfoModal.value = false;
  showMoreModal.value = false;
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