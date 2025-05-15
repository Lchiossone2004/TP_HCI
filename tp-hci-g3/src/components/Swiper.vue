<template>
  <div class="slider-card">
    <div class="slide-content" :style="{ transform: `translateX(-${activeSlide * 100}%)` }">
      <div
        v-for="(slide, index) in slots.default?.()"
        :key="index"
        class="slide-wrapper"
      >
        <component :is="slide" />
      </div>
    </div>

    <div class="navigation-arrows">
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
        :class="{ disabled: activeSlide === slideCount - 1 }"
        @click="nextSlide"
        :disabled="activeSlide === slideCount - 1"
      >
        <span class="material-symbols-rounded">chevron_right</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, useSlots } from 'vue'

const activeSlide = ref(0)
const slots = useSlots()
const slideCount = computed(() => slots.default?.().length || 0)

const nextSlide = () => {
  if (activeSlide.value < slideCount.value - 1) {
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
  height: 300px; /* 💡 mismo alto que OperationsButtons */
  background-color: #03192c;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  padding: 1rem;
  box-sizing: border-box;
  position: relative;
}

.top-icons {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 1.5rem;
  z-index: 1;
}

.icon {
  font-size: 28px;
  cursor: pointer;
  color: white;
  transition: color 0.2s ease;
}

.icon:hover {
  color: #A8A8A8;
}

.slide-content {
  display: flex;
  transition: transform 0.5s ease-in-out;
  height: 100%;
  width: 100%;
}

.slide-wrapper {
  width: 100%;
  display: flex;
  justify-content: center; /* horizontal */
  align-items: center;     /* vertical */
  min-width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.navigation-arrows {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none; /* Permite que los clicks pasen a través del contenedor */
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
  pointer-events: auto; /* Restaura la interactividad solo para los botones */
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