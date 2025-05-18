<template>
  <div class="layout">
    <main class="main-content">
      <div class="top-section">
          <OperationsButtons/>
        <div class="balance-and-cards">
          <Swiper :cards="cards"/>
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
import { ref, onMounted,computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());

function goToMovements() {
  router.push({ name: 'Actividad' });
}

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

const recentActivities = computed(() => {
  return [...allActivities.value]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);
});

const currentMonthActivities = computed(() => {
  return allActivities.value.filter(activity => {
    const activityDate = new Date(activity.date);
    return activityDate.getMonth() === currentMonth.value &&
           activityDate.getFullYear() === currentYear.value;
  });
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
  background-color: #eeeeee;
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
  gap: 1rem;
}
.balance-and-cards {
  flex: 1;
  height: 300px;
  background-color: #03192C;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 500px;
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
  min-width: 300px;
  height: 100%;
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
    min-width: 0;
    max-width: 750px; /* Mismo que en MovementsAndSpendings */
    margin: 0 auto;
  }
}
</style>