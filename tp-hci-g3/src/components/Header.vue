<template>
  <div :class="['header', { 'special-header': isActivityPage }]">
    <button v-if="!isHomePage" @click="goBack" class="back-btn">
      <span class="material-symbols-rounded">arrow_back</span>
      Volver
    </button>
    <div class="top-icons">
      <span v-if="isHomePage" class="material-symbols-rounded icon">notifications</span>
      <span class="material-symbols-rounded icon" @click="goToHelp">help</span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'Header',
  setup() {
    const route = useRoute()
    const router = useRouter()

    const isHomePage = computed(() => route.name === 'Home')
    const isActivityPage = computed(() => route.name === 'Actividad')

    const goBack = () => {
      router.go(-1)
    }
    const goToHelp = () => {
  router.push({
    path: '/help',
    query: { from: route.name }
  })
}

    return {
      isHomePage,
      isActivityPage,
      goBack,
      goToHelp
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  right: 0;
  left: 21vw;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  gap: 1.5rem;
  background-color: #eeeeee;
  height: 50px;
  transition: background-color 0.3s ease;
}

.special-header {
  background-color: #e6e6e6;
}

.top-icons {
  display: flex;
  gap: 1.5rem;
  margin-left: auto;
}

.top-icons .material-symbols-rounded {
  font-size: 24px;
  cursor: pointer;
  color: #03192C;
  transition: color 0.2s ease;
}

.top-icons .material-symbols-rounded:hover {
  color: #0a4b85;
}

.back-btn {
  background: none;
  border: none;
  color: #03192C;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.3rem;
  font-weight: bold;
  padding: 0;
}

.back-btn:hover {
  color: #0a4b85;
}

@media (max-width: 600px) {
  .header {
    padding: 0.75rem 1rem;
  }
}
</style>
