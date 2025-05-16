<template>
  <div class="actions-container">
    <button 
      v-for="action in actions" 
      :key="action.label" 
      class="action-button"
    >
      <span class="material-symbols-rounded icon">{{ action.icon }}</span>
      <span class="label">{{ action.label }}</span>
      <span class="material-symbols-rounded arrow">chevron_right</span>
    </button>
  </div>
</template>

<script setup>
const actions = [
  { label: 'Datos de mi cuenta', icon: 'person' },
  { label: 'Tarjetas', icon: 'credit_card' },
  { label: 'Actividad', icon: 'description' },
  { label: 'Administrar dinero', icon: 'sync_alt' }
]
</script>

<style scoped>
.actions-container {
  background: var(--white-inputs);
  border-radius: var(--general-radius);
  padding: 1rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}

.action-button {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem;
  margin: 0.5rem 0;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: var(--button-radius);
  font-size: var(--font-text);
  color: var(--black-text);
  transition: background-color 0.2s ease;
}

.action-button:hover {
  background-color: var(--button-grey-hover);
}

.icon {
  margin-right: 1rem;
  color: var(--dark-blue);
}

.label {
  flex: 1;
  text-align: left;
}

.arrow {
  color: var(--dark-grey-text);
}

@media (max-width: 768px) {
  .actions-container {
    padding: 1rem;
  }

  .action-button {
    padding: 1rem;
  }
}
</style>
  