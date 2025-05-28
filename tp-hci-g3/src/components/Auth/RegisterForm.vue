<template>
  <div class="auth-container">
    <h2>Registrarse</h2>
    <p>¡Hola! Comience su camino con WingPay</p>
    <div class="input-with-icon">
      <span class="material-symbols-rounded icon">id_card</span>
      <input 
        type="text" 
        placeholder="Nombre" 
        v-model="nombre" 
        @input="handleInput('nombre')"
      />
    </div>
    <div class="input-with-icon">
      <span class="material-symbols-rounded icon">id_card</span>
      <input 
        type="text" 
        placeholder="Apellido" 
        v-model="apellido" 
        @input="handleInput('apellido')"
      />
    </div>
    <div class="input-with-icon">
      <span class="material-symbols-rounded icon">calendar_month</span>
      <input 
        type="date" 
        placeholder="Fecha de nacimiento" 
        v-model="nacimiento" 
        @input="clearError"
      />
    </div>
    <div class="input-with-icon">
      <span class="material-symbols-rounded icon">mail</span>
      <input 
        type="email" 
        placeholder="Email" 
        v-model="email" 
        @input="clearError"
      />
    </div>
    <div class="input-with-icon">
      <span class="material-symbols-rounded icon">key</span>
      <input 
        :type="showPassword ? 'text' : 'password'" 
        placeholder="Contraseña" 
        v-model="password" 
        @input="clearError"
      />
      <span 
        class="material-symbols-rounded right-icon" 
        @click="togglePasswordVisibility"
      >
        {{ showPassword ? 'visibility' : 'visibility_off' }}
      </span>
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
      password: '',
      formError: '',
      showPassword: false
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    
    clearError() {
      this.formError = '';
    },

    handleInput(field) {
      this.clearError();
      this.capitalizeFirstLetter(field);
    },
    
    capitalizeFirstLetter(field) {
      // Solo permitir letras y espacios
      this[field] = this[field].replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '');
      
      if (this[field]) {
        this[field] = this[field].split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
      }
    },
    
    validarFormulario() {
      // Reiniciar mensaje de error
      this.formError = '';
      
      // Validar campos vacíos
      if (!this.nombre || !this.apellido || !this.nacimiento || !this.email || !this.password) {
        this.formError = 'Por favor complete todos los campos.';
        return false;
      }
      
      // Validar formato de nombre y apellido
      const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
      if (!nombreRegex.test(this.nombre) || !nombreRegex.test(this.apellido)) {
        this.formError = 'Nombre y apellido solo deben contener letras.';
        return false;
      }
      
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.formError = 'Ingrese un correo electrónico válido.';
        return false;
      }

      // Validar edad (18 años o más)
      const birthDate = new Date(this.nacimiento);
      // Verificar que la fecha sea válida
      if (isNaN(birthDate.getTime())) {
        this.formError = 'Ingrese una fecha de nacimiento válida.';
        return false;
      }
      
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
      const is18OrOlder = age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));

      if (!is18OrOlder) {
        this.formError = 'Debe tener al menos 18 años para registrarse.';
        return false;
      }

      // Validar longitud de contraseña
      if (this.password.length < 10) {
        this.formError = 'La contraseña debe tener al menos 10 caracteres.';
        return false;
      }

      return true;
    },

    async register() {
      if (!this.validarFormulario()) return;

      try {
        const datosUsuario = {
          firstName: this.nombre,
          lastName: this.apellido,
          birthDate: this.nacimiento,
          email: this.email,
          password: this.password,
          metadata: {}
        }

        console.log('Datos a enviar:', datosUsuario);

        const userStore = useUserStore()
        const resultado = await userStore.createUser(datosUsuario)

        console.log('Registro exitoso:', resultado)
        this.$router.push({ 
          name: 'Verification',
          params: { email: this.email }
        })
      } catch (error) {
        console.error('Error al registrar:', error)
        
        // Detectar si el error contiene información sobre email duplicado o en uso
        const errorMsg = error.message || '';
        
        // Comprobación específica para "Email already in use" que es lo que está devolviendo la API
        if (errorMsg.includes('already in use') || errorMsg.includes('duplicate') || errorMsg.includes('already exists')) {
          // Mostrar un mensaje con opciones claras al usuario
          if (confirm('Este email ya está registrado pero podría no estar verificado. ¿Desea intentar reenviar el código de verificación?')) {
            try {
              const userStore = useUserStore();
              const result = await userStore.resendVerification(this.email);
              
              if (result) {
                // Si el reenvío fue exitoso, redirigir a la página de verificación
                this.$router.push({ 
                  name: 'Verification',
                  params: { email: this.email }
                });
                return;
              } else {
                // Si el reenvío falló pero no lanzó un error, puede ser que la cuenta esté verificada
                this.formError = 'No se pudo reenviar el código. Es posible que esta cuenta ya esté verificada, intente iniciar sesión.';
              }
            } catch (resendError) {
              // Analizar el error específico
              if (resendError.message === 'account_already_verified') {
                this.formError = 'Esta cuenta ya está verificada. Por favor, inicie sesión o recupere su contraseña si la olvidó.';
              } else {
                this.formError = 'Error al reenviar el código de verificación. Intente nuevamente más tarde.';
              }
            }
          } else {
            // Usuario no quiere reenviar el código
            this.formError = 'Por favor, utilice otro correo electrónico para registrarse o inicie sesión si ya tiene cuenta.';
          }
        } else {
          // Otros errores
          this.formError = 'Hubo un error al registrar. Intente nuevamente.';
        }
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
.error {
  font-size: var(--font-text);
  color: var(--red-error-message);
  margin-top: 0.5rem;

}
.input-with-icon input {
  padding-left: 2.5rem;
  height: 40px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: var(--icon-radius);
  padding-right: 1rem;
}

.input-with-icon .icon {
  position: absolute;
  left: 10px;
  font-size: var(--icon-little);
  color: var(--dark-grey-text);
}

.input-with-icon .right-icon {
  position: absolute;
  right: 10px;
  font-size: var(--icon-little);
  color: var(--black-text);
  cursor: pointer;
}

.input-with-icon .right-icon:hover {
  color: var(--blue-button-hover);
}

.auth-container {
  padding: 2rem 1.5rem;
  color: var(--white-text);
  width: 100%;
  max-width: 500px;
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
</style>