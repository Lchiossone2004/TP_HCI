<template>
  <div class="add-card">
    <AddCardButton @add-card="$emit('add-card', $event)">
      <button class="add-button">
        <span class="material-symbols-rounded icon">add</span>
      </button>
    </AddCardButton>
    <span class="add-label">Agregar tarjeta</span>
  </div>
</template>


<script setup>
import AddCardButton from './AddCardButton.vue'

defineEmits(['add-card'])
</script>

<style scoped>
.add-card {
  background-color: var(--dark-blue);
  border: 3px solid var(--white-text);
  border-radius: var(--general-radius);
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  flex-shrink: 0;
  margin: 0 auto;
  cursor: default;
}

.add-button{
  background-color: var(--white-text);
  height: 40px;
  width: 40px;
  border-radius: var(--button-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

}

.icon {
  font-size: var(--icon-mid);
  color: var(--dark-blue);
}

.add-label {
  font-size: var(--font-mini);
  text-align: center;
  color: var(--white-text);
}
</style>