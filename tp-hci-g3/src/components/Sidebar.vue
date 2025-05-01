<template>
    <aside class="sidebar">
      <h2 class="title">Hola, Usuario</h2>
      <nav class="menu">
        <button v-for="item in menuItems" :key="item.text" class="menu-btn">
          <span class="material-symbols-outlined icon">{{ item.icon }}</span>
          <span class="text">{{ item.text }}</span>
        </button>
        <button class="menu-btn danger">
          <span class="material-symbols-outlined icon">logout</span>
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
  .sidebar {
    width: 220px;
    height: 100vh;
    background-color: #01080f; /* azul oscuro */
    color: white;
    padding: 1.5rem;
    box-sizing: border-box;
  }
  
  .title {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: white;
  }
  
  .menu {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .menu-btn {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    padding: 0.5rem;
    transition: background 0.2s ease;
    border-radius: 6px;
  }
  
  .menu-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .icon {
    margin-right: 0.5rem;
    font-size: 1.5rem;
  }
  
  .menu-btn.danger {
    color: #ff4d4d;
  }
  
  .menu-btn.danger:hover {
    background-color: rgba(255, 77, 77, 0.1);
  }
  </style>
  