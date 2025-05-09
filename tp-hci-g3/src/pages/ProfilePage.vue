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
  }
  .main-content {
    flex: 1;
    padding: 2rem;
    background-color: #f1f1f1;
    min-height: 100vh;
  }
  </style>