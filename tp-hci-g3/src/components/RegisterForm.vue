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
    <p>¿Ya tiene una cuenta? <a href="#" @click="$emit('switch')">Inicie sesión</a></p>
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
  background: #093256;
  padding: 3rem;
  border-radius: 12px;
  color: white;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

p {
  color: #93C5FD;
  margin-bottom: 2rem;
}

input {
  display: block;
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  border: none;
  border-radius: 8px;
  background: #03192C;
  color: white;
  font-size: 1rem;
}

input::placeholder {
  color: #93C5FD;
}

button {
  width: 100%;
  padding: 1rem;
  margin: 1.5rem 0;
  background: #3B82F6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background: #2563EB;
}

a {
  color: #93C5FD;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>