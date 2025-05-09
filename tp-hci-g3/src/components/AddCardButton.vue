<template>
    <div class="add-card">
      <button class="add-icon">
        <span class="material-symbols-rounded icon">add</span>
      </button>
      <span>Agregar tarjeta</span>
    </div>
  </template>

  <script setup>
  </script>
  
  <style scoped> 
  .add-card {
    border: 3px solid white;
    border-radius: 20px;
    background-color: #03192C;
    color: white;
    padding: 1rem;
    width: 372px;
    height: 207px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 14px;
  }

  .add-icon{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    color: #FFFF;
  }
  
  .add-card-btn:hover {
    background-color: #cececf;
  }
  
  .icon {
    font-size: 18px;
    color: #03192C
  }
  </style>
  