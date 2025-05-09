<template>
  <div class="flex auth-wrapper">
    <div class="welcome-section">
      <h1>WingPay</h1>
      <p class="welcome-text">Tu billetera digital segura y confiable</p>
      <div class="circles">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
        <div class="circle circle-3"></div>
      </div>
    </div>
    <div class="auth-section">
      <div class="auth-tabs">
        <button @click="showLogin = true" :class="{ active: showLogin }">Iniciar sesión</button>
        <button @click="showLogin = false" :class="{ active: !showLogin }">Registrarse</button>
      </div>
      <div class="form-container">
        <LoginForm v-if="showLogin" @switch="showLogin = false" />
        <RegisterForm v-else @switch="showLogin = true" />
      </div>
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
  background-color: #F1F1F1;
}

.welcome-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #F1F1F1;
  position: relative;
  overflow: hidden;
}

.welcome-section h1 {
  font-size: 3rem;
  color: #03192C;
  margin-bottom: 1rem;
}

.welcome-text {
  font-size: 1.2rem;
  color: #666;
}

.circles {
  position: absolute;
  bottom: -50px;
  left: -50px;
  z-index: 0;
}

.circle {
  position: absolute;
  border-radius: 50%;
  opacity: 1;
}

.circle-1 {
  width: 400px;
  height: 400px;
  background-color: #093256;
  bottom: 0;
  left: 0;
}

.circle-2 {
  width: 400px;
  height: 400px;
  background-color: #03192C;
  bottom: 20px;
  left: 100px;
}

.circle-3 {
  width: 300px;
  height: 300px;
  background-color: #0a4b85;
  bottom: 40px;
  left: 250px;
}

.auth-section {
  width: 50%;
  background-color: #03192C;
  padding: 2rem;
  display: flex;
  flex-direction: row;
  gap: 2rem;
}

.auth-tabs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 0;
  justify-content: center;
  width: 200px;
}

.auth-tabs button {
  background: #F1F1F1;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: #03192C;
  padding: 1rem 2rem;
  text-align: center;
  border-radius: 50px;
  transition: all 0.3s ease;
  white-space: nowrap;
  width: 100%;
}

.auth-tabs button.active {
  background-color: #03192C;
  color: #F1F1F1;
  border: 2px solid #F1F1F1;
}

.form-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #093256;
  padding-left: 2rem;
}
</style>