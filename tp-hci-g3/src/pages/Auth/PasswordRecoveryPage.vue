<template>
  <div class="page-background">
    <div class="header">
      <button class="back-btn" @click="goBack">
        <span class="material-symbols-rounded">arrow_back</span>
        <span>Volver</span>
      </button>
      <span class="material-symbols-rounded icon" @click="goToHelp">help</span>
    </div>
    <div class="reset-container">
      <h2>Recuperar Contraseña</h2>

      <!-- Paso 1: Enviar código al email -->
      <div v-if="step === 1">
        <p>Ingrese su email para recibir un código de verificación.</p>
        <input type="email" v-model="email" placeholder="Tu correo electrónico" required />
        <button @click="sendCode">Enviar código</button>
      </div>

      <!-- Paso 2: Verificar código y nueva contraseña -->
      <div v-if="step === 2">
        <p>Ingrese el código recibido y su nueva contraseña</p>
        <input type="text" v-model="code" placeholder="Código de verificación" required />
        <input type="password" v-model="newPassword" placeholder="Nueva contraseña" required />
        <button @click="resetPassword">Actualizar contraseña</button>
      </div>

      <!-- Paso 3: Confirmación -->
      <div v-if="step === 3">
        <p class="success">¡Contraseña actualizada con éxito!</p>
        <button @click="$router.push('/')">Volver al inicio de sesión</button>
      </div>

      <!-- Mensaje de error -->
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/UserStore';
import { useRouter, useRoute } from 'vue-router'


export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const goBack = () => {
      router.push('/')
    }
    const goToHelp = () => {
      router.push({
    path: '/help',
    query: { from: route.name }
  })
} 
    return {
      goBack,
      goToHelp
    }
  },
  data() {
    return {
      email: '',
      code: '',
      newPassword: '',
      step: 1, // 1 = email, 2 = código y nueva contraseña, 3 = éxito
      error: ''
    };
  },
  methods: {
    sendCode(){
      const userStore = useUserStore()
      userStore.sendRecoveryCode(this.email)
      this.step = 2 
    },
    resetPassword(){
      const userStore = useUserStore()
      userStore.changePassword(this.code, this.newPassword)
      this.step = 3
    }
  }
};
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 20px; 
  background-color: transparent; 
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: none;
  border: none;
  color: white;
  font-weight: bold;
  padding: 8px 12px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.back-btn span {
  color: white;
}

.back-btn:hover {
  background: none;
  color: var(--blue-button-hover);
}

.back-btn:hover span {
  color: var(--blue-button-hover);
}

.material-symbols-rounded:hover {
  color: var(--blue-button-hover);
}

.material-symbols-rounded {
  color: white;
}

.icon {
  cursor: default; /* sin pointer */
  color: white;
}

.page-background {
  min-height: 100vh;
  background-color: #03192c; /* azul oscuro */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.reset-container {
  max-width: 400px;
  width: 100%;
  padding: 30px;
  border-radius: 12px;
  background-color: #fff; /* cuadro blanco */
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-align: center;
}

input {
  display: block;
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #03192c;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  font-weight: bold;
  margin-top: 20px;
}
</style>
