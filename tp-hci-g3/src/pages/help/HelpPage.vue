import { leafActiveStrategy } from 'vuetify/lib/composables/nested/activeStrategies.mjs';

<script setup>
import { useRoute } from 'vue-router'
import HelpInfoActivity from '@/pages/help/HelpInfoActivity.vue'
import HelpInfoTransfer from '@/pages/help/HelpInfoTransfer.vue'
import HelpInfoProfile from '@/pages/help/HelpInfoProfile.vue'
import HelpInfoHomePage from '@/pages/help/HelpInfoHomePage.vue'
import HelpInfoForgotPassword from '@/pages/help/HelpInfoForgotPassword.vue'
import HelpInfoLoginAndRegister from '@/pages/help/HelpInfoLoginAndRegister.vue'
import HelpInfoVerificationCode from '@/pages/help/HelpInfoVerificationCode.vue'
const route = useRoute()
import { computed } from 'vue'

const from = computed(() => route.query.from || '')

</script>

<template>
  <div class="help-page">
    <button class="back-button" @click="$router.back()">
      <span class="material-symbols-rounded">arrow_back</span>
      Volver
    </button>
    <div v-if="from === 'ProfilePage'">
      <h1>Ayuda - Perfil</h1>
      <HelpInfoProfile/>
    </div>

    <div v-else-if="from === 'Actividad'">
      <h1>Ayuda - Actividad reciente</h1>
      <HelpInfoActivity/>
    </div>

    <div v-else-if="from === 'Home'">
      <h1>Ayuda - Página principal</h1>
      <HelpInfoHomePage/>
    </div>
    <div v-else-if="from === 'Transfer'">
      <h1>Ayuda - Transferencias </h1>
      <HelpInfoTransfer/>
    </div>
    <div v-else-if="from === 'PasswordRecovery'">
      <h1>Ayuda - Recuperar contraseña</h1>
      <HelpInfoForgotPassword/>
    </div>
    <div v-else-if="from === 'Auth'">
      <h1>Ayuda - Iniciar sesión y registro</h1>
      <HelpInfoLoginAndRegister/>
    </div>
    <div v-else-if="from === 'Verification'">
      <h1>Ayuda - Verificación de tus datos</h1>
      <HelpInfoVerificationCode/>
      </div>
    <div v-else>
      <h1>Centro de Ayuda</h1>
      <h2 class="subtitle"> Página principal </h2>
      <HelpInfoHomePage/>
      <h2 class="subtitle"> Actividad reciente </h2>
      <HelpInfoActivity/>
      <h2 class="subtitle"> Realizar transferencias </h2>
      <HelpInfoTransfer/>
      <h2 class="subtitle"> Mi perfil </h2>
      <HelpInfoProfile/>
      <h2 class="subtitle"> Iniciar sesión y registro </h2>
      <HelpInfoLoginAndRegister/>
      <h2 class="subtitle"> Recuperar contraseña </h2>
      <HelpInfoForgotPassword/>
      <h2 class="subtitle"> Verificación de tus datos </h2>
      <HelpInfoVerificationCode/>
    </div>

    <p class="more-help" v-if="from !== ''">
      ¿Necesitas más ayuda? Visita el 
      <router-link :to="{ name: 'HelpPage' }">
        centro de ayuda.
    </router-link>
    </p>
  </div>
</template>

<style scoped>
.help-page {
    display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
}
.more-help {
  margin-top: 2rem;
  font-size: 1rem;
  color: #333;
}

.more-help a {
  color: #0a4b85;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}

.more-help a:hover {
  color: #06315c;
}
.subtitle {
    align-items: left;
    text-align: left;
}
.back-button {
  color: var(--black-text);
  font-size: var(--font-text);
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
  position: absolute;
  top: 1rem;
  left: 1rem;
}

.back-button .material-symbols-outlined {
  margin-right: 0.5rem;
  font-size: 0.5rem; 
  vertical-align: middle;
}
.back-button:hover {
  color: var(--blue-button-hover);
}

</style>
