<template>
  <div class="expenses-chart-container">
    <div class="expenses-chart-header">
      <span class="total">${{ totalExpensesFormatted }}</span>
    </div>
    <div class="chart-legend-row">
      <div class="chart-wrapper">
        <canvas ref="chartRef"></canvas>
      </div>
      <div class="custom-legend">
        <div v-for="(cat, i) in categories" :key="cat.key" class="legend-row">
          <span class="legend-color" :style="{ backgroundColor: chartColors[i] }"></span>
          <span class="material-symbols-rounded legend-icon">{{ cat.icon }}</span>
          <span class="legend-label">{{ cat.label }}</span>
        </div>
      </div>
    </div>
    <div class="categories-list">
      <div
        v-for="cat in categories"
        :key="cat.key"
        class="category-row"
      >
        <span class="material-symbols-rounded category-icon">{{ cat.icon }}</span>
        <span class="category-name">{{ cat.label }}</span>
        <span class="category-amount">${{ formatAmount(cat.amount) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { Chart } from 'chart.js/auto'

const props = defineProps({
  activities: { type: Array, default: () => [] }
})

const chartRef = ref(null)
let chartInstance = null

const chartColors = ['#1E3A8A', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE']

// Categorización
const categoryMap = [
  { key: 'comida', label: 'Comida', icon: 'restaurant', match: ['restaurant', 'Pedidos Ya'] },
  { key: 'compras', label: 'Compras', icon: 'shopping_bag', match: ['shopping_bag'] },
  { key: 'supermercado', label: 'Supermercado', icon: 'shopping_cart', match: ['shopping_cart', 'supermercado'] },
  { key: 'servicios', label: 'Servicios', icon: 'receipt_long', match: ['event', 'servicio', 'factura'] },
  { key: 'varios', label: 'Varios', icon: 'list', match: [] }
]

// Procesa los gastos
const categories = computed(() => {
  const result = categoryMap.map(cat => ({ ...cat, amount: 0 }))
  props.activities.forEach(act => {
    if (act.amount < 0) {
      let found = false
      for (const cat of result) {
        if (cat.match.some(m => act.icon?.toLowerCase().includes(m) || act.title?.toLowerCase().includes(m))) {
          cat.amount += Math.abs(act.amount)
          found = true
          break
        }
      }
      if (!found) {
        result.find(c => c.key === 'varios').amount += Math.abs(act.amount)
      }
    }
  })
  return result
})

const totalExpenses = computed(() =>
  categories.value.reduce((sum, cat) => sum + cat.amount, 0)
)
const totalExpensesFormatted = computed(() =>
  totalExpenses.value.toLocaleString('es-AR')
)

function formatAmount(val) {
  return val.toLocaleString('es-AR')
}

function renderChart() {
  if (chartInstance) chartInstance.destroy()
  const ctx = chartRef.value.getContext('2d')
  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: categories.value.map(c => c.label),
      datasets: [{
        data: categories.value.map(c => c.amount),
        backgroundColor: chartColors,
        borderWidth: 0,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      cutout: '65%'
    }
  })
}

onMounted(renderChart)
watch(categories, renderChart)
</script>

<style scoped>
.expenses-chart-container {
  background: #fff;
  border-radius: 20px;
  padding: 1.5rem;
  box-sizing: border-box;
  width: 100%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra todo horizontalmente */
  position: relative;
}

.expenses-chart-header {
  width: 100%;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.chart-legend-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center; /* ¡Esto centra el bloque chart+leyenda! */
  gap: 2.2rem;
  width: 100%;
}

.chart-wrapper {
  max-width: 180px;
  min-width: 150px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}

.custom-legend {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
}

.legend-row {
  display: flex;
  align-items: center;
  gap: 0.4rem; /* Reduce el espacio entre los elementos */
  font-size: 0.9rem; /* Reduce el tamaño de la fuente */
  font-weight: 600;
}

.legend-color {
  width: 14px; /* Reduce el tamaño del cuadro de color */
  height: 14px;
  border-radius: 4px;
  display: inline-block;
}

.legend-icon {
  font-size: 1rem; /* Reduce el tamaño del ícono */
  color: #1E3A8A;
}

.legend-label {
  color: #03192C;
}
.categories-list {
  width: 100%;
  margin-top: 0.5rem;
}
.category-row {
  display: flex;
  align-items: center;
  background: #f3f6fa;
  border-radius: 999px;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  justify-content: space-between;
  gap: 0.7rem;
}
.category-icon {
  font-size: 1.4rem;
  color: #1E3A8A;
}
.category-name {
  flex: 1;
  margin-left: 0.5rem;
}
.category-amount {
  color: #03192C;
  font-weight: 700;
}
@media (max-width: 600px) {
  .expenses-chart-container {
    min-width: 300px; /* Mínimo ancho del contenedor */
    margin: 0 auto; /* Centra el contenedor */
  }

  .chart-legend-row {
    flex-direction: column; /* Cambia las leyendas a diseño vertical */
    align-items: center;
  }

  .chart-wrapper {
    max-width: 150px; /* Reduce el tamaño del gráfico */
  }

  .custom-legend {
    align-items: center; /* Centra las leyendas */
  }
}
</style>
