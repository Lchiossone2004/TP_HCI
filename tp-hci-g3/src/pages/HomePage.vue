<template>
  <div class="layout">
    <Sidebar /> <!-- aca llamo al sidebar, ya esta definido como componente-->
    <main class="main-content">
      <div class="top-section">
      <!-- Sección de botones (ya existente) -->
      <div class="operations-buttons">
      <OperationsButtons bgColor="#03192c" width="360px" height="300px">
        <div class="grid-container">
          <div class="grid-item">
            <button class="operation-button">
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
          <Activity/>
        </div>

        <!-- Gráfico de Gastos Mensuales -->
        <div class="inner2">
          <MonthlyExpensesChart />

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
import { ref, onMounted } from 'vue';
import { Chart } from 'chart.js/auto';

const investmentsChartRef = ref(null);
let investmentsChartInstance = null;

onMounted(() => {
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
    font-size: inherit; /* para no sobreescribir el tamaño del ícono */
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
    gap: 1rem;
    min-width: 300px;
    max-width: calc(100% - 420px); /* 400px de Activity + 1rem de gap */
  }

  .investments-section {
    background-color: #03192C;
    border-radius: 20px;
    padding: 1rem;
    color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .investments-section h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .chart-placeholder {
    flex: 1;
    min-height: 200px;
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

  @media (max-width: 1024px) {
    .top-section {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      width: 100%;
      padding: 0;
    }

    .operations-buttons {
      width: 360px;
      max-width: 360px;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      justify-content: center;
    }

    .balance-and-cards {
      width: 100%;
      max-width: 500px;
    }

    .bottom-section {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      width: 100%;
      padding: 0;
    }

    .inner1,
    .inner2 {
      width: 100%;
      max-width: 500px;
      min-width: unset;
    }

    .inner2 {
      gap: 1rem;
    }
  }


  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 21vw;
    height: 100vh;
    background-color: #03192C;
    color: white;
    padding: 1.5rem;
    box-sizing: border-box;
  }
</style>

