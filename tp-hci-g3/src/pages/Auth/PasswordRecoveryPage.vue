<template>
    <div class="reset-container">
      <h2>Recuperar Contraseña</h2>
  
      <!-- Paso 1: Enviar código al email -->
      <div v-if="step === 1">
        <p>Ingresa tu email para recibir un código de verificación</p>
        <input type="email" v-model="email" placeholder="Tu correo electrónico" required />
        <button @click="sendCode">Enviar código</button>
      </div>
  
      <!-- Paso 2: Verificar código y nueva contraseña -->
      <div v-if="step === 2">
        <p>Ingresa el código que recibiste y tu nueva contraseña</p>
        <input type="text" v-model="code" placeholder="Código de verificación" required />
        <input type="password" v-model="newPassword" placeholder="Nueva contraseña" required />
        <button @click="resetPassword">Actualizar contraseña</button>
      </div>
  
      <!-- Paso 3: Confirmación -->
      <div v-if="step === 3">
        <p class="success">¡Contraseña actualizada con éxito!</p>
        <button @click="$router.push('/')">Volver al inicio de sesión</button>
      </div>
  
      <!-- Mensaje de error -->
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import { useUserStore } from '@/stores/UserStore';

  export default {
    data() {
      return {
        email: '',
        code: '',
        newPassword: '',
        step: 1, // 1 = email, 2 = código y nueva contraseña, 3 = éxito
        error: ''
      };
    },
    methods: {
      sendCode(){
        const userStore = useUserStore()
        userStore.sendRecoveryCode(this.email)
        this.step = 2 
      },
      resetPassword(){
        const userStore = useUserStore()
        userStore.changePassword(this.code, this.newPassword)
        this.step = 3
      }
    }
  };
  </script>
  
  <style scoped>
  .reset-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 30px;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    text-align: center;
  }
  
  input {
    display: block;
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  button {
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  
  .success {
    color: green;
    font-weight: bold;
    margin-top: 20px;
  }
  </style>
  