<template>
  <div :class="['app-container', { 'with-header': showHeader }]">
    <Sidebar v-if="showSidebar" />
    <Header v-if="showHeader" />
    <router-view></router-view>
  </div>
</template>
<script>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'App',
  components: {
    Header,
    Sidebar
  },
  setup() {
    const route = useRoute()
    const showSidebar = computed(() => {
      return route.path !== '/' && route.name !== 'notfound' && route.name !== 'Verification' && route.name !== 'PasswordRecovery'
    })
    const showHeader = computed(() => {
      // Don't show header on login page
      return route.path !== '/' && route.name !== 'notfound' && route.name !== 'Verification'  && route.name !== 'PasswordRecovery'
    })

    return {
      showHeader,
      showSidebar
    }
  }
}
</script>

<style>

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: var(--background-grey);
}
.v-application {
  font-family: 'Nunito', sans-serif !important;
}

.app-container {
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: var(--background-grey);
}

.app-container.with-header {
  padding-top: 40px;
}
</style>


