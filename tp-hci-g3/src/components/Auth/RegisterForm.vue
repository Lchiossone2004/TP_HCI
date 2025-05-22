<template>
  <div class="auth-container">
    <h2>Registrarse</h2>
    <p>¡Hola! Comience su camino con WingPay</p>

    <input type="text" placeholder="Nombre" v-model="nombre" />
    <input type="text" placeholder="Apellido" v-model="apellido" />
    <input type="date" placeholder="Fecha de nacimiento" v-model="nacimiento" />
    <input type="email" placeholder="Email" v-model="email" />
    <input type="tel" placeholder="Teléfono celular" v-model="telefono" />
    <input type="password" placeholder="Contraseña" v-model="password" />

    <button @click="register">Aceptar</button>

    <div class="row-login">
      <span class="login-text">¿Ya tiene una cuenta?</span>
      <a href="#" class="login-link" @click="$emit('switch')">Inicie sesión</a>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/UserStore'

export default {
  data() {
    return {
      nombre: '',
      apellido: '',
      nacimiento: '',
      email: '',
      telefono: '',
      password: ''
    }
  },
  methods: {
    async register() {
      const datosUsuario = {
        firstName: this.nombre,
        lastName: this.apellido,
        birthDate: "1979-01-01",
        email: "magdalena.steuber5@ethereal.email",
        password: this.password,
        metadata: {}
      }

      try {
        const userStore = useUserStore()
        const resultado = await userStore.createUser(datosUsuario)

        console.log('Registro exitoso:', resultado)
        
        // ✅ Usar this.$router en Options API
        this.$router.push({ name: 'Verification' })
      } catch (error) {
        console.error('Error al registrar:', error)
      }
    }
  }
}
</script>


<style scoped>
.auth-container {
  padding: 2rem 1.5rem; /* Reduced padding */
  color: var(--white-text);
  width: 100%;
  max-width: 500px; /* Reduced from 600px */
  margin: 0 auto;
}

h2, p {
  text-align: center;
  width: 100%;
}

h2 {
  font-size: var(--font-login);
  margin-bottom: 0.5rem;
}

p {
  font-size: var(--font-title);
  margin-bottom: 2rem;
}

input {
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem 1.5rem;
  margin: 1rem 0;
  border-radius: var(--icon-radius);
  background: var(--white-inputs);
  display: block;
}

input::placeholder {
  color: var(--dark-grey-text);
  font-size: var(--font-text);
}

button {
  width: 45%;
  height: 2.5rem;
  margin: 2rem auto 0 auto;
  background: var(--blue-button);
  color: var(--white-text);
  border-radius: var(--button-radius);
  font-size: var(--font-subtitle);
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

button:hover {
  background: var(--blue-button-hover);
}

.row-login {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  width: 100%;
}

.login-text {
  color: var(--white-text);
  font-size: var(--font-text);
  text-align: center;
}

.login-link {
  color: var(--blue-link);
  text-decoration: none;
  font-size: var(--font-text);
  text-align: center;
}

.login-link:hover {
  text-decoration: underline;
}

@media (max-width: 1200px) {
  .auth-container {
    padding: 1.5rem 1rem;
  }

  h2 {
    font-size: calc(var(--font-login) * 0.85);
  }

  p {
    font-size: calc(var(--font-title) * 0.9);
  }

  input {
    margin: 0.75rem 0;
  }
}

@media (max-width: 992px) {
  .auth-container {
    padding: 1rem;
  }

  h2 {
    font-size: calc(var(--font-login) * 0.75);
  }

  p {
    font-size: calc(var(--font-title) * 0.85);
    margin-bottom: 1.5rem;
  }

  button {
    width: 60%;
  }
}
</style>