<template>
  <div class="layout">
    <Sidebar /> <!-- aca llamo al sidebar, ya esta definido como componente-->
    <main class="main-content">
        <!-- Sección de botones (ya existente) -->
        <OperationsButtons bgColor="#03192c" width="300px" height="250px">
          <div class="grid-container">
            <div class="grid-item">
              <button>
                <span class="material-symbols-rounded icon">add</span>
              </button>
              <h4>Ingresar</h4>
            </div>
            <div class="grid-item">
              <button>
                <span class="material-symbols-rounded icon">sync_alt</span>
              </button>
              <h4>Transferir</h4>
            </div>
            <div class="grid-item">
              <button>
                <span class="material-symbols-rounded icon">id_card</span>
              </button>
              <h4>Mis datos</h4>
            </div>
            <div class="grid-item">
              <button>
                <span class="material-symbols-rounded icon">more_horiz</span>
              </button>
              <h4>Más</h4>
            </div>
          </div>
        </OperationsButtons>

        <!-- Tarjeta de Balance -->
        <BalanceCard />

        <!-- Botón Agregar Tarjeta -->
        <AddCardButton />

        <!-- Actividad reciente -->
        <div class="activity-section">
          <h3>Actividad reciente</h3>
          <div class="activity-list">
            <div class="activity-item">
              <span class="material-symbols-rounded icon">store</span>
              <span>Prüne</span>
              <span>Hoy 19:43</span>
              <span class="amount negative">-$57.800</span>
            </div>
            <div class="activity-item">
              <span class="material-symbols-rounded icon">restaurant</span>
              <span>Pedidos Ya</span>
              <span>Ayer 21:18</span>
              <span class="amount negative">-$17.550</span>
            </div>
            <div class="activity-item">
              <span class="material-symbols-rounded icon">swap_horiz</span>
              <span>Pablo Gomez</span>
              <span>19/9 10:25</span>
              <span class="amount positive">+$57.800</span>
            </div>
            <div class="activity-item">
              <span class="material-symbols-rounded icon">swap_horiz</span>
              <span>Mónica Domínguez</span>
              <span>17/9 15:56</span>
              <span class="amount negative">-$1.525</span>
            </div>
            <div class="activity-item">
              <span class="material-symbols-rounded icon">arrow_upward</span>
              <span>Mateo Gorriti</span>
              <span>17/9 09:28</span>
              <span class="amount positive">+$100.000</span>
            </div>
            <div class="activity-item">
              <span class="material-symbols-rounded icon">swap_horiz</span>
              <span>Pablo Gomez</span>
              <span>15/9 11:32</span>
              <span class="amount positive">+$20.000</span>
            </div>
            <div class="activity-item">
              <span class="material-symbols-rounded icon">shopping_cart</span>
              <span>DISCO CENCOSUD</span>
              <span>13/9 18:37</span>
              <span class="amount negative">-$127.845</span>
            </div>
            <div class="activity-item">
              <span class="material-symbols-rounded icon">swap_horiz</span>
              <span>Pablo Gomez</span>
              <span>12/9 08:01</span>
              <span class="amount positive">+$463</span>
            </div>
          </div>
        </div>

        <!-- Gráfico de Gastos Mensuales -->
        <MonthlyExpensesChart />

        <!-- Inversiones 2025 -->
        <div class="investments-section">
          <h3>Inversiones 2025</h3>
          <div class="chart-placeholder">
            <!-- Placeholder para gráfico de líneas (puedes usar Chart.js aquí también) -->
            <canvas ref="investmentsChartRef"></canvas>
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

  .grid-container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-items: center;
    gap: 1rem;
    text-align: center;
    color: white;
  }

  .grid-item button {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #093256; 
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
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
   
  .main-content {
    margin-left: 220px;
    padding: 2rem;
    min-height: 100vh;
    background-color: #F1F1F1;
  }
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 220px;
    height: 100vh;
    background-color: #03192C;
    color: white;
    padding: 1.5rem;
    box-sizing: border-box;
  }
  .activity-section {
    background-color: #fff;
    border-radius: 10px;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .activity-section h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #1E3A8A;
  }

  .activity-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .activity-item {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr;
    align-items: center;
    font-size: 14px;
  }

  .activity-item .icon {
    font-size: 18px;
    color: #1E3A8A;
  }

  .amount {
    text-align: right;
  }

  .amount.positive {
    color: #22C55E;
  }

  .amount.negative {
    color: #EF4444;
  }

  .investments-section {
    background-color: #03192C;
    border-radius: 10px;
    padding: 1rem;
    color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .investments-section h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .chart-placeholder {
    height: 150px;
  }
</style>