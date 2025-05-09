<template>
  <aside class="sidebar">
    <h2 class="title">Hola, Mateo</h2>      
    <nav class="menu">
      <button v-for="item in menuItems" :key="item.text" class="menu-btn">
        <span class="material-symbols-rounded icon">{{ item.icon }}</span>
        <span class="text">{{ item.text }}</span>
      </button>
      <button class="menu-btn danger">
        <span class="material-symbols-rounded icon">logout</span>
        <span class="text">Cerrar sesión</span>
      </button>
    </nav>
  </aside>
</template>

<script setup>
const menuItems = [
  { text: 'Inicio', icon: 'home' },
  { text: 'Actividad', icon: 'description' },
  { text: 'Inversiones', icon: 'finance_mode' },
  { text: 'Perfil', icon: 'account_circle' }
]
</script>

<style scoped>
.title {
  font-size: 2rem; /* Más grande */
  margin-bottom: 3rem;
  color: white;
  text-align: center;

}

.menu {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
}

.menu-btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: none;
  border: none;
  color: white;
  font-size: 1.8rem; /* Más grande */
  cursor: pointer;
  padding: 1rem 1.5rem;
  transition: background 0.2s ease, border-radius 0.2s ease;
  border-radius: 8px;
  width: 100%;
  max-width: 280px;
}

.menu-btn:hover {
  background-color: #093256;
  border-radius: 10px;
}

.icon {
  margin-right: 1rem;
  font-size: 2rem; /* Ícono más grande */
}

.menu-btn.danger {
  color: #ff4d4d;
  margin-top: 15rem;
}

.menu-btn.danger:hover {
  background-color: rgba(255, 77, 77, 0.1);
  border-radius: 10px;
}

.sidebar {
  background-color: #0D1B2A;
  color: white;
  height: 100vh;
  width: 320px; /* Aumentado el ancho */
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: left;
}

</style>
