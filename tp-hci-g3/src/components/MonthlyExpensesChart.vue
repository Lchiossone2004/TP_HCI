<template>
  <div class="chart-container">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Chart } from 'chart.js/auto';

const chartRef = ref(null);
let chartInstance = null;

onMounted(() => {
  const ctx = chartRef.value.getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Comida', 'Supermercado', 'Shopping', 'Varios', 'Servicios'],
      datasets: [{
        data: [30, 25, 20, 15, 10],
        backgroundColor: ['#1E3A8A', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'],
        borderWidth: 0,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 10,
            font: {
              size: 12,
              family: 'Nunito',
              weight: '700',
            },
            color: '#1E3A8A',
          },
        },
      },
    },
  });
});

onUnmounted(() => {
  if (chartInstance) chartInstance.destroy();
});
</script>

<style scoped>

.chart-container {
  width: 100%;
  height: 350px;
  background-color: #fff;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 3rem;
}
</style>