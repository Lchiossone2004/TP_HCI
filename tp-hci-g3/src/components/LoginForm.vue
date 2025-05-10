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
  /* background: #093256; */
  padding: 4rem 3rem;
  /* border-radius: 12px; */
  color: white;
  width: 100%;
  max-width: 600px;
  align-items: center;
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

input {
  display: block;
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem 1.5rem;
  margin: 1rem 0;
  border-radius: 40px;
  background: #F1F1F1;
  color: #03192C;
  font-size: 1.15rem;
}

input::placeholder {
  color: #666;
  font-size: 1.1rem;
}

.row-remember {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin: 0.5rem 0 0.5rem 0;
  flex-wrap: nowrap;
}

.remember-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #F1F1F1;
  font-size: 1rem;
  margin: 0;
  white-space: nowrap;
}

.remember-label span {
  color: #F1F1F1;
  font-size: 1.08rem;
  font-weight: 500;
  margin-left: 0.3rem;
}

.forgot-link {
  color: #3B82F6;
  text-decoration: none;
  font-size: 1rem;
  white-space: nowrap;
  align-self: center;
}

.forgot-link:hover {
  text-decoration: underline;
}

button {
  width: 60%;
  height: 2.5rem;
  padding: 0;
  margin: 2rem auto 0 auto;
  background: #F1F1F1;
  color: #03192C;
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

.row-register {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  width: 100%;
}

.register-text {
  color: #F1F1F1;
  font-size: 1rem;
  text-align: center;
}

.register-link {
  color: #3B82F6;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
}

.register-link:hover {
  text-decoration: underline;
}
</style>