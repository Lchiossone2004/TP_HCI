<template>
  <div class="flex auth-wrapper">
    <div class="sidebar">
      <h1>WingPay</h1>
      <button @click="showLogin = true" :class="{ active: showLogin }">Iniciar sesión</button>
      <button @click="showLogin = false" :class="{ active: !showLogin }">Registrarse</button>
    </div>
    <div class="main-form">
      <LoginForm v-if="showLogin" @switch="showLogin = false" />
      <RegisterForm v-else @switch="showLogin = true" />
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';

export default {
  components: { LoginForm, RegisterForm },
  data() {
    return {
      showLogin: true
    };
  }
};
</script>

<style scoped>
.auth-wrapper {
  display: flex;
  height: 100vh;
}
.sidebar {
  background: #f4f4f4;
  width: 250px;
  padding: 2rem;
}
.sidebar button {
  display: block;
  margin-top: 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: bold;
}
.sidebar .active {
  background-color: #061d33;
  color: white;
  padding: 0.5rem;
  border-radius: 5px;
}
.main-form {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>