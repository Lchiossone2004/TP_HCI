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
      <span>+24,6%</span>
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
  background: linear-gradient(100deg, var(--white-inputs), var(--light-grey));
  border-radius: var(--general-radius);
  padding: 1rem;
  width: 360px; 
  height: 200px;
  display: flex; 
  flex-direction: column;
  justify-content: space-between;
  color: var(--dark-blue);
}
.balance-header {
  display: flex; 
  align-items: center; 
  gap: 1rem;
  font-size: var(--font-title);
}
.icon {
  font-size: var(--icon-mid); 
  cursor: pointer;
}
.balance-amount {
  display: flex; 
  align-items: center; 
  gap: 2rem;
  font-size: var(--font-big);
}
.balance-value {
  min-width: 140px; 
  text-align: left;
}
.coin {
  background: var(--dark-blue);
  color: var(--white-text);
  border-radius: var(--icon-radius);
  padding: 1rem;
  display: flex; 
  align-items: center;
  justify-content: center;
  width: 60px; 
  height: 30px;
  font-size: var(--font-subtitle);
}
.balance-yield {
  display: flex; 
  align-items: baseline; 
  gap: .5rem;
  font-size: var(--font-mini); 
  color: var(--green);
}

</style>
