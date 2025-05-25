<template>
  <div class="main-content">
    <div class="header">
      <button class="back-btn" @click="goBack">
        <span class="material-symbols-rounded">arrow_back</span>
        <span>Volver</span>
        </button>
        <span class="material-symbols-rounded icon" @click="goToHelp">help</span>
        </div>
  <div class="verification-page">
    <h1>Verificación de Código</h1>
    <p>Por favor, ingresa el código que recibiste por correo electrónico para continuar.</p>

    <form @submit.prevent="verifyCode">
      <input v-model="code" type="text" placeholder="Ingresa el código" required />
      <button type="submit">Verificar</button>
    </form>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <hr />

    <h2>¿No recibiste el código?</h2>
    <p>Reenvía el correo de verificación ingresando tu email:</p>

    <form @submit.prevent="resendVerificationEmail">
      <input v-model="email" type="email" placeholder="Tu correo electrónico" required />
      <button type="submit">Reenviar código</button>
    </form>

    <p v-if="resendMessage" :class="{ success: resendSuccess, error: !resendSuccess }">{{ resendMessage }}</p>
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
      code: '',
      email: '',
      errorMessage: '',
      resendMessage: '',
      resendSuccess: false
    };
  },
  methods: {
    async verifyCode() {
      try {
        const userStore = useUserStore();
        await userStore.verifyUser(this.code);
        this.$router.push('/home');
      } catch (error) {
        this.errorMessage = 'Código inválido o error al verificar.';
        console.error(error);
      }
    },
    async resendVerificationEmail() {
  const userStore = useUserStore();
  this.resendMessage = ''
  this.resendSuccess = false

  try {
    await userStore.resendVerification(this.email)
    this.resendMessage = 'Correo de verificación reenviado con éxito.'
    this.resendSuccess = true
  } catch (error) {
    this.resendMessage = 'Error al reenviar el correo. Asegúrate de que el email sea válido.'
    this.resendSuccess = false
    console.error(error)
  }
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


.main-content {
  min-height: 100vh;
  background-color: #03192c; /* azul oscuro */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.verification-page {
  max-width: 500px;
  margin: 4rem auto;
  background-color: var(--background-grey);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  font-family: 'Inter', sans-serif;
}

/* TITULOS */
.verification-page h1 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
}

.verification-page h2 {
  font-size: 1.2rem;
  margin-top: 2rem;
  color: var(--text-dark);
}

/* INPUTS */
.verification-page input {
  width: 100%;
  padding: 12px;
  margin: 0.5rem 0 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  font-size: 1rem;
  background-color: var(--light-bg);
  transition: border 0.2s ease-in-out;
}

.verification-page input:focus {
  border-color: var(--highlight);
  outline: none;
  background-color: #fff;
}

/* BOTONES */
.verification-page button {
  background-color: #03192c;
  color: rgb(255, 255, 255);
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.verification-page button:hover {
  background-color: #0056b3;
}

/* MENSAJES */
.error {
  color: var(--danger);
  font-size: 0.95rem;
  margin-top: 1rem;
}

.success {
  color: var(--success);
  font-size: 0.95rem;
  margin-top: 1rem;
}

hr {
  margin: 2rem 0;
  border: none;
  border-top: 1px solid #e0e0e0;
}

</style>
h