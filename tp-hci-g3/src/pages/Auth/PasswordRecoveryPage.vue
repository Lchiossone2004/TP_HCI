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

      <!-- Paso 1: Solicitar email -->
      <div v-if="step === 1">
        <p>Ingrese su email para recibir un código de verificación.</p>
        <div class="input-container">
          <input 
            type="email" 
            v-model="email" 
            placeholder="Tu correo electrónico"
            :class="{ 'input-error': emailError }"
            @input="validateEmail"
            required
          />
          <p v-if="emailError" class="error-message">{{ emailError }}</p>
        </div>
        <button @click="sendCode" :disabled="!isValidEmail">Enviar código</button>
      </div>

      <!-- Paso 2: Ingresar código y nueva contraseña -->
      <div v-if="step === 2">
        <p>Ingrese el código recibido y su nueva contraseña</p>
        <div class="input-container">
          <input 
            type="text" 
            v-model="code" 
            placeholder="Código de verificación"
            :class="{ 'input-error': codeError }"
            @input="clearCodeError"
            required
          />
          <p v-if="codeError" class="error-message">{{ codeError }}</p>
        </div>

        <div class="input-container">
          <input 
            :type="showPassword ? 'text' : 'password'" 
            v-model="newPassword" 
            placeholder="Nueva contraseña"
            :class="{ 'input-error': passwordError }"
            @input="validatePassword"
            required
          />
          <span 
            class="material-symbols-rounded password-toggle" 
            @click="togglePasswordVisibility"
          >
            {{ showPassword ? 'visibility' : 'visibility_off' }}
          </span>
          <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
        </div>
        <button @click="resetPassword" :disabled="!isValidReset">Actualizar contraseña</button>
      </div>

      <!-- Paso 3: Confirmación de éxito -->
      <div v-if="step === 3">
        <p class="success">¡Contraseña actualizada con éxito!</p>
        <button @click="$router.push('/')">Volver al inicio de sesión</button>
      </div>

      <!-- Mensaje general de error -->
      <p v-if="generalError" class="error">{{ generalError }}</p>
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
      step: 1, 
      emailError: '',
      codeError: '',
      passwordError: '',
      generalError: '',
      showPassword: false
    };
  },
  computed: {
    isValidEmail() {
      return this.email && !this.emailError;
    },
    isValidReset() {
      return this.code && this.newPassword && !this.codeError && !this.passwordError;
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    
    validateEmail() {
      this.emailError = '';
      this.generalError = '';
      
      if (!this.email.trim()) {
        this.emailError = 'El email es obligatorio';
        return;
      }
      
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.emailError = 'Ingrese un correo electrónico válido';
      }
    },
    
    clearCodeError() {
      this.codeError = '';
      this.generalError = '';
      
      if (!this.code.trim()) {
        this.codeError = 'El código es obligatorio';
      }
    },
    
    validatePassword() {
      this.passwordError = '';
      this.generalError = '';
      
      if (!this.newPassword) {
        this.passwordError = 'La contraseña es obligatoria';
        return;
      }
      
      if (this.newPassword.length < 10) {
        this.passwordError = 'La contraseña debe tener al menos 10 caracteres';
      }
    },
    
    async sendCode() {
      // Validar campos
      this.validateEmail();
      if (this.emailError) return;
      
      // Limpiar errores previos
      this.generalError = '';
      
      try {
        const userStore = useUserStore();
        const result = await userStore.sendRecoveryCode(this.email);
        
        // Si llegamos aquí, el código fue enviado exitosamente
        this.step = 2;
      } catch (error) {
        console.error('Error completo al solicitar código:', error);
        
        // Manejar los distintos tipos de error
        if (error.message === 'email_not_found') {
          this.generalError = 'El email no existe en nuestra base de datos. Intente de nuevo.';
        } else if (error.message === 'network_error') {
          this.generalError = 'Error de conexión. Por favor, verifica tu conexión a internet.';
        } else if (error.message && error.message.includes('401')) {
          this.generalError = 'El email no existe en nuestra base de datos. Intente de nuevo.';
        } else if (error.message && error.message.includes('404')) {
          this.generalError = 'El email no existe en nuestra base de datos. Intente de nuevo.';
        } else {
          this.generalError = 'No se pudo enviar el código. Intente nuevamente más tarde.';
        }
      }
    },
    
    async resetPassword() {
      // Validar campos
      this.clearCodeError();
      this.validatePassword();
      
      if (!this.code.trim()) {
        this.codeError = 'El código es obligatorio';
      }
      
      if (this.codeError || this.passwordError) return;
      
      // Limpiar errores previos
      this.generalError = '';
      
      try {
        const userStore = useUserStore();
        const success = await userStore.changePassword(this.code, this.newPassword);
        
        if (success) {
          this.step = 3;
        } else {
          this.generalError = 'El código es inválido o hubo un error al actualizar la contraseña.';
        }
      } catch (error) {
        console.error('Error al resetear contraseña:', error);
        this.generalError = 'Error al actualizar la contraseña. Verifique el código e intente nuevamente.';
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
  cursor: pointer;
  color: white;
  font-size: var(--icon-little);
}

.page-background {
  min-height: 100vh;
  background-color: var(--dark-blue);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: 'Nunito', sans-serif;
}

.reset-container {
  max-width: 500px;
  min-height: 300px;
  width: 100%;
  padding: 30px;
  border-radius: var(--general-radius);
  background-color: #fff; 
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-align: center;
  font-size: var(--font-text);
}

.reset-container h2 {
  font-size: var(--font-title);
  color: var(--black-text);
  margin-bottom: 1.5rem;
}

.reset-container p {
  color: var(--dark-grey-text);
  margin-bottom: 1.5rem;
}

.input-container {
  position: relative;
  margin-bottom: 1.5rem;
}

input {
  display: block;
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: var(--icon-radius);
  font-size: var(--font-text);
  background-color: var(--white-inputs);
  transition: border 0.2s ease-in-out;
}

input:focus {
  border-color: var(--blue-link);
  outline: none;
}

.input-error {
  border-color: var(--red-error-message);
}

.error-message {
  color: var(--red-error-message);
  font-size: var(--font-mini);
  margin-top: 0.3rem;
  text-align: left;
  font-weight: normal;
}

.password-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--dark-grey-text);
  cursor: pointer;
  font-size: var(--icon-little);
}

button {
  width: 100%;
  padding: 12px;
  background-color: var(--blue-button);
  color: white;
  font-weight: bold;
  border: none;
  border-radius: var(--button-radius);
  cursor: pointer;
  font-size: var(--font-text);
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: var(--blue-button-hover);
}

button:disabled {
  background-color: var(--light-grey);
  cursor: not-allowed;
}

.error {
  color: var(--red-error-message);
  margin-top: 1rem;
  font-size: var(--font-text);
}

.success {
  color: var(--green);
  font-weight: bold;
  margin: 2rem 0;
  font-size: var(--font-subtitle);
}

@media (max-width: 768px) {
  .reset-container {
    padding: 20px;
  }
  
  .reset-container h2 {
    font-size: calc(var(--font-title) * 0.9);
  }
  
  button {
    padding: 10px;
    font-size: calc(var(--font-text) * 0.9);
  }
}
</style>