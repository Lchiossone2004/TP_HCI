<template>
  <div class="flex auth-wrapper">
    <div class="welcome-section">
      <h1>WingPay</h1>
      <p class="welcome-text">Tu billetera digital segura y confiable</p>
      <div class="auth-tabs-vertical">
        <button @click="showLogin = true" :class="{ active: showLogin }">Iniciar sesión</button>
        <button @click="showLogin = false" :class="{ active: !showLogin }">Registrarse</button>
      </div>
      <div class="circles">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
        <div class="circle circle-3"></div>
      </div>
    </div>
    <div class="auth-section">
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
  background-color: #FFFF;
}

.welcome-section {
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2rem;
  padding-top: 4rem;
  background-color: #FFFF;
  position: relative;
  overflow: hidden;
}

.welcome-section h1 {
  font-size: 2.5rem;
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
  bottom: -160px;
  left: -120px;
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
  background-color: #073259;
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
  width: 70%;
  background-color: #03192C;
  padding: 3rem;
  display: flex;
  flex-direction: row;
  gap: 3rem;
}

.auth-tabs-vertical {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: absolute;
  right: -60px;
  top: 35%;
  z-index: 2;
}

.auth-tabs-vertical button {
  background: #FFFF;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: #03192C;
  padding: 1.2rem 2rem 1.2rem 3rem;
  text-align: left;
  border-radius: 40px 0 0 40px;
  transition: all 0.3s ease;
  font-size: 1.3rem;
  min-width: 270px;
}

.auth-tabs-vertical button.active {
  background-color: #03192C;
  color: #FFFF;
  border: 2px solid #03192C;
}

.form-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 450px;
}
</style>