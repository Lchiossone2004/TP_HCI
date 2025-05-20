<template>
  <div class="layout">
    <main class="main-content">
      <div class="services-container">
        <h1>Servicios</h1>
        <div class="tabs">
          <button 
            :class="['tab-btn', { active: activeTab === 'collect' }]"
            @click="activeTab = 'collect'"
          >
            Cobrar servicios
          </button>
          <button 
            :class="['tab-btn', { active: activeTab === 'pay' }]"
            @click="activeTab = 'pay'"
          >
            Pagar servicios
          </button>
        </div>

        <div class="tab-content">
          <ChargeServices v-if="activeTab === 'collect'" />
          <PayServices v-if="activeTab === 'pay'" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import ChargeServices from '@/components/ChargeServices.vue'
import PayServices from '@/components/PayServices.vue'


const route = useRoute()
const activeTab = ref('collect')

// Establecer pestaña activa basada en el query parameter
onMounted(() => {
  if (route.query.tab) {
    activeTab.value = route.query.tab
  }
})

// Actualizar pestaña cuando cambie la URL
watch(() => route.query.tab, (newTab) => {
  if (newTab) {
    activeTab.value = newTab
  }
})

</script>

<style scoped>
.layout {
  width: 100%;
  min-height: 100vh;
}

.main-content {
  margin-left: 21vw;
  padding: 1rem;
  min-height: 100vh;
  background-color: var(--background-grey);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.services-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

h1 {
  font-size: var(--font-title);
  color: var(--black-text);
  margin-bottom: 1rem;
}

.tabs {
  display: flex;
  gap: 1rem;
  border-bottom: 2px solid var(--border-grey);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding-bottom: 2px;
}

.tab-btn {
  padding: 1rem 2rem;
  border: none;
  background: none;
  color: var(--text-grey);
  font-size: var(--font-text);
  cursor: pointer;
  position: relative;
  white-space: nowrap;
}

.tab-btn.active {
  color: var(--dark-blue);
  font-weight: 500;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--dark-blue);
}

.tab-content {
  width: 100%;
}


@media (max-width: 480px) {
  .main-content {
    padding: 0.5rem;
  }

  .tab-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
</style>