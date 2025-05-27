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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePaymentStore } from '@/stores/PaymetStore'
import { useAccountStore } from '@/stores/AccountStore'
const accountStore = useAccountStore()

const visible = ref(localStorage.getItem('visible') !== null ? JSON.parse(localStorage.getItem('visible')) : true)

function toggle() {
  visible.value = !visible.value
  localStorage.setItem('visible', JSON.stringify(visible.value))
}

const formattedBalance = computed(() => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  }).format(accountStore.balance)
})
onMounted(() => {
  accountStore.getAccountInfo()
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
  align-self: center;
  margin-bottom: 3rem;
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
