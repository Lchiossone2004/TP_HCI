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
  background: #061d33;
  padding: 2rem;
  border-radius: 8px;
  color: white;
  width: 100%;
  max-width: 400px;
}
input, button {
  display: block;
  margin: 1rem 0;
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
}
button {
  background: #3B82F6;
  color: white;
  cursor: pointer;
  font-weight: bold;
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