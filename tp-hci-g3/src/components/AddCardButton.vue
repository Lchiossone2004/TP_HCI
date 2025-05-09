<template>
    <button class="add-card-btn">
      <span class="material-symbols-rounded icon">add</span>
      Agregar
    </button>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .add-card-btn {
    background-color: #093256;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 14px;
  }
  
  .add-card-btn:hover {
    background-color: #0a4b85;
  }
  
  .icon {
    font-size: 18px;
  }
  </style>