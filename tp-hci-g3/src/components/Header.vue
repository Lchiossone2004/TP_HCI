<template>
  <div class="header">
    <button v-if="!isHomePage" @click="goBack" class="back-btn">
      <span class="material-symbols-rounded">arrow_back</span>
      Volver
    </button>
    <div class="top-icons">
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
  background-color: var(--background-grey);
  height: 50px;
  transition: background-color 0.3s ease;
}

.top-icons {
  display: flex;
  gap: 1.5rem;
  margin-left: auto;
}

.top-icons .material-symbols-rounded {
  font-size: var(--font-title);
  cursor: pointer;
  color: var(--black-text);
  transition: color 0.2s ease;
}

.top-icons .material-symbols-rounded:hover {
  color: var(--blue-button-hover);
}

.back-btn {
  color: var(--black-text);
  font-size: var(--font-text);
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
}

.back-btn:hover {
  color: var(--blue-button-hover);
}

@media (max-width: 600px) {
  .header {
    padding: 0.75rem 1rem;
  }
}
</style>
