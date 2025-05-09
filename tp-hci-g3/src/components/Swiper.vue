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

    <div class="pagination">
      <span
        v-for="(_, index) in slideCount"
        :key="index"
        :class="['dot', { active: activeSlide === index }]"
        @click="activeSlide = index"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, useSlots } from 'vue'

const activeSlide = ref(0)
const slots = useSlots()
const slideCount = computed(() => slots.default?.().length || 0)
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



.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 1rem;
}

.dot {
  width: 10px;
  height: 10px;
  border: 1px solid white;
  border-radius: 50%;
  cursor: pointer;
  background-color: transparent;
}

.dot.active {
  background-color: white;
}
</style>