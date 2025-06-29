<template>
  <div class="auth-container">
    <h2>Bienvenido</h2>
    <p>Es bueno verte de nuevo</p>
    
    <div class="input-with-icon">
      <span class="material-symbols-rounded icon">mail</span>
      <input
        type="email"
        placeholder="Email"
        v-model="email"
      />
    </div>

    <div class="input-with-icon">
      <span class="material-symbols-rounded icon">key</span>
      <input 
        :type="showPassword ? 'text' : 'password'" 
        placeholder="Contraseña" 
        v-model="password" 
      />
      <span 
        class="material-symbols-rounded right-icon" 
        @click="togglePasswordVisibility"
      >
        {{ showPassword ? 'visibility' : 'visibility_off' }}
      </span>
    </div>

    <!-- Mensaje de error: si es fallo de credencial, se aplica la clase "small" -->
    <p
      v-if="errorMessage"
      :class="['error', { small: isAuthError }]"
    >
      {{ errorMessage }}
    </p>

    <div class="row-remember">
      <div class="remember-label">
        <input type="checkbox" v-model="remember" />
        <span>Recordar siempre</span>
      </div>
      <a href="#" class="forgot-link" @click.prevent="forgotPassword">
        ¿Olvidó su contraseña?
      </a>
    </div>

    <button @click="login">Aceptar</button>

    <div class="row-register">
      <span class="register-text">¿No tiene una cuenta?</span>
      <a href="#" class="register-link" @click.prevent="$emit('switch')">
        Regístrese
      </a>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/UserStore'

export default {
  name: 'LoginForm',
  setup() {
    const router = useRouter()
    return { router }
  },
  data() {
    return {
      email: '',
      password: '',
      remember: false,
      errorMessage: '',
      isAuthError: false,    // <-- nuevo
      showPassword: false,
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },

    validarFormulario() {
      if (!this.email.trim() || !this.password) {
        this.errorMessage = 'Por favor complete todos los campos.'
        this.isAuthError = false
        return false
      }
      this.errorMessage = ''
      return true
    },

    async login() {
      if (!this.validarFormulario()) return

      const userStore = useUserStore()
      try {
        await userStore.logIn(this.email, this.password)
        this.errorMessage = ''
        this.isAuthError = false

        if (this.remember) {
          localStorage.setItem('wingpay-remembered', 'true')
        } else {
          localStorage.removeItem('wingpay-remembered')
        }

        this.router.push({ name: 'Home' })
      } catch (error) {
        console.error('Error al iniciar sesión:', error)
        this.errorMessage = 'Email o contraseña incorrectos.'
        this.isAuthError = true 
      }
    },

    forgotPassword() {
      this.router.push({ name: 'PasswordRecovery' })
    }
  }
}
</script>

<style scoped>
.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-with-icon input {
  padding-left: 2.5rem;
  height: 40px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: var(--icon-radius);
  padding-right: 1rem;
}

.input-with-icon .icon {
  position: absolute;
  left: 10px;
  font-size: 20px;
  color: var(--dark-grey-text);
}
.input-with-icon .right-icon {
  position: absolute;
  right: 10px;
  font-size: var(--icon-little);
  color: var(--black-text);
  cursor: pointer;
}
.input-with-icon .right-icon:hover {
  color: var(--blue-button-hover);
}


.auth-container {
  padding: 2rem 1.5rem;
  color: var(--white-text);
  width: 100%;
  max-width: 450px; 
  margin: 0 auto;
  box-sizing: border-box;
}

h2, p {
  text-align: center;
  width: 100%;
}

h2 {
  font-size: var(--font-login);
  margin-bottom: 0.5rem;
}

p {
  font-size: var(--font-title);
  margin-bottom: 2rem;
}

input {
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem 1.5rem;
  margin: 1rem 0;
  border-radius: var(--icon-radius);
  background: var(--white-inputs);
  display: block;
}

input::placeholder {
  color: var(--dark-grey-text);
  font-size: var(--font-text);
}

.row-remember {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin: 0.5rem 0 0.5rem 0;
}

.remember-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--white-text);
  font-size: var(--font-text);
  white-space: nowrap;
}

.remember-label span {
  color: var(--white-text);
  margin-left: 0.3rem;
}

.forgot-link {
  color: var(--blue-link);
  text-decoration: none;
  font-size: var(--font-text);
  white-space: nowrap;
  align-self: center;
}

.forgot-link:hover {
  text-decoration: underline;
}

button {
  width: 45%;
  height: 2.5rem;
  margin: 2rem auto 0 auto;
  background: var(--blue-button);
  color: var(--white-text);
  border-radius: var(--button-radius);
  font-size: var(--font-subtitle);
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

button:hover {
  background: var(--blue-button-hover);
}

.row-register {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  width: 100%;
}

.register-text {
  color: var(--white-text);
  font-size: var(--font-text);
  text-align: center;
}

.register-link {
  color: var(--blue-link);
  text-decoration: none;
  font-size: var(--font-text);
  text-align: center;
}

.register-link:hover {
  text-decoration: underline;
}

.error {
  color: var(--red-error-message);
  margin-top: 10px;
  font-size: var(--font-text)
}

@media (max-width: 1200px) {
  .auth-container {
    padding: 1.5rem 1rem;
    max-width: 400px;
  }

  h2 {
    font-size: calc(var(--font-login) * 0.85);
  }

  p {
    font-size: calc(var(--font-title) * 0.9);
  }

  input {
    margin: 0.75rem 0;
  }

  .row-remember {
    gap: 1rem; 
  }

  .remember-label, .forgot-link {
    font-size: calc(var(--font-text) * 0.9);
  }
}


</style>