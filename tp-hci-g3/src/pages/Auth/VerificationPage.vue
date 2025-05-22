<template>
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
</template>

<script>
import { useUserStore } from '@/stores/UserStore';

export default {
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

/* CONTENEDOR GENERAL */
.verification-page {
  max-width: 500px;
  margin: 4rem auto;
  background-color: white;
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
  background-color: blue;
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
