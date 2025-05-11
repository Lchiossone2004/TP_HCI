<template>
  <div class="expenses-chart-container">
    <div class="expenses-chart-header">
      <span class="total">${{ totalExpensesFormatted }}</span>
    </div>
    <canvas ref="chartRef"></canvas>
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

// Categorización
const categoryMap = [
  { key: 'comida', label: 'Comida', icon: 'restaurant', match: ['restaurant', 'Pedidos Ya'] },
  { key: 'compras', label: 'Compras', icon: 'shopping_bag', match: ['shopping_bag'] },
  { key: 'supermercado', label: 'Supermercado', icon: 'shopping_cart', match: ['shopping_cart', 'supermercado'] },
  { key: 'servicios', label: 'Servicios', icon: 'event', match: ['event', 'servicio', 'factura'] },
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
        backgroundColor: ['#1E3A8A', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'],
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
  padding: 1.2rem 1.2rem 1.5rem 1rem;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.expenses-chart-header {
  width: 100%;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.total {
  color: #03192C;
}
canvas {
  width: 100% !important;
  height: 220px !important;
  margin: 0 auto 1rem auto;
  display: block;
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
  padding: 0.6rem 1.2rem;
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
</style>
