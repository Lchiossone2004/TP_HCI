<template>
  <div class="auth-container">
    <h2>Bienvenido</h2>
    <p>Es bueno verte de nuevo</p>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Contraseña" v-model="password" />
    <label><input type="checkbox" v-model="remember" /> Recordar siempre</label>
    <a href="#">¿Olvidó su contraseña?</a>
    <button @click="login">Aceptar</button>
    <p>¿No tiene una cuenta? <a href="#" @click="$emit('switch')">Regístrese</a></p>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  data() {
    return {
      email: '',
      password: '',
      remember: false
    };
  },
  methods: {
    login() {
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