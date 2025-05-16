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
      <div class="no-activity">No hay actividad</div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  activities: {
    type: Array,
    default: () => []
  },
  month: {
    type: Number,
    default: -1
  },
  year: {
    type: Number,
    default: -1
  }
})

function formatAmount(value) {
  const formatted = Math.abs(value).toLocaleString('es-AR')
  return (value > 0 ? '+' : '-') + '$' + formatted
}

function handleClick(item) {
  console.log('Actividad clickeada:', item)
}

const filteredActivities = computed(() => {
  return props.activities.filter(activity => {
    const activityDate = new Date(activity.date)
    const matchesMonth = props.month === -1 || activityDate.getMonth() === props.month
    const matchesYear = props.year === -1 || activityDate.getFullYear() === props.year
    return matchesMonth && matchesYear
  })
})
</script>

<style scoped>
.activity-card {
  background-color: var(--white-inputs);
  border-radius: var(--general-radius);
  padding: 1rem;
  box-sizing: border-box;
  width: 100%;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: var(--general-radius);
  cursor: pointer;
  transition: background-color 0.2s;
}

.activity-item:hover {
  background-color: var(--button-grey-hover);
}

.icon-wrapper {
  background-color: var(--blue-button-hover);
  border-radius: var(--icon-radius);
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
}

.icon {
  color: var(--white-text);
  font-size: var(--icon-little);
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
  color: var(--black-text);
  font-size: var(--font-text);
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.date-col {
  font-size: var(--font-mini);
  color: var(--dark-grey-text);
  text-align: left;
  margin-top: 0.1rem;
}

.amount {
  white-space: nowrap;
  margin-left: auto;
  font-size: var(--font-text);
}

.positive {
  color: var(--green);
}

.negative {
  color: var(--red-danger);
}

.no-activity {
  text-align: center;
  color: var(--dark-grey-text);
  font-size: var(--font-subtitle);
  padding: 2rem 0;
}

@media (max-width: 500px) {
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
    font-size: var(--font-text);
    margin-bottom: 0.1rem;
  }
  
  .date-col {
    width: 100%;
    text-align: left;
    font-size: var(--font-mini);
    margin-top: 0;
  }
}
</style>
