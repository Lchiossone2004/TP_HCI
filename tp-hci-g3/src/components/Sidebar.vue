<template>
  <aside class="sidebar">
    <h2 class="title">Hola, {{ userName || 'Usuario' }}</h2>
    <nav class="menu-container">
      <div class="menu">
        <button
          v-for="item in menuItems"
          :key="item.text"
          class="menu-btn"
          :class="{ active: route.name === item.name }"
          @click="goTo(item.name)"
        >
          <span class="material-symbols-rounded icon">{{ item.icon }}</span>
          <span class="text">{{ item.text }}</span>
        </button>
      </div>
      <button class="menu-btn danger"  
          @click="logout">
        <span class="material-symbols-rounded icon">logout</span>
        <span class="text">Cerrar sesión</span>
      </button>
    </nav>
  </aside>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/UserStore'
import { onMounted, ref } from 'vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const userName = ref('')

onMounted(async () => {
  try {
    const user = await userStore.getUser()
    userName.value = user.firstName || 'Usuario'
  } catch (error) {
    console.error('Error cargando el usuario:', error)
  }
})

const menuItems = [
  { text: 'Inicio', icon: 'home', name: 'Home' },
  { text: 'Actividad', icon: 'description', name: 'Actividad' },
  { text: 'Tarjetas', icon: 'credit_card', name: 'Tarjetas' },
  { text: 'Perfil', icon: 'account_circle', name: 'ProfilePage' },
]

function goTo(name) {
  router.push(name)
}
function logout() {
  // Eliminar el usuario del localStorage y sessionStorage
  localStorage.removeItem('email')
  sessionStorage.removeItem('email')

  // Lógica para cerrar sesión
  console.log('Cerrando sesión...')
  localStorage.removeItem('auth-token')
  router.push('/login') // Redirigir al usuario a la página de inicio de sesión
}
</script>

<style scoped>
.title {
  font-size: 30px;
  color: white;
  margin-top: 1rem;
  margin-bottom: 5rem;
  white-space: nowrap;        /* No hacer saltos de línea */
  overflow: hidden;           /* Ocultar el exceso de texto */
  text-overflow: ellipsis;    /* Mostrar "..." al final si se corta */
  max-width: 100%;            /* Respetar el ancho del contenedor */
  text-align: left;
  
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
  cursor: pointer;
  padding: 0.5rem;
  transition: background 0.2s ease, border-radius 0.2s ease;
  border-radius: 2px;
}

.menu-btn:hover {
  background-color: #093256;
  border-radius: 15px; /* Esquinas redondeadas en hover */
}

.icon {
  margin-right: 0.5rem;
  font-size: 35px;
}

.menu-btn.danger {
  margin-bottom: 10rem;
  color: var(--red-danger);
}

.menu-btn.danger:hover {
  background-color: #ff4d4d1a;
  border-radius: 15px; /* Esquinas redondeadas en hover */
}

.menu-btn.active {
  background-color: #093256;
  border-radius: 15px;
}

.text {
  font-size: 20px;
  white-space: nowrap;        /* No hacer saltos de línea */
  overflow: hidden;           /* Ocultar el exceso de texto */
  text-overflow: ellipsis;    /* Mostrar "..." al final si se corta */
  max-width: 100%;            /* Respetar el ancho del contenedor */
}
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 21vw;
    z-index: 2000;
    height: 100vh;
    background-color: #03192C;
    color: white;
    padding: 1.5rem;
    box-sizing: border-box;
  }
</style>
