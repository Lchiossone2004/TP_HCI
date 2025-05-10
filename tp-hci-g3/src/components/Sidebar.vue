<template>
  <aside class="sidebar">
    <h2 class="title">Hola, Usuario</h2>
    <nav class="menu-container">
      <div class="menu">
        <button v-for="item in menuItems" :key="item.text" class="menu-btn">
          <span class="material-symbols-rounded icon">{{ item.icon }}</span>
          <span class="text">{{ item.text }}</span>
        </button>
      </div>
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
  font-size: clamp(1.7rem, 2.3vw, 2.8rem);
  margin-bottom: 2rem; 
  color: white;
  margin-bottom: 5rem;
  white-space: nowrap;        /* No hacer saltos de línea */
  overflow: hidden;           /* Ocultar el exceso de texto */
  text-overflow: ellipsis;    /* Mostrar "..." al final si se corta */
  max-width: 100%;            /* Respetar el ancho del contenedor */
  
}

.menu-container {
  display: flex;
  flex-direction: column;
  height: 100%; 
  justify-content: space-between; 
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 4rem; 
}

.menu-btn {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: white;
  font-size: clamp(1.2rem, 1.5vw, 2rem);
  cursor: pointer;
  padding: 0.5rem;
  transition: background 0.2s ease, border-radius 0.2s ease;
  border-radius: 2px;
}

.menu-btn:hover {
  background-color: #093256;
  border-radius: 10px; /* Esquinas redondeadas en hover */
}

.icon {
  margin-right: 0.5rem;
  font-size: clamp(2rem, 3vw, 3.2rem);
}

.menu-btn.danger {
  margin-bottom: 10rem;
  color: #ff4d4d;
}

.menu-btn.danger:hover {
  background-color: rgba(255, 77, 77, 0.1);
  border-radius: 10px; /* Esquinas redondeadas en hover */
}
.text {
  font-size: clamp(1rem, 1.5vw, 1.5rem);
  white-space: nowrap;        /* No hacer saltos de línea */
  overflow: hidden;           /* Ocultar el exceso de texto */
  text-overflow: ellipsis;    /* Mostrar "..." al final si se corta */
  max-width: 100%;            /* Respetar el ancho del contenedor */
}
.sidebar{
  background-color: #03192C;
}
</style>
