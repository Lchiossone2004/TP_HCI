<template>
  <div class="auth-container">
    <h2>Registrarse</h2>
    <p>Hola! Comience su camino con WingPay</p>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="text" placeholder="DNI" v-model="dni" />
    <input type="tel" placeholder="Teléfono celular" v-model="phone" />
    <input type="password" placeholder="Contraseña" v-model="password" />
    <input type="password" placeholder="Repita la contraseña" v-model="confirm" />
    <button @click="register">Aceptar</button>
    <div class="row-login">
      <span class="login-text">¿Ya tiene una cuenta?</span>
      <a href="#" class="login-link" @click="$emit('switch')">Inicie sesión</a>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  data() {
    return {
      email: '',
      dni: '',
      phone: '',
      password: '',
      confirm: ''
    };
  },
  methods: {
    register() {
      // Por ahora, solo redirigimos a HomePage sin validar
      this.$router.push('/home')
    }
  }
};
</script>

<style scoped>
.auth-container {
  padding: 2rem 1.5rem; /* Reduced padding */
  color: var(--white-text);
  width: 100%;
  max-width: 500px; /* Reduced from 600px */
  margin: 0 auto;
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

.row-login {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  width: 100%;
}

.login-text {
  color: var(--white-text);
  font-size: var(--font-text);
  text-align: center;
}

.login-link {
  color: var(--blue-link);
  text-decoration: none;
  font-size: var(--font-text);
  text-align: center;
}

.login-link:hover {
  text-decoration: underline;
}

@media (max-width: 1200px) {
  .auth-container {
    padding: 1.5rem 1rem;
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
}

@media (max-width: 992px) {
  .auth-container {
    padding: 1rem;
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
}
</style>