<template>
  <div class="layout">
    <main class="main-content">
      <ProfileInfo :perfil="perfil"/>
      <ProfileActions />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import ProfileInfo from '@/components/ProfileInfo.vue'
import ProfileActions from '@/components/ProfileActions.vue'

const router = useRouter()

const goBack = () => router.back()

const perfil = {
  nombre: 'Mateo',
  apellido: 'Gorriti',
  email: 'mateo.go@gmail.com',
  dni: '40.527.004',
  telefono: '+54 11 7385-4992',
  avatar: '/src/assets/images/FotoPerfil.jpeg'
}
</script>

<style scoped>
.main-content {
  margin-left: 21vw;
  padding: 1rem;
  min-height: 100vh;
  background-color: var(--background-grey);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-sizing: border-box;
}

@media (max-width: 1150px) {
  .main-content {
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }
}
</style>