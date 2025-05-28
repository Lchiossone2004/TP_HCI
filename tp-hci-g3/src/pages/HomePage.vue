<template>
  <div class="layout">
    <main class="main-content">
      <div class="top-section">
          <OperationsButtons/>
        <div class="balance-and-cards">
          <Swiper />
        </div>
      </div>
      <div class="bottom-section">
        <div class="inner1">
          <Activity :activities="recentActivities" :title="'Actividad reciente'" :onClickMore="goToMovements"/>
        </div>
      
        <div class="inner2">
          <ExpensesChart :activities="currentMonthActivities" :month="currentMonth" :year="currentYear" title="Gastos mensuales" :onClickMore="goToMovements"/>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import OperationsButtons from '@/components/OperationsButtons.vue';
import ExpensesChart from '@/components/ExpensesChart.vue';
import Swiper from '@/components/Swiper.vue';
import Activity from '@/components/Activity.vue';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useActivityStore } from '@/stores/ActivityStore';

const router = useRouter();
const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());
const activityStore = useActivityStore();

onMounted(() => {
  activityStore.loadActivities();
});

function goToMovements() {
  router.push({ name: 'Actividad' });
}

const recentActivities = computed(() => {
  return activityStore.getRecentActivities(10);
});

const currentMonthActivities = computed(() => {
  return activityStore.getFilteredActivities(currentMonth.value, currentYear.value);
});

</script>

<style scoped>
.app{
  display:flex;
}
.main-content {
  margin-left: 21vw;
  padding: 1rem;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
  width: calc(100% - 21vw);

}
.top-section {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 0.5rem;
}
.balance-and-cards {
  flex: 1;   
  min-width: 360px;
  height: 300px;
  background-color: #03192C;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-right: 0.5rem;
  box-sizing: border-box;
}

.bottom-section {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  gap: 1rem;
  width: 100%;
}

.inner1 {
  flex: 1;
  min-width: 360px; 
}

.inner2 {
  width: 50%;
  min-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  margin-right: 0.5rem;
}
@media (max-width: 1200px) {
  .top-section,
  .bottom-section {
    flex-direction: column;
    align-items: center;
  }

  .balance-and-cards,
  .inner1,
  .inner2 {
    width: 100%;
    margin-top: 0.5rem;
  }
}
</style>