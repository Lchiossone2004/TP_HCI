<template>
  <div class="layout">
    <Sidebar />
    <main class="main-content">
      <div class="top-section">
        <div class="header-activity">
          <button class="back-btn">
            <span class="material-symbols-rounded">arrow_back</span> Volver
          </button>
          <h2>Movimientos y gastos</h2>
          <!-- Aquí puedes poner filtros de mes/año si quieres -->
        </div>
      </div>
      <div class="bottom-section">
        <div class="activity-col">
          <Activity />
        </div>
        <div class="chart-col">
          <MonthlyExpensesChart />
          <!-- Aquí puedes agregar más componentes debajo si quieres -->
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
import Activity from '@/components/Activity.vue'
import MonthlyExpensesChart from '@/components/MonthlyExpensesChart.vue'
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  margin-left: 21vw;
  padding: 1.5rem 2rem;
  min-height: 100vh;
  background-color: #F1F1F1;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-sizing: border-box;
}

.top-section {
  width: 100%;
  margin-bottom: 1rem;
}

.header-activity {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.header-activity h2 {
  font-size: 2.2rem;
  font-weight: bold;
  color: #03192C;
  margin: 0;
}

.back-btn {
  background: none;
  border: none;
  color: #03192C;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
}

.bottom-section {
  display: flex;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
}

.activity-col {
  flex: 1.2;
  min-width: 350px;
  max-width: 600px;
}

.chart-col {
  flex: 1;
  min-width: 300px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .main-content {
    margin-left: 0;
    padding: 1rem;
  }
  .bottom-section {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  .activity-col, .chart-col {
    width: 100%;
    max-width: 600px;
    min-width: unset;
  }
}
</style>