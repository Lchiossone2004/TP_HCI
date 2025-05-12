<template>
  <div class="activity-card">
    <template v-if="filteredActivities.length > 0">
      <div 
        v-for="(item, index) in filteredActivities" 
        :key="index" 
        class="activity-item"
        @click="handleClick(item)"
      >
        <div class="icon-wrapper">
          <span class="material-symbols-rounded icon">{{ item.icon }}</span>
        </div>
        <div class="info">
          <div class="main-info">
            <div class="title">{{ item.title }}</div>
            <div class="date-col">{{ item.subtitle }}</div>
          </div>
        </div>
        <div 
          class="amount"
          :class="{ positive: item.amount > 0, negative: item.amount < 0 }"
        >
          {{ formatAmount(item.amount) }}
        </div>
      </div>
    </template>
    <template v-else>
      <div class="no-activity">No hay actividad reciente.</div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  activities: {
    type: Array,
    default: () => [
      { icon: 'shopping_bag', title: 'Prüne', subtitle: 'Hoy 19:43', amount: -57800 },
      { icon: 'restaurant', title: 'Pedidos Ya', subtitle: 'Ayer 21:18', amount: -17550 },
      { icon: 'sync_alt', title: 'Pablo Gomez', subtitle: '19/9 10:25', amount: 57800 },
      { icon: 'sync_alt', title: 'Mónica Domínguez', subtitle: '17/9 15:56', amount: -1525 },
      { icon: 'event', title: 'Mateo Gorriti', subtitle: '17/9 09:28', amount: 100000 },
      { icon: 'sync_alt', title: 'Pablo Gomez', subtitle: '15/9 11:32', amount: 20000 },
      { icon: 'shopping_cart', title: 'DISCO CENCOSUD', subtitle: '13/9 18:37', amount: -127845 },
      { icon: 'sync_alt', title: 'Pablo Gomez', subtitle: '12/9 08:01', amount: 463 },
    ]
  },
  mode: {
    type: String,
    default: 'month'
  },
  month: Number,
  year: Number
})

function formatAmount(value) {
  const formatted = Math.abs(value).toLocaleString('es-AR')
  return (value > 0 ? '+' : '-') + '$' + formatted
}

function handleClick(item) {
  // Podés emitir un evento o navegar si querés
  console.log('Actividad clickeada:', item)
}

const filteredActivities = computed(() => props.activities)
</script>

<style scoped>
.activity-card {
  background-color: #fff;
  border-radius: 20px;
  padding: 1rem;
  box-sizing: border-box;
  width: 100%;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.activity-item:hover {
  background-color: #eaeaea;
}

.icon-wrapper {
  background-color: #0d2c4a;
  border-radius: 10px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
}

.icon {
  color: white;
  font-size: 20px;
}

.info {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 0;
}

.main-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
}

.title {
  font-weight: 600;
  color: #001a33;
  font-size: 1.05rem;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.date-col {
  font-size: 0.85rem;
  color: #8ca0b3;
  text-align: left;
  margin-top: 0.1rem;
}

.amount {
  font-weight: bold;
  white-space: nowrap;
  margin-left: auto;
}

.positive {
  color: #00a862;
}

.negative {
  color: #e74c3c;
}

.no-activity {
  text-align: center;
  color: #8ca0b3;
  font-size: 1.1rem;
  padding: 2rem 0;
}

@media (max-width: 700px) {
  .info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.1rem;
  }
  .main-info {
    width: 100%;
    align-items: flex-start;
  }
  .title {
    width: 100%;
    text-align: left;
    font-size: 1rem;
    margin-bottom: 0.1rem;
  }
  .date-col {
    width: 100%;
    text-align: left;
    font-size: 0.8rem;
    margin-top: 0;
  }
}
</style>
