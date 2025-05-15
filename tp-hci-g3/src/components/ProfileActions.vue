<template>
    <div class="actions">
      <button v-for="(action, index) in actions" :key="index" class="action-button">
        <i :class="action.icon"></i>
        <span class="label">{{ action.label }}</span>
        <span class="material-icons">arrow_forward_ios</span>
        
      </button>
    </div>
  </template>
  
  <script setup>
  const actions = [
  { label: 'Datos de mi cuenta', icon: 'account_circle' },
  { label: 'Tarjetas', icon: 'credit_card' },
  { label: 'Actividad', icon: 'insights' },
  { label: 'Administrar dinero', icon: 'account_balance_wallet' },
]
  </script>
  
  <style scoped>
  .actions {
    background-color: #f1f1f1;;
    border-radius: 10px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .action-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 0.75rem 1rem;
  border-radius: 999px; /* Más redondeado */
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  margin-top: 1rem;
  min-height: 5rem;
}

.action-button .label {
  flex-grow: 1; /* Ocupa el espacio disponible */
  display: flex;
  align-items: center;
}

.action-button i {
  margin-right: 1rem;
}

.action-button .arrow {
  font-weight: bold;
  font-size: 1.6rem;
}
  .action-button:hover{
    background-color: #eaeaea;
  }
  </style>
  