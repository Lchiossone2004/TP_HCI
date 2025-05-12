<template>
    <div class="main-layout">
      <div class="main-content">
        <ProfileInfo :perfil="perfil"/>
        <ProfileActions />
      </div>
    </div>
  </template>
  
  <script setup>
  import Sidebar from '@/components/Sidebar.vue'
  import ProfileInfo from '@/components/ProfileInfo.vue'
  import ProfileActions from '@/components/ProfileActions.vue'

  const perfil = {
  nombre: 'Mateo Tomás',
  apellido: 'Gorriti',
  email: 'mateo.go@gmail.com',
  dni: '40.527.004',
  telefono: '+54 11 7385-4992',
  avatar: '/src/assets/images/FotoPerfil.jpeg'
}
  </script>
  
  <style scoped>
.main-layout {
  display: flex;
  min-height: 100vh; /* Asegura que la altura sea completa */
}

.main-content {
  flex: 1;
  margin-left: 21vw; /* Esto hace que el contenido principal se mueva hacia la derecha */
  padding: 2rem;
  background-color: #f1f1f1;
  min-height: 100vh;
}
  </style>