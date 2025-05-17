<template>
  <div class="layout">
    <main class="main-content">
      <ProfileInfo 
        :perfil="perfil"
        @edit="handleEditProfile"
      />
      <ProfileActions @edit="handleEditProfile" />
      <EditProfileModal 
        v-model="showEditModal"
        v-model:perfil="perfil"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import ProfileInfo from '@/components/ProfileInfo.vue'
import ProfileActions from '@/components/ProfileActions.vue'
import EditProfileModal from '@/components/EditProfileModal.vue'

const router = useRouter()
const showEditModal = ref(false)

// Cargar datos del localStorage o usar valores por defecto
const perfil = ref(
  JSON.parse(localStorage.getItem('userProfile')) || {
    nombre: 'Mateo',
    apellido: 'Gorriti',
    email: 'mateo.go@gmail.com',
    dni: '40.527.004',
    telefono: '+54 11 7385-4992',
    avatar: '/src/assets/images/FotoPerfil.jpeg',
    cvu: '0000003100064484890001',
    alias: 'mateo.gorriti'
  }
)

// Guardar cambios en localStorage cuando el perfil cambie
watch(perfil, (newValue) => {
  localStorage.setItem('userProfile', JSON.stringify(newValue))
}, { deep: true })

const handleEditProfile = () => {
  showEditModal.value = true
}

// Opcional: Cargar datos al montar el componente
onMounted(() => {
  const savedProfile = localStorage.getItem('userProfile')
  if (savedProfile) {
    perfil.value = JSON.parse(savedProfile)
  }
})
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