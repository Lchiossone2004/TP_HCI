<template>
    <div class="main-layout">
      <Sidebar />
      <div class="main-content">
        <ProfileInfo />
        <ProfileActions />
      </div>
    </div>
  </template>
  
  <script setup>
  import Sidebar from '@/components/Sidebar.vue'
  import ProfileInfo from '@/components/ProfileInfo.vue'
  import ProfileActions from '@/components/ProfileActions.vue'
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