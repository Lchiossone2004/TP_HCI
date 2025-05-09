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
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem;
  padding-top: 4rem;
  background-color: #F1F1F1;
  position: relative;
  overflow: hidden;
}

.welcome-section h1 {
  font-size: 3rem;
  color: #03192C;
  margin-bottom: 1rem;
  margin-top: 2rem;
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
  width: 100%;
  height: 100%;
}

.circle {
  position: absolute;
  border-radius: 50%;
  opacity: 1;
  transition: all 0.3s ease;
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

@media (max-width: 1200px) {
  .circle-1 {
    width: 350px;
    height: 350px;
  }
  .circle-2 {
    width: 350px;
    height: 350px;
    left: 80px;
  }
  .circle-3 {
    width: 250px;
    height: 250px;
    left: 200px;
  }
}

@media (max-width: 768px) {
  .circle-1 {
    width: 300px;
    height: 300px;
  }
  .circle-2 {
    width: 300px;
    height: 300px;
    left: 60px;
  }
  .circle-3 {
    width: 200px;
    height: 200px;
    left: 150px;
  }
}

.auth-section {
  width: 60%;
  background-color: #03192C;
  padding: 3rem;
  display: flex;
  flex-direction: row;
  gap: 3rem;
}

.auth-tabs {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem 0;
  justify-content: center;
  width: 250px;
}

.auth-tabs button {
  background: #F1F1F1;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: #03192C;
  padding: 1.5rem 3rem;
  text-align: center;
  border-radius: 50px;
  transition: all 0.3s ease;
  white-space: nowrap;
  width: 100%;
  font-size: 1.2rem;
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
  padding-left: 3rem;
  min-width: 450px;
}
</style>