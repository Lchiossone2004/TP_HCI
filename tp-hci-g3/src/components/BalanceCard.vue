<template>
  <div class="balance-card">
    <div class="balance-header">
      <span>Balance</span>
      <span class="material-symbols-rounded icon" @click="toggle">
        {{ visible ? 'visibility' : 'visibility_off' }}
      </span>
    </div>
    <div class="balance-amount">
      <span class="balance-value">
        {{ visible ? formatted : '***' }}
      </span>
      <span class="coin">ARS</span>
    </div>
    <div class="balance-yield">
      <span>Rendimiento de</span>
      <span class="balance-growth">+24,6%</span>
    </div>
  </div>
  
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(true)
const formatted = '$205.768,63'
function toggle() { visible.value = !visible.value }
</script>

<style scoped>
.balance-card {
  background: linear-gradient(135deg,#FFFF,#A8A8A8);
  border-radius: 20px;
  padding: 1rem;
  width: 360px; height: 200px;
  display: flex; flex-direction: column;
  justify-content: space-between;
  color: #03192C;
}
.balance-header {
  display: flex; align-items: center; gap: .5rem;
  font-size: 25px;
}
.icon {
  font-size: 22px; cursor: pointer;
}
.balance-amount {
  display: flex; align-items: center; gap: 2rem;
  font-size: 30px;
}
.balance-value {
  min-width: 140px; text-align: left;
}
.coin {
  background: #03192C;
  color: #FFFF;
  border-radius: 10px;
  padding: 1rem;
  display: flex; align-items: center;
  justify-content: center;
  width: 60px; height: 30px;
  font-size: 20px;
}
.balance-yield {
  display: flex; align-items: baseline; gap: .5rem;
  font-size: 12px; color: #06B800;
}
.balance-growth {
  background: #9DD6AB;
  border-radius: 40px;
  width: 4rem;
  display: flex; align-items: center;
  justify-content: center;
}
</style>
