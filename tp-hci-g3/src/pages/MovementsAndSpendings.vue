<template>
  <div class="layout">
    <Sidebar />
    <main class="main-content">
      <!-- Top section: header y switch -->
      <div class="top-section">
        <div class="top-header-row">
          <button class="back-btn">
            <span class="material-symbols-rounded">arrow_back</span> Volver
          </button>
          <button class="help-btn">
            <span class="material-symbols-rounded">help</span>
          </button>
        </div>
        <h2 class="main-title">Movimientos y gastos</h2>
        <div class="switch-row">
          <button :class="['switch-btn', { active: isMonth }]" @click="isMonth = true">Mes</button>
          <button :class="['switch-btn', { active: !isMonth }]" @click="isMonth = false">Año</button>
        </div>
      </div>
      <!-- Carrusel de meses o años -->
      <div class="carousel-row">
        <template v-if="isMonth">
          <button class="month-arrow" @click="prevMonth">
            <span class="material-symbols-rounded">arrow_back</span>
          </button>
          <span class="month-label">{{ months[selectedMonth] }}</span>
          <button class="month-arrow" @click="nextMonth">
            <span class="material-symbols-rounded">arrow_forward</span>
          </button>
        </template>
        <template v-else>
          <button class="month-arrow" @click="prevYear" :disabled="selectedYear <= minYear">
            <span class="material-symbols-rounded">arrow_back</span>
          </button>
          <span class="month-label">{{ selectedYear }}</span>
          <button class="month-arrow" @click="nextYear" :disabled="selectedYear >= currentYear">
            <span class="material-symbols-rounded">arrow_forward</span>
          </button>
        </template>
      </div>
      <!-- Buscador (opcional, si lo quieres como en la imagen) -->
      <div class="search-row">
        <input
          v-model="search"
          class="search-input"
          placeholder="Buscar por nombre, fecha, hora..."
        />
      </div>
      <!-- Sección de actividades y gráfico -->
      <div class="bottom-section">
        <div class="activity-col">
          <Activity :activities="filteredActivities" />
        </div>
        <div class="chart-col">
          <MonthlyExpensesChart
            :activities="filteredActivities"
            :mode="isMonth ? 'month' : 'year'"
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
import Sidebar from '@/components/Sidebar.vue'
import Activity from '@/components/Activity.vue'
import MonthlyExpensesChart from '@/components/MonthlyExpensesChart.vue'

// Datos de ejemplo, en la práctica los traerás del usuario logueado
const allActivities = ref([
      { icon: 'shopping_bag', title: 'Prüne', subtitle: 'Hoy 19:43', amount: -57800 },
      { icon: 'restaurant', title: 'Pedidos Ya', subtitle: 'Ayer 21:18', amount: -17550 },
      { icon: 'sync_alt', title: 'Pablo Gomez', subtitle: '19/9 10:25', amount: 57800 },
      { icon: 'sync_alt', title: 'Mónica Domínguez', subtitle: '17/9 15:56', amount: -1525 },
      { icon: 'event', title: 'Mateo Gorriti', subtitle: '17/9 09:28', amount: 100000 },
      { icon: 'sync_alt', title: 'Pablo Gomez', subtitle: '15/9 11:32', amount: 20000 },
      { icon: 'shopping_cart', title: 'DISCO CENCOSUD', subtitle: '13/9 18:37', amount: -127845 },
      { icon: 'sync_alt', title: 'Pablo Gomez', subtitle: '12/9 08:01', amount: 463 },
    ])

const isMonth = ref(true)
const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]
const currentYear = new Date().getFullYear()
const minYear = 2025
const selectedMonth = ref(new Date().getMonth())
const selectedYear = ref(currentYear)
const search = ref('')

// Carrusel lógica
function prevMonth() {
  if (selectedMonth.value > 0) selectedMonth.value--
  else selectedMonth.value = 11
}
function nextMonth() {
  if (selectedMonth.value < 11) selectedMonth.value++
  else selectedMonth.value = 0
}
function prevYear() {
  if (selectedYear.value > minYear) selectedYear.value--
}
function nextYear() {
  if (selectedYear.value < currentYear) selectedYear.value++
}

// Filtrado de actividades
const filteredActivities = computed(() => {
  return allActivities.value.filter(item => {
    // Filtrado por mes/año
    const date = item.date ? new Date(item.date) : null
    let match = true
    if (isMonth.value && date) {
      match = date.getMonth() === selectedMonth.value && date.getFullYear() === selectedYear.value
    } else if (!isMonth.value && date) {
      match = date.getFullYear() === selectedYear.value
    }
    // Filtrado por búsqueda
    if (search.value) {
      const text = `${item.title} ${item.subtitle}`.toLowerCase()
      match = match && text.includes(search.value.toLowerCase())
    }
    return match
  })
})
</script>

<style scoped>

    .top-section {
        background-color: #03192C;
        border-radius: 20px;
        color: white;
        padding: 1.5rem 1.5rem 2.5rem 1.5rem;
        margin-bottom: 1.5rem;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }
    .carousel-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
        margin: 1.2rem 0 2rem 0;
    }
    .month-label {
        font-size: 2rem;
        font-weight: bold;
        color: #03192C;
        min-width: 140px;
        text-align: center;
    }
    .month-arrow {
        background: none;
        border: none;
        color: #193a5e;
        font-size: 2.2rem;
        cursor: pointer;
        border-radius: 50%;
        padding: 0.2rem 0.5rem;
        transition: background 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .month-arrow:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }
    .search-row {
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;
    }
    .search-input {
        width: 100%;
        max-width: 600px;
        border-radius: 999px;
        border: none;
        padding: 0.7rem 1.5rem;
        font-size: 1.1rem;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0,0,0,0.04);
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
</style>
