<template>
  <div class="auth-container">
    <h2>Bienvenido</h2>
    <p>Es bueno verte de nuevo</p>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Contraseña" v-model="password" />
    <div class="row-remember">
      <div class="remember-label">
        <input type="checkbox" v-model="remember" />
        <span>Recordar siempre</span>
      </div>
      <a href="#" class="forgot-link" >¿Olvidó su contraseña?</a>
    </div>
    <button @click="login">Aceptar</button>
    <div class="row-register">
      <span class="register-text">¿No tiene una cuenta?</span>
      <a href="#" class="register-link" @click="$emit('switch')">Regístrese</a>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/UserStore'

export default {
  data() {
    return {
      email: '',
      password: '',
      remember: false
    };
  },
  methods: {
    async login() {
      const userStore = useUserStore();

      try {
        await userStore.logIn(this.email, this.password);

        if (this.remember) {
          localStorage.setItem('email', this.email);
          localStorage.setItem('password', this.password);
        } else {
          sessionStorage.setItem('email', this.email);
          sessionStorage.setItem('password', this.password);
        }

        this.$router.push({ name: 'Home' });
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    }
  },
  mounted() {
    if (localStorage.getItem('email') && localStorage.getItem('password')) {
      this.email = localStorage.getItem('email');
      this.password = localStorage.getItem('password');
      this.remember = true;
    } else if (sessionStorage.getItem('email') && sessionStorage.getItem('password')) {
      this.email = sessionStorage.getItem('email');
      this.password = sessionStorage.getItem('password');
      this.remember = false;
    }
  }
};
</script>

<style scoped>
.auth-container {
  padding: 2rem 1.5rem;
  color: var(--white-text);
  width: 100%;
  max-width: 450px; /* Ajustado para ser consistente */
  margin: 0 auto;
  box-sizing: border-box; /* Importante: incluye padding en el width */
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

@media (max-width: 1200px) {
  .auth-container {
    padding: 1.5rem 1rem;
    max-width: 400px; /* Reducir el ancho máximo en pantallas más pequeñas */
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
    gap: 1rem; /* Reducir el gap en pantallas más pequeñas */
  }

  .remember-label, .forgot-link {
    font-size: calc(var(--font-text) * 0.9);
  }
}

@media (max-width: 992px) {
  .auth-container {
    padding: 1rem;
    max-width: 350px; /* Reducir aún más en pantallas más pequeñas */
  }

  h2 {
    font-size: calc(var(--font-login) * 0.75);
  }

  p {
    font-size: calc(var(--font-title) * 0.85);
    margin-bottom: 1.5rem;
  }

  button {
    width: 60%;
  }

  .row-remember {
    flex-direction: column; /* Apilar en móviles */
    gap: 0.5rem;
    align-items: flex-start;
  }

  .forgot-link {
    align-self: flex-start;
  }
}

@media (max-width: 768px) {
  .auth-container {
    max-width: 300px;
  }
}
</style>