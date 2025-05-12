<template>
  <div class="layout">
    <Sidebar /> <!-- aca llamo al sidebar, ya esta definido como componente-->
    <main class="main-content">
      <div class="top-icons">
        <span class="material-symbols-rounded icon">notifications</span>
        <span class="material-symbols-rounded icon">help</span>
      </div>
      <div class="top-section">
        <div class="top-header-row">
          <button class="back-btn" @click="goBack">
            <span class="material-symbols-rounded">arrow_back</span> Volver
          </button>
        </div>
        <!-- Sección de botones (ya existente) -->
        <div class="operations-buttons">
          <OperationsButtons bgColor="#03192c" width="360px" height="300px">
            <div class="grid-container">
              <div class="grid-item">
                <button class="operation-button" @click="showEnterMoneyModal = true">
                  <span class="material-symbols-rounded icon">add</span>
                </button>
                <h4>Ingresar</h4>
              </div>
              <div class="grid-item">
                <button class="operation-button">
                  <span class="material-symbols-rounded icon">sync_alt</span>
                </button>
                <h4>Transferir</h4>
              </div>
              <div class="grid-item">
                <button class="operation-button">
                  <span class="material-symbols-rounded icon">id_card</span>
                </button>
                <h4>Mis datos</h4>
              </div>
              <div class="grid-item">
                <button class="operation-button">
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
            <button class="more-activities">
              <span class="material-symbols-rounded arrow">chevron_right</span>
            </button>
          </div>
          <Activity />
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
            <MonthlyExpensesChart :height="150" />
          </div>

          <!-- Inversiones 2025 -->
          <div class="investments-section">
            <h3>Inversiones 2025</h3>
            <div class="chart-placeholder">
              <canvas ref="investmentsChartRef"></canvas>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Modal 
      v-model="showEnterMoneyModal" 
      title="Ingresar dinero"
      subtitle="Copiar tus datos para transferir desde otra cuenta"
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
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue';
import OperationsButtons from '@/components/OperationsButtons.vue';
import BalanceCard from '@/components/BalanceCard.vue';
import AddCardButton from '@/components/AddCardButton.vue';
import MonthlyExpensesChart from '@/components/MonthlyExpensesChart.vue';
import Swiper from '@/components/Swiper.vue';
import Activity from '@/components/Activity.vue';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { Chart } from 'chart.js/auto';
import { useRouter } from 'vue-router';
import Modal from '@/components/Modal.vue';
import ProfileInfo from '@/components/ProfileInfo.vue';

const router = useRouter();
const investmentsChartRef = ref(null);
let investmentsChartInstance = null;
const isMobile = ref(window.innerWidth <= 1024);
const isVerySmall = ref(window.innerWidth <= 600);
const isMedium = ref(window.innerWidth <= 800);
const showEnterMoneyModal = ref(false);

// Account information that will come from backend
const accountInfo = ref({
  cvu: '0000003100064484890001',
  alias: 'mateo.gorriti'
});

// Function to close modal
const closeModal = () => {
  showEnterMoneyModal.value = false;
};

const handleResize = () => {
  isMobile.value = window.innerWidth <= 1024;
  isVerySmall.value = window.innerWidth <= 600;
  isMedium.value = window.innerWidth <= 800;
};

function goToMovements() {
  router.push('/actividad');
}

const goBack = () => {
  router.back();
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  const ctx = investmentsChartRef.value.getContext('2d');
  investmentsChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Enero', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [{
        label: 'Inversiones',
        data: [0, 10, 20, 15, 30, 40, 35, 50, 60, 70, 80, 90],
        borderColor: '#3B82F6',
        fill: false,
        tension: 0.1,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

// Function to copy text to clipboard
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    // You could add a toast notification here to show "Copied!" message
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};
</script>


<style scoped>
.app {
  display: flex;
}

.main-content {
  margin-left: 21vw;
  padding: 1rem;
  min-height: 100vh;
  background-color: #F1F1F1;
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
  margin-top: 3rem;
}

.top-header-row {
  position: absolute;
  top: -3rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  z-index: 10;
}

.top-icons {
  position: fixed;
  top: 1.5rem;
  right: 2rem;
  display: flex;
  gap: 1.5rem;
  z-index: 1000;
}

.top-icons .material-symbols-rounded {
  font-size: 28px;
  cursor: pointer;
  color: #03192C;
  transition: color 0.2s ease;
}

.top-icons .material-symbols-rounded:hover {
  color: #0a4b85;
}

.back-btn {
  background: none;
  border: none;
  color: #03192C;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.3rem;
  font-weight: bold;
  padding: 0;
}

.back-btn:hover {
  color: #0a4b85;
}

.operations-buttons {
  width: 360px;
  height: 300px;
  flex-shrink: 0;
  background-color: #03192c;
  border-radius: 20px;
}

.operation-button .material-symbols-rounded {
  font-size: 40px; 
  color: white;
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
  font-size: inherit;
}

.grid-item button:hover {
  background-color: #0a4b85; 
}

.grid-item .material-symbols-outlined {
  color: white;
  font-size: 28px;
}
   
.grid-item h4 {
  margin: 0.3rem 0 0;
  font-size: 14px;
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
  height: 15%;
}

.header-activity-card {
  background: #fff;
  font-size: 25px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 0.5rem 1rem 0.1rem 1.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.more-activities {
  background-color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.arrow {
  font-size: 30px;
  color: #03192C;
}

.more-activities:hover {
  background-color: #eaeaea;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.investments-section {
  background-color: #03192C;
  border-radius: 20px;
  padding: 0.75rem;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 85%;
}

.investments-section h3 {
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
}

.chart-placeholder {
  flex: 1;
  min-height: 0;
  height: 100%;
}

.chart-container {
  height: 100%;
  width: 100%;
}

.icon {
  font-size: 18px;
}

.title {
  font-size: 0.9rem;
}

.subtitle {
  font-size: 0.8rem;
}

canvas {
  width: 100% !important;
  height: 100% !important;
  margin: 0 auto;
  display: block;
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
  }

  .investments-section {
    width: 100%;
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

  .top-header-row {
    top: -2rem;
  }

  .top-icons {
    right: 1rem;
  }

  .operations-buttons,
  .balance-and-cards,
  .inner1,
  .inner2,
  .activity-card-outer,
  .investments-section {
    width: 100%;
    max-width: none;
  }
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

.info {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 0;
}

.title {
  font-weight: 600;
  color: #001a33;
  font-size: 1.05rem;
  flex: 1 1 0;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.date-col {
  flex: 0 0 auto;
  font-size: 1rem;
  color: #8ca0b3;
  min-width: 90px;
  text-align: right;
  white-space: nowrap;
  margin-left: 1.5rem;
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

.form-group input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  width: 80%;
  max-width: 300px;
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
  margin: 0 auto;
}

.submit-button:hover {
  background-color: #0a4b85;
}

.account-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
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
</style>

