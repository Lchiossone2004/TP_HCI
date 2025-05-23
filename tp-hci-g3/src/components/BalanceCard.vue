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
        {{ visible ? formattedBalance : '***' }}
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
import { ref, computed } from 'vue'
import { usePaymetStore } from '@/stores/PaymetStore'

const store = usePaymetStore()

const visible = ref(true)
function toggle() {
  visible.value = !visible.value
}

// Formatea el balance a moneda con separadores de miles
const formattedBalance = computed(() => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  }).format(store.getBalance)
})
</script>

<style scoped>
.balance-card {
  background: linear-gradient(100deg, var(--white-inputs), var(--light-grey));
  border-radius: var(--general-radius);
  padding: 1rem;
  color: var(--black-text);
  width: 360px; 
  height: 200px;
  display: flex; 
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  margin: 0 auto;
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
