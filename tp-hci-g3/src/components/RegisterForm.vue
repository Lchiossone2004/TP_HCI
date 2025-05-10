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
  /* background: #093256; */
  padding: 4rem 3rem;
  /* border-radius: 12px; */
  color: white;
  width: 100%;
  max-width: 600px;
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
}

h2, p {
  text-align: center;
  width: 100%;
}

h2 {
  font-size: 4rem;
  margin-bottom: 0.5rem;
}

p {
  font-size: 1.5rem;
  color: #F1F1F1;
  margin-bottom: 2rem;
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
  color: #F1F1F1;
  font-size: 1rem;
  text-align: center;
}

.login-link {
  color: #3B82F6;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
}

.login-link:hover {
  text-decoration: underline;
}

input {
  display: block;
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem 1.5rem;
  margin: 1rem 0;
  border: none;
  border-radius: 40px;
  background: #F1F1F1;
  color: #03192C;
  font-size: 1.15rem;
  box-shadow: none;
}

input::placeholder {
  color: #666;
  font-size: 1.1rem;
}

button {
  width: 60%;
  height: 2.5rem;
  padding: 0;
  margin: 2rem auto 0 auto;
  background: #F1F1F1;
  color: #03192C;
  border: none;
  border-radius: 40px;
  font-size: 1.15rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

button:hover {
  background: #e0e0e0;
}

a {
  color: #93C5FD;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>