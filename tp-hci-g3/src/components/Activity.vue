<template>
  <div class="activity-card-outer">
    <div class="header-activity-card">
      <span>{{ title }}</span>
      <button
        v-if="onClickMore"
        type="button"
        class="more-activities"
        @click="onClickMore"
      >
        <span class="material-symbols-rounded arrow">chevron_right</span>
      </button>
    </div>

    <ul v-if="filteredActivities.length" class="activity-list">
      <li
        v-for="(item, index) in filteredActivities"
        :key="index"
        class="activity-item"
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
          :class="{ negative: item.amount < 0, positive: item.amount >= 0 }"
        >
          {{ formatAmount(item) }}
        </div>
      </li>
    </ul>

    <div v-else class="no-activity">No hay actividad</div>
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
  },
  title: {
    type: String,
    default: 'Actividad'
  },
  onClickMore: {
    type: Function,
    default: null
  }
})

function formatAmount(item) {
  return `${item.amount < 0 ? '-' : '+'}${item.formattedAmount}`
}

const filteredActivities = computed(() =>
  props.activities.filter(activity => {
    const d = new Date(activity.date)
    const okMonth = props.month === -1 || d.getMonth() === props.month
    const okYear  = props.year  === -1 || d.getFullYear() === props.year
    return okMonth && okYear
  })
)
</script>

<style scoped>
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
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.arrow {
  font-size: 25px;
  color: #1f1f1f;
}

.activity-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 12px;
  transition: background-color 0.2s;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.date-col {
  font-size: var(--font-mini);
  color: var(--dark-grey-text);
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
  .title,
  .date-col {
    width: 100%;
  }
}
</style>
