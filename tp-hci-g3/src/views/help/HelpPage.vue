gi
import { leafActiveStrategy } from 'vuetify/lib/composables/nested/activeStrategies.mjs';

import { leafActiveStrategy } from 'vuetify/lib/composables/nested/activeStrategies.mjs';
<script setup>
import { useRoute } from 'vue-router'
import HelpInfoActivity from '@/views/help/HelpInfoActivity.vue'
import HelpInfoTransfer from '@/views/help/HelpInfoTransfer.vue'
import HelpInfoProfile from '@/views/help/HelpInfoProfile.vue'
import HelpInfoHomePage from '@/views/help/HelpInfoHomePage.vue'
import HelpInfoForgotPassword from './HelpInfoForgotPassword.vue'
import HelpInfoLoginAndRegisterVue from './HelpInfoLoginAndRegister.vue'
const route = useRoute()
import { computed } from 'vue'

const from = computed(() => route.query.from || '')

</script>

<template>
  <div class="help-page">
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
      <HelpInfoLoginAndRegisterVue/>
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
      <h2 class="subtitle"> Recuperar contraseña </h2>
      <HelpInfoForgotPassword/>
      <h2 class="subtitle"> Iniciar sesión y registro </h2>
      <HelpInfoLoginAndRegisterVue/>
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
  margin-left: 21vw;
  background-color: #eeeeee;
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
</style>
