<template>
  <div class="header"> 
    <span class="material-symbols-rounded icon" @click="goToHelp">help</span>
  </div>
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

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import LoginForm from '@/components/Auth/LoginForm.vue'
import RegisterForm from '@/components/Auth/RegisterForm.vue'

const showLogin = ref(true)
const router = useRouter()
const route = useRoute()

function goToHelp() {
  router.push({
    name: 'HelpPage',
    query: { from: route.name || 'unknown' }
  })
}

onMounted(() => {
  if (localStorage.getItem('wingpay-remembered')) {
    router.push({ name: 'Home' })
  }
})
</script>



<style scoped>
.header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 20px; 
  background-color: transparent; 
}
.icon {
  margin-left: auto; 
  cursor: pointer;
  color: white; 
  transition: color 0.3s ease;
  font-size: var(--font-title);
}

.icon:hover {
  color: var(--blue-button-hover); 
}
.auth-wrapper {
  display: flex;
  height: 100vh;
  background-color: var(--white-text);
}

.welcome-section {
  width: 30%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2rem;
  padding-top: 4rem;
  position: relative;
  overflow: hidden;
  color: var(--black-text);
}

.welcome-section h1 {
  font-size: var(--font-login);
  margin-bottom: 1rem;
  margin-top: 2rem;
}

.welcome-text {
  font-size: var(--font-subtitle);
  max-width: 80%;
  text-align: left;
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
  background-color: var(--blue-button);
  bottom: 0;
  left: 0;
}

.circle-2 {
  width: 400px;
  height: 400px;
  background-color: var(--dark-blue);
  bottom: 20px;
  left: 100px;
}

.circle-3 {
  width: 300px;
  height: 300px;
  background-color: var(--blue-button-hover);
  bottom: 40px;
  left: 250px;
}



.auth-section {
  width: 70%;
  background-color: var(--dark-blue);
  padding: 3rem;
  display: flex;
  flex-direction: row;
  gap: 3rem;
  margin-left: auto; 
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
  background: var(--white-text);
  cursor: pointer;
  color: var(--dark-blue);
  padding: 1.2rem 2rem 1.2rem 3rem;
  text-align: left;
  border-radius: var(--button-radius) 0 0 var(--button-radius);
  transition: all 0.3s ease;
  font-size: var(--font-subtitle);
  min-width: 270px;
}

.auth-tabs-vertical button.active {
  background-color: var(--dark-blue);
  color: var(--white-text);
}

.form-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 350px; 
  max-width: 500px;
  margin: 0 auto; 
  padding: 0 1rem; 
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

@media (max-width: 1200px) {
  .auth-section {
    padding: 2rem;
  }

  .form-container {
    min-width: 300px;
  }

  .welcome-section h1 {
    font-size: calc(var(--font-login) * 0.85);
  }
}

@media (max-width: 992px) {
  .form-container {
    min-width: 280px;
  }
}

</style>