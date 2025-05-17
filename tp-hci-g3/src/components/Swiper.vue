<template>
  <div class="slider-card">
    <div class="slide-content" :style="{ transform: `translateX(-${activeSlide * 100}%)` }">
      <div v-for="(_, index) in totalSlides" :key="index" class="slide-wrapper">
        <slot :index="index"></slot>
      </div>
    </div>

    <div class="navigation-arrows" v-if="totalSlides > 1">
      <button 
        class="nav-arrow left" 
        :class="{ disabled: activeSlide === 0 }"
        @click="previousSlide"
        :disabled="activeSlide === 0"
      >
        <span class="material-symbols-rounded">chevron_left</span>
      </button>
      <button 
        class="nav-arrow right"
        :class="{ disabled: activeSlide === totalSlides - 1 }"
        @click="nextSlide"
        :disabled="activeSlide === totalSlides - 1"
      >
        <span class="material-symbols-rounded">chevron_right</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  cards: {
    type: Array,
    default: () => []
  }
})

const activeSlide = ref(0)
const totalSlides = ref(0)

onMounted(() => {
  // Contar el número total de slots
  updateTotalSlides()
})

watch(() => props.cards, () => {
  updateTotalSlides()
  // Asegurarse de que el slide activo no exceda el total
  if (activeSlide.value >= totalSlides.value) {
    activeSlide.value = Math.max(0, totalSlides.value - 1)
  }
}, { deep: true })

const updateTotalSlides = () => {
  // Número de slides es balance card + tarjetas + add button
  totalSlides.value = 2 + props.cards.length
}

const nextSlide = () => {
  if (activeSlide.value < totalSlides.value - 1) {
    activeSlide.value++
  }
}

const previousSlide = () => {
  if (activeSlide.value > 0) {
    activeSlide.value--
  }
}
</script>

<style scoped>
.slider-card {
  width: 100%;
  height: 300px;
  background-color: var(--dark-blue);
  border-radius: var(--general-radius);
  position: relative;
  overflow: hidden;
}

.slide-content {
  display: flex;
  transition: transform 0.5s ease-in-out;
  height: 100%;
  width: 100%;
}

/* Removemos los estilos que afectaban a los componentes internos */
.slide-wrapper {
  min-width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

/* Removemos los estilos de :slotted(*) que estaban afectando los componentes */
:slotted(*) {
  flex-shrink: 0;
}

.navigation-arrows {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.nav-arrow {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.2s ease;
  pointer-events: auto;
}

.nav-arrow:hover:not(.disabled) {
  background-color: rgba(255, 255, 255, 0.2);
}

.nav-arrow.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-arrow span {
  font-size: 25px;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 1rem;
}
</style>