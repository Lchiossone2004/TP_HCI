<template>
  <div class="layout">
    <main class="main-content">
      <div class="top-section">
        <div class="operations-buttons">
          <OperationsButtons bgColor=var(--azul-oscuro) width="360px" height="300px">
            <div class="grid-container">
              <div class="grid-item">
                <button class="operation-button">
                  <span class="material-symbols-rounded icon">add</span>
                </button>
                <h4>Ingresar</h4>
              </div>
              <div class="grid-item">
                <button class="operation-button" @click="irATransferencias" >
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
          <Swiper>
            <BalanceCard />
            <AddCardButton />
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
    <Modal 
      v-model="showMyInfoModal" 
      title="Mis datos"
     
    >
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

const router = useRouter();
const isMobile = ref(window.innerWidth <= 1024);
const isVerySmall = ref(window.innerWidth <= 600);
const isMedium = ref(window.innerWidth <= 800);
const showMyInfoModal = ref(false);
const showMoreModal = ref(false);
const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());

// Account information that will come from backend
const accountInfo = ref({
  cvu: '0000003100064484890001',
  alias: 'mateo.gorriti'
});

// Function to close modal
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
  router.push({ name: 'Transfer' }); // Usa el nombre de la ruta en lugar de la ruta directa
}


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

// Filtrar últimas 10 actividades para "Actividad reciente"
const recentActivities = computed(() => {
  return [...allActivities.value]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);
});

// Filtrar actividades del mes actual para el chart
const currentMonthActivities = computed(() => {
  return allActivities.value.filter(activity => {
    const activityDate = new Date(activity.date);
    return activityDate.getMonth() === currentMonth.value &&
           activityDate.getFullYear() === currentYear.value;
  });
});

</script>

<style scoped>
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
}

.top-section {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 1rem;
  max-width: 1100px;
  position: relative;
  margin-top: 0;
}

.operations-buttons {
  width: 360px;
  height: 300px;
  flex-shrink: 0;
  background-color: #03192c;
  border-radius: 20px;
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
  min-width: 300px;
  max-width: calc(100% - 380px);
}

.bottom-section {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
  max-width: 1100px;
}

.inner1 {
  flex: 1;
  min-width: 500px;
}

.inner2 {
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 300px;
  max-width: calc(100% - 420px);
  height: 100%;
}

.activity-card-outer {
  width: 100%;
  max-width: 700px;
  background: #fff;
  border-radius: 20px;
  overflow: hidden; /* Asegura que el contenido no sobresalga de los bordes redondeados */
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
  position: relative; /* Para que se superponga al chart */
  z-index: 2; /* Asegura que el header esté por encima del chart */
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
  max-width: 700px;
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

@media (max-width: 1024px) {
  .main-content {
    margin-left: 21vw;
    padding: 1rem;
    min-height: 100vh;
    background-color: #e6e6e6;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    width: 100%;
  }

  .top-section {
    width: 100%;
    max-width: 500px;
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .operations-buttons {
    width: 100%;
    max-width: 500px;
    margin: 0;
  }

  .balance-and-cards {
    width: 100%;
    max-width: 500px;
  }

  .bottom-section {
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .inner1, .inner2 {
    width: 100%;
    max-width: 500px;
  }

  .activity-card-outer {
    width: 100%;
    max-width: 500px;
  }
}

@media (max-width: 600px) {
  .main-content {
    margin-left: 0;
    padding: 0.5rem;
  }

  .top-section {
    margin-top: 2rem;
  }

  .operations-buttons,
  .balance-and-cards,
  .inner1,
  .inner2,
  .activity-card-outer{
    width: 100%;
    max-width: none;
  }
}
</style>

