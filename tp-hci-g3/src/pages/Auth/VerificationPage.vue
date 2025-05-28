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
      <p class="subtitle">Por favor, ingresa el código que recibiste por correo electrónico para continuar.</p>

      <form @submit.prevent="verifyCode">
        <div class="input-container">
          <input 
            v-model="code" 
            type="text" 
            placeholder="Ingresa el código" 
            :class="{ 'input-error': codeFieldError }"
            @input="clearCodeError" 
            @blur="validateCodeField"
          />
          <p v-if="codeFieldError" class="error-message">Campo obligatorio</p>
        </div>
        <button type="submit">Verificar</button>
      </form>

      <p v-if="errorMessage" class="error-message verification-error">{{ errorMessage }}</p>

      <hr />

      <h2>¿No recibiste el código?</h2>
      <p class="subtitle">Reenvía el correo de verificación ingresando tu email:</p>

      <form @submit.prevent="resendVerificationEmail">
        <div class="input-container">
          <input 
            v-model="email" 
            type="email" 
            placeholder="Tu correo electrónico" 
            :class="{ 'input-error': emailError || emailFieldError }"
            @input="validateEmail" 
            @blur="validateEmailField"
          />
          <p v-if="emailFieldError" class="error-message">Campo obligatorio</p>
          <p v-else-if="emailError" class="error-message">{{ emailError }}</p>
        </div>
        <button type="submit" :disabled="!!emailError">Reenviar código</button>
      </form>

      <p v-if="resendMessage" :class="{ 'success-message': resendSuccess, 'error-message': !resendSuccess }">
        {{ resendMessage }}
      </p>
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
      goToHelp,
      route
    }
  },
  data() {
    return {
      code: '',
      email: '',
      errorMessage: '',
      emailError: '',
      codeFieldError: false,
      emailFieldError: false,
      resendMessage: '',
      resendSuccess: false
    };
  },
  created() {
    // Si el email fue pasado como parámetro, usarlo automáticamente
    if (this.$route.params && this.$route.params.email) {
      this.email = this.$route.params.email;
    }
  },
  methods: {
    validateEmailField() {
      this.emailFieldError = this.email.trim() === '';
    },
    
    validateCodeField() {
      this.codeFieldError = this.code.trim() === '';
    },
    
    validateEmail() {
      // Limpiar mensaje de reenvío y error de campo obligatorio
      this.resendMessage = '';
      this.emailFieldError = false;
      
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (this.email && !emailRegex.test(this.email)) {
        this.emailError = 'Por favor, ingresa un correo electrónico válido.';
      } else {
        this.emailError = '';
      }
    },
    
    clearCodeError() {
      // Limpiar mensaje de error al modificar el código
      this.errorMessage = '';
      this.codeFieldError = false;
    },
    
    async verifyCode() {
  // Validar que el campo no esté vacío
  if (!this.code.trim()) {
    this.codeFieldError = true;
    return;
  }

  try {
    const userStore = useUserStore();
    const success = await userStore.verifyUser(this.code);

    if (success) {
      this.$router.push('/home');
    } else {
      this.errorMessage = 'Código incorrecto. Por favor, verifica e intenta nuevamente.';
    }
  } catch (error) {
    console.error('Error completo:', error);
    this.errorMessage = 'Error al verificar el código. Intenta nuevamente.';
  }
}
,
    
async resendVerificationEmail() {
  // Validar que el campo no esté vacío
  if (!this.email.trim()) {
    this.emailFieldError = true;
    return;
  }

  try {
    const userStore = useUserStore();
    const success = await userStore.resendVerification(this.email);

    if (!success) {
      this.errorMessage = 'No se pudo reenviar el código. Verifica el correo electrónico e intenta nuevamente.';
    }
  } catch (error) {
    console.error('Error al reenviar verificación:', error);
    this.errorMessage = 'Ocurrió un error al reenviar el código. Intenta nuevamente.';
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
  color: var(--white-text);
  font-weight: bold;
  padding: 8px 12px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.back-btn span {
  color: var(--white-text);
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
  color: var(--white-text);
}

.icon {
  cursor: pointer;
  color: var(--white-text);
  font-size: var(--icon-little);
}

.main-content {
  min-height: 100vh;
  background-color: var(--dark-blue);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.verification-page {
  max-width: 500px;
  margin: 4rem auto;
  background-color: var(--white-text);
  padding: 2rem;
  border-radius: var(--general-radius);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Nunito', sans-serif;
}

.verification-page h1 {
  font-size: var(--font-title);
  margin-bottom: 0.5rem;
  color: var(--black-text);
  font-weight: 700;
}

.verification-page h2 {
  font-size: var(--font-subtitle);
  margin-top: 2rem;
  color: var(--black-text);
  font-weight: 700;
}

.subtitle {
  font-size: var(--font-text);
  color: var(--dark-grey-text);
  margin-bottom: 1rem;
}

.input-container {
  position: relative;
  margin-bottom: 0.5rem;
}

.verification-page input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: var(--icon-radius);
  font-size: var(--font-text);
  background-color: var(--white-inputs);
  transition: border 0.2s ease-in-out;
}

.verification-page input:focus {
  border-color: var(--blue-link);
  outline: none;
}

.input-error {
  border-color: var(--red-error-message) !important;
}

.error-message {
  color: var(--red-error-message);
  font-size: var(--font-mini);
  margin-top: 0.3rem;
  text-align: left;
  font-weight: normal;
}

.verification-error {
  margin-top: 1rem;
  text-align: center;
  font-size: var(--font-text);
}

.success-message {
  color: var(--green);
  font-size: var(--font-text);
  margin-top: 1rem;
}

.verification-page button {
  background-color: var(--blue-button);
  color: var(--white-text);
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: var(--font-text);
  border-radius: var(--button-radius);
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 700;
  margin-top: 0.5rem;
}

.verification-page button:hover {
  background-color: var(--blue-button-hover);
}

button:disabled {
  background-color: var(--light-grey);
  cursor: not-allowed;
}

button:disabled:hover {
  background-color: var(--light-grey);
}

hr {
  margin: 2rem 0;
  border: none;
  border-top: 1px solid var(--background-grey);
}

@media (max-width: 1200px) {
  .verification-page {
    padding: 1.5rem;
  }

  .verification-page h1 {
    font-size: calc(var(--font-title) * 0.9);
  }

  .verification-page h2 {
    font-size: calc(var(--font-subtitle) * 0.9);
  }

  .subtitle {
    font-size: calc(var(--font-text) * 0.9);
  }
}
</style>