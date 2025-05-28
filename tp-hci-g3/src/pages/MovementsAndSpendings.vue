<template>
  <div class="layout">
    <main class="main-content">
      <div class="top-section">
        <h2 class="main-title">Movimientos y gastos</h2>
        <div class="menu-row">
      
          <div class="select-wrapper">
            <select 
              v-model="selectedMonth" 
              class="menu-btn"
              @focus="handleSelectFocus('month')"
              @blur="handleSelectBlur('month')"
            >
              <option v-for="option in monthOptions" 
                      :key="option.value" 
                      :value="option.value">
                {{ option.text }}
              </option>
            </select>
            <span class="material-symbols-rounded arrow-icon" :class="{ 'open': isMonthMenuOpen }">
              expand_more
            </span>
          </div>
        
          <div class="select-wrapper">
            <select 
              v-model="selectedYear" 
              class="menu-btn"
              @focus="handleSelectFocus('year')"
              @blur="handleSelectBlur('year')"
            >
              <option v-for="option in yearOptions" 
                      :key="option.value" 
                      :value="option.value">
                {{ option.text }}
              </option>
            </select>
            <span class="material-symbols-rounded arrow-icon" :class="{ 'open': isYearMenuOpen }">
              expand_more
            </span>
          </div>
        </div>
      </div>
      <div class="bottom-section">
        <div class="activity-col">
          <div class="search-row">
            <input
              v-model="search"
              class="search-input"
              placeholder="Buscar por nombre, fecha, hora..."
            />
          </div>
          <Activity 
            :activities="filteredActivities" 
            :month="selectedMonth" 
            :year="selectedYear" 
            title="Movimientos del mes"
          
          />
        </div>
        <div class="chart-col">
          <ExpensesChart
            :activities="filteredActivities"
            :month="selectedMonth"
            :year="selectedYear"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Activity from '@/components/Activity.vue'
import ExpensesChart from '@/components/ExpensesChart.vue'
import { useActivityStore } from '@/stores/ActivityStore'

const router = useRouter();
const activityStore = useActivityStore();

const goToHome = () => {
  router.back();
};

const isMonthMenuOpen = ref(false)
const isYearMenuOpen = ref(false)

const handleSelectFocus = (menu) => {
  if (menu === 'month') {
    isMonthMenuOpen.value = true
    isYearMenuOpen.value = false
  } else {
    isYearMenuOpen.value = true
    isMonthMenuOpen.value = false
  }
}

const handleSelectBlur = (menu) => {
  if (menu === 'month') {
    isMonthMenuOpen.value = false
  } else {
    isYearMenuOpen.value = false
  }
}

const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]
const monthOptions = [
  { text: 'Todos los meses', value: -1 },
  ...months.map((text, value) => ({ text, value }))
]
const currentYear = new Date().getFullYear()
const minYear = 2025
const yearOptions = computed(() => {
  const years = [{ text: 'Todos los años', value: -1 }]
  for (let y = minYear; y <= currentYear; y++) {
    years.push({ text: y.toString(), value: y })
  }
  return years
})
const selectedMonth = ref(new Date().getMonth())
const selectedYear = ref(currentYear)
const search = ref('')


onMounted(() => {
  activityStore.loadActivities()
})


const filteredActivities = computed(() => {
  let activities = activityStore.getFilteredActivities(selectedMonth.value, selectedYear.value)
  
  if (search.value) {
    const searchTerm = search.value.toLowerCase()
    activities = activities.filter(activity => 
      `${activity.title} ${activity.subtitle}`.toLowerCase().includes(searchTerm)
    )
  }
  
  return activities
})
</script>

<style scoped>
.main-content {
  margin-left: 21vw;
  padding: 1rem;
  min-height: 100vh;
  background-color: #e6e6e6;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
}

.top-section {
  background-color: #03192C;
  border-radius: 20px;
  padding: 4rem 1.5rem 1.5rem 1rem;
  color: white;
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.back-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.3rem;
  font-weight: bold;
}

.back-btn:hover {
  color: #e5e7eb;
}

.help-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.help-btn:hover {
  color: #e5e7eb;
}

.main-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 0.5rem 0 1.2rem 0;
  width: 100%;
}

.menu-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: fit-content;
  margin: 0 auto;
}

.select-wrapper {
  position: relative;
  display: inline-block;
}

.menu-btn {
  appearance: none;
  background: #e5e7eb;
  border: none;
  color: #03192C;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0.5rem 2.5rem 0.5rem 1.5rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s; 
  display: flex;
  min-width: 160px;
  width: 200px; 
}

.menu-btn:hover {
  background: #d1d5db;
}

.arrow-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #03192C;
  pointer-events: none;
  transition: transform 0.2s ease;
}

.arrow-icon.open {
  transform: translateY(-50%) rotate(180deg);
}

.search-row {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  max-width: 750px;
  border-radius: 999px;
  border: none;
  padding: 0.7rem 1.5rem;
  font-size: 1.1rem;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}

.bottom-section {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
  position: relative;
}

.activity-col {
  flex: 1;
  min-width: 350px;
  max-width: 750px;
}

.chart-col {
  flex: 1;
  min-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
}

@media (max-width: 1024px) {
  .bottom-section {
    flex-direction: column;
    align-items: center;
  }

  .activity-col {
    max-width: 750px;
    width: 100%;
  }

  .chart-col {
    width: 100%;
    max-width: 750px;
    margin-top: 1rem;
  }
}
</style>