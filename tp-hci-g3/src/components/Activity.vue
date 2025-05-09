<template>
  <div class="activity-card">
    <div class="header">
      <h3>Actividad reciente</h3>
      <button class="more-activities">
        <span class="material-symbols-rounded arrow">chevron_right</span>
      </button>
    </div>

    <div 
      v-for="(item, index) in activities" 
      :key="index" 
      class="activity-item"
      @click="handleClick(item)"
    >
      <div class="icon-wrapper">
        <span class="material-symbols-rounded icon">{{ item.icon }}</span>
      </div>
      <div class="info">
        <div class="title">{{ item.title }}</div>
        <div class="subtitle">{{ item.subtitle }}</div>
      </div>
      <div 
        class="amount"
        :class="{ positive: item.amount > 0, negative: item.amount < 0 }"
      >
        {{ formatAmount(item.amount) }}
      </div>
    </div>
  </div>
</template>

<script setup>
const activities = [
  { icon: 'shopping_bag', title: 'Prüne', subtitle: 'Hoy 19:43', amount: -57800 },
  { icon: 'restaurant', title: 'Pedidos Ya', subtitle: 'Ayer 21:18', amount: -17550 },
  { icon: 'sync_alt', title: 'Pablo Gomez', subtitle: '19/9 10:25', amount: 57800 },
  { icon: 'sync_alt', title: 'Mónica Domínguez', subtitle: '17/9 15:56', amount: -1525 },
  { icon: 'event', title: 'Mateo Gorriti', subtitle: '17/9 09:28', amount: 100000 },
  { icon: 'sync_alt', title: 'Pablo Gomez', subtitle: '15/9 11:32', amount: 20000 },
  { icon: 'shopping_cart', title: 'DISCO CENCOSUD', subtitle: '13/9 18:37', amount: -127845 },
  { icon: 'sync_alt', title: 'Pablo Gomez', subtitle: '12/9 08:01', amount: 463 },
]

function formatAmount(value) {
  const formatted = Math.abs(value).toLocaleString('es-AR')
  return (value > 0 ? '+' : '-') + '$' + formatted
}

function handleClick(item) {
  // Podés emitir un evento o navegar si querés
  console.log('Actividad clickeada:', item)
}
</script>

<style scoped>
.activity-card {
  background-color: #FFFF;
  border-radius: 20px;
  padding: 1rem;
  box-sizing: border-box;
  width: 100%;
  max-width: 500px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-weight: bold;
  font-size: 1.1rem;
  color: #001a33;
}

.more-activities{
  background-color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.arrow{
  font-size: 30px;
  color: #001a33;
}

.more-activities :hover{
  background-color: #eaeaea;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
  border-radius: 50%;
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
}

.title {
  font-weight: 600;
  color: #001a33;
}

.subtitle {
  font-size: 0.85rem;
  color: #8ca0b3;
}

.amount {
  font-weight: bold;
  white-space: nowrap;
}

.positive {
  color: #00a862;
}

.negative {
  color: #e74c3c;
}
</style>
