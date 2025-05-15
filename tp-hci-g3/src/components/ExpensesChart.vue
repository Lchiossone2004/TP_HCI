<template>
  <div class="expenses-chart-container" :class="{ 'simple': simple }">
    <div v-if="!simple" class="expenses-chart-header">
      <span class="total">${{ totalExpensesFormatted }}</span>
    </div>
    <div class="chart-legend-row" :class="{ 'simple': simple }">
      <div class="chart-wrapper">
        <canvas ref="chartRef"></canvas>
      </div>
      <div v-if="!simple" class="custom-legend">
        <div v-for="(cat, i) in categories" :key="cat.key" class="legend-row">
          <span class="legend-color" :style="{ backgroundColor: chartColors[i] }"></span>
          <span class="legend-label">{{ cat.label }}</span>
        </div>
      </div>
    </div>
    <div v-if="!simple" class="categories-list">
      <div v-for="cat in categories" :key="cat.key" class="category-row">
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
  activities: {
    type: Array,
    default: () => []
  },
  month: {
    type: Number,
    default: new Date().getMonth()
  },
  year: {
    type: Number,
    default: new Date().getFullYear()
  },
  simple: {
    type: Boolean,
    default: false
  }
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

// Datos por defecto para el modo simple (HomePage)
const defaultData = computed(() => {
  if (props.activities.length > 0) return props.activities
  return [
    { icon: 'restaurant', title: 'Comida', amount: -30000, date: `${props.year}-${String(props.month + 1).padStart(2, '0')}-01` },
    { icon: 'shopping_cart', title: 'Supermercado', amount: -25000, date: `${props.year}-${String(props.month + 1).padStart(2, '0')}-01` },
    { icon: 'shopping_bag', title: 'Shopping', amount: -20000, date: `${props.year}-${String(props.month + 1).padStart(2, '0')}-01` },
    { icon: 'list', title: 'Varios', amount: -15000, date: `${props.year}-${String(props.month + 1).padStart(2, '0')}-01` },
    { icon: 'receipt_long', title: 'Servicios', amount: -10000, date: `${props.year}-${String(props.month + 1).padStart(2, '0')}-01` }
  ]
})

// Procesa los gastos
const categories = computed(() => {
  const result = categoryMap.map(cat => ({ ...cat, amount: 0 }))
  const activitiesToProcess = props.activities.length > 0 ? props.activities : defaultData.value

  activitiesToProcess.forEach(activity => {
    const activityDate = new Date(activity.date)
    const matchesMonth = props.month === -1 || activityDate.getMonth() === props.month
    const matchesYear = props.year === -1 || activityDate.getFullYear() === props.year

    if (activity.amount < 0 && matchesMonth && matchesYear) {
      let found = false
      for (const cat of result) {
        if (cat.match.some(m => 
          activity.icon?.toLowerCase().includes(m) || 
          activity.title?.toLowerCase().includes(m)
        )) {
          cat.amount += Math.abs(activity.amount)
          found = true
          break
        }
      }
      if (!found) {
        result.find(c => c.key === 'varios').amount += Math.abs(activity.amount)
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
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: props.simple,
          position: 'right',
          labels: {
            boxWidth: 10,
            font: {
              size: 12,
              family: 'Nunito',
              weight: '700'
            },
            color: '#1E3A8A'
          }
        }
      },
      cutout: props.simple ? '50%' : '65%'
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
  align-items: center;
  position: relative;
}

.expenses-chart-container.simple {
  padding: 3rem;
  height: 350px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.expenses-chart-header {
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #001a33;
}

.chart-legend-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 2.5rem;
  width: 100%;
}

.chart-legend-row.simple {
  flex-direction: column;
  align-items: center;
}

.chart-wrapper {
  max-width: 180px;
  min-width: 150px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-wrapper.simple {
  max-width: 100%;
  min-width: 0;
  height: 100%;
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
  gap: 0.4rem;
  font-size: 14px;
  font-weight: 600;
}

.legend-color {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  display: inline-block;
}

.legend-icon {
  font-size: 1rem;
  color: #1E3A8A;
}

.legend-label {
  color: #001a33;
}

.categories-list {
  width: 100%;
  margin-top: 1rem;
}

.category-row {
  display: flex;
  align-items: center;
  background: #f3f6fa;
  border-radius: 20px;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  font-size: 17px;
  font-weight: 600;
  height: 50px;

}

.category-icon {
  background-color: #0d2c4a;
  border-radius: 10px;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  margin-right: 0.75rem;
}

.category-name {
  flex: 1;
  text-align: left;
  color: #001a33;

}

.category-amount {
  color: #001a33;
  font-weight: 700;
}

@media (max-width: 600px) {
  .expenses-chart-container {
    min-width: 300px;
    margin: 0 auto;
  }

  .chart-legend-row {
    flex-direction: column;
    align-items: center;
  }

  .chart-wrapper {
    max-width: 150px;
  }

  .custom-legend {
    align-items: center;
  }
}
</style>