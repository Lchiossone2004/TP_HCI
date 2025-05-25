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
  :perfil="perfil"
  @update:perfil="actualizarPerfil"
/>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProfileInfo from '@/components/ProfileInfo.vue'
import ProfileActions from '@/components/ProfileActions.vue'
import EditProfileModal from '@/components/EditProfileModal.vue'

import { useUserStore } from '@/stores/UserStore'
import { useAccountStore } from '@/stores/AccountStore'

const showEditModal = ref(false)
const perfil = ref({})

const userStore = useUserStore()
const accountStore = useAccountStore()

const handleEditProfile = () => {
  showEditModal.value = true
}

const actualizarPerfil = (nuevoPerfil) => {
  console.log(nuevoPerfil)
  perfil.value = {
    ...perfil.value,
    ...nuevoPerfil,
    avatar: nuevoPerfil.metadata?.avatar || perfil.value.avatar
  }
}


onMounted(async () => {
  try {
    const userData = await userStore.getUser()
    const accountData = await accountStore.getAccountInfo()

    perfil.value = {
  ...userData,
  nombre: userData.firstName || '',
  apellido: userData.lastName || '',
  email: userData.email || '',
  alias: accountData.alias || '',
  cvu: accountData.cvu || '',
  avatar: userData.metadata?.avatar || '/src/assets/images/avatars/default-profile-picture.png'

}

  } catch (error) {
    console.error('Error cargando datos del perfil:', error)
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
