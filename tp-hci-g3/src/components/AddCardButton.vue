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
  background-color: #03192c;
  border: 3px solid white;
  border-radius: 20px;
  width: 360px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  gap: 0.2rem;
}

.add-button {
  background-color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.icon {
  font-size: 25px;
  color: #03192c;
}

.add-label {
  font-size: 0.8rem;
  text-align: center;
}
</style>
