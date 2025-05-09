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

input[type="email"],
input[type="password"] {
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

input[type="email"]::placeholder,
input[type="password"]::placeholder {
  color: #93C5FD;
}

label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #93C5FD;
  margin: 1rem 0;
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
  display: block;
  margin: 1rem 0;
}

a:hover {
  text-decoration: underline;
}
</style>