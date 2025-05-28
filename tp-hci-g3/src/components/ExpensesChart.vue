<template>
  <div class="activity-card-outer">
    <div class="header-activity-card" v-if="title">
      <span>{{ title }}</span>
      <button v-if="onClickMore" class="more-activities" @click="onClickMore">
        <span class="material-symbols-rounded arrow">chevron_right</span>
      </button>
    </div>

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
            <span class="legend-color" :style="{ backgroundColor: cat.color }"></span>
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
  </div>
</template>


<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { Chart } from 'chart.js/auto'
import { useActivityStore } from '@/stores/ActivityStore'

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
  },
  title: {
    type: String,
    default: ''
  },
  onClickMore: {
    type: Function,
    default: null
  }
})

const activityStore = useActivityStore()
const chartRef = ref(null)
let chartInstance = null

const categoryIcons = {
  'servicios': 'receipt_long',
  'transporte': 'directions_bus',
  'alimentacion': 'restaurant',
  'entretenimiento': 'movie',
  'salud': 'local_hospital',
  'educacion': 'school',
  'otros': 'list'
}

const categories = computed(() => {
  const expensesByCategory = activityStore.getExpensesByCategory(props.month, props.year)
  
  return expensesByCategory.map(({ category, amount, color }) => ({
    key: category,
    label: category.charAt(0).toUpperCase() + category.slice(1),
    amount,
    color,
    icon: categoryIcons[category] || 'list'
  }))
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
        backgroundColor: categories.value.map(c => c.color),
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
  background: var(--white-inputs);
  border-radius: var(--general-radius);
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

}

.expenses-chart-header {
  width: 100%;
  text-align: center;
  font-size: var(--font-big);
  margin-bottom: 1rem;
  color: var(--black-text);
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
  font-size: var(--font-mini);
}

.legend-color {
  width: 14px;
  height: 14px;
  border-radius: var(--icon-radius-mini);
  display: inline-block;
}

.legend-icon {
  font-size: var(--icon-little);
  color: var(--blue-button-hover);
}

.legend-label {
  color: var(--black-text);
}

.categories-list {
  width: 100%;
  margin-top: 1rem;
}

.category-row {
  display: flex;
  align-items: center;
  background: var(--button-grey-hover);
  border-radius: var(--general-radius);
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  font-size: var(--font-text);
  height: 50px;

}

.category-icon {
  background-color: var(--blue-button-hover);
  border-radius: var(--icon-radius);
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white-text);
  font-size: var(--font-subtitle);
  margin-right: 0.75rem;
}

.category-name {
  flex: 1;
  text-align: left;
  color: var(--black-text);

}

.category-amount {
  color: var(--black-text);
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
.activity-card-outer {
  width: 100%;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  padding: 1rem;
  box-sizing: border-box;
}

.header-activity-card {
  font-size: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1f1f1f;
  margin-bottom: 1rem;
}

.more-activities {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.arrow {
  font-size: 25px;
  color: #1f1f1f;
}

</style>