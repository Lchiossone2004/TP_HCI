<template>
    <div class="slider-card">
      <div class="slide-content" :style="{ transform: `translateX(-${activeSlide * 100}%)` }">
        <slot />
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
    height: 100%;
    background-color: #03192c;
    color: white;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    overflow: hidden;
  }
  
  .slide-content {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }
  
  .slide-content > * {
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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
  