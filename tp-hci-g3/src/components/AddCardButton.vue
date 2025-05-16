<template>
  <div class="add-card">
    <button class="add-button">
      <span class="material-symbols-rounded icon">add</span>
    </button>
    <span class="add-label">Agregar tarjeta</span>
  </div>
</template>

<style scoped>
.add-card {
  background-color: var(--dark-blue);
  border: 3px solid var(--white-text);
  border-radius: var(--general-radius);
  width: 360px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
}

.add-button {
  background-color: var(--white-text);
  width: 40px;
  height: 40px;
  border-radius: var(--button-radius);
  color: var(--white-text);
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
