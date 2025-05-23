<template>
  <div class="auth-container">
    <h2>Registrarse</h2>
    <p>¡Hola! Comience su camino con WingPay</p>
    <div class="input-with-icon">
    <span class="material-symbols-rounded icon">id_card</span>
    <input type="text" placeholder="Nombre" v-model="nombre" />
    </div>
    <div class="input-with-icon">
    <span class="material-symbols-rounded icon">id_card</span>
    <input type="text" placeholder="Apellido" v-model="apellido" />
    </div>
    <div class="input-with-icon">
    <span class="material-symbols-rounded icon">calendar_month</span>
    <input type="date" placeholder="Fecha de nacimiento" v-model="nacimiento" />
    </div>
    <div class="input-with-icon">
    <span class="material-symbols-rounded icon">mail</span>
    <input type="email" placeholder="Email" v-model="email" />
    </div>
    <div class="input-with-icon">
    <span class="material-symbols-rounded icon">call</span>
    <input type="tel" placeholder="Teléfono celular" v-model="telefono" />
    </div>
    <div class="input-with-icon">
    <span class="material-symbols-rounded icon">key</span>
    <input type="password" placeholder="Contraseña" v-model="password" />
    </div>

    <p v-if="formError" class="error">{{ formError }}</p>

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
      password: '',
      formError: ''
    }
  },
  methods: {
    validarFormulario() {
      if (!this.nombre || !this.apellido || !this.nacimiento || !this.email || !this.telefono || !this.password) {
        this.formError = 'Por favor complete todos los campos.';
        return false;
      }

      const birthDate = new Date(this.nacimiento);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
      const is18OrOlder = age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));

      if (!is18OrOlder) {
        this.formError = 'Debe tener al menos 18 años para registrarse.';
        return false;
      }

      if (this.password.length < 10) {
        this.formError = 'La contraseña debe tener al menos 10 caracteres.';
        return false;
      }

      this.formError = ''; // Todo ok
      return true;
    },

    async register() {
      if (!this.validarFormulario()) return;

      const datosUsuario = {
        firstName: this.nombre,
        lastName: this.apellido,
        birthDate: this.nacimiento,
        email: this.email,
        password: this.password,
        metadata: {}
      }

      try {
        const userStore = useUserStore()
        const resultado = await userStore.createUser(datosUsuario)

        console.log('Registro exitoso:', resultado)
        this.$router.push({ name: 'Verification' })
      } catch (error) {
        console.error('Error al registrar:', error)
        this.formError = 'Hubo un error al registrar. Intente nuevamente.';
      }
    }
  }
}
</script>


<style scoped>
.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-with-icon input {
  padding-left: 2.5rem;
  height: 40px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding-right: 1rem;
}

.input-with-icon .icon {
  position: absolute;
  left: 10px;
  font-size: 20px;
  color: #666;
}

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
.error {
  color: red;
  margin-top: 10px;
}
</style>