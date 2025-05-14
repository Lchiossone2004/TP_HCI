<template>
  <div class="layout">
    <main class="main-content">
      <div class="top-section">
        <h2 class="main-title">Movimientos y gastos</h2>
        <div class="menu-row">
          <!-- Menú de meses -->
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
          <!-- Menú de años -->
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
          <Activity :activities="filteredActivities" :month="selectedMonth" :year="selectedYear" />
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Activity from '@/components/Activity.vue'
import ExpensesChart from '@/components/ExpensesChart.vue'

const router = useRouter();

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

// Datos de ejemplo con fechas válidas
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

// Filtrado de actividades
const filteredActivities = computed(() => {
  return allActivities.value.filter(activity => {
    const activityDate = new Date(activity.date)
    const matchesMonth = selectedMonth.value === -1 || activityDate.getMonth() === selectedMonth.value
    const matchesYear = selectedYear.value === -1 || activityDate.getFullYear() === selectedYear.value
    const matchesSearch = search.value === '' || 
      `${activity.title} ${activity.subtitle}`.toLowerCase().includes(search.value.toLowerCase())
    
    return matchesMonth && matchesYear && matchesSearch
  })
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
  transition: all 0.2s; /* Cambiado de background a all para animar también el width */
  display: flex;
  min-width: 160px; /* Mantenemos el min-width */
  width: 200px; /* Ancho inicial */
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
  max-width: 750px;
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
    min-width: 350px;
    max-width: 750px;
  }

  .chart-col {
    width: 100%;
    max-width: 750px;
    margin-top: 1rem;
  }
}
</style>