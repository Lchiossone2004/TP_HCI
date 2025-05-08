<template>
    <div class="balance-card">
      <div class="balance-header">
        <span>Balance</span>
        <span class="material-symbols-rounded icon">visibility</span>
      </div>
      <div class="balance-amount">
        <span>$205.768,63</span>
        <span class="coin">
          <span>ARS</span>
        </span>
      </div>
      <div class="balance-yield">
        <span>Rendimiento de</span>
        <span class="balance-growth">
          <span>+24,6%</span>
        </span>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .balance-card {
    background: linear-gradient(135deg, #FFFF, #A8A8A8);
    border-radius: 10px;
    padding: 1rem;
    color: #03192C;
    width: 372px;
    height: 207px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .balance-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.4rem;
  }
  
  .balance-amount {
    font-size: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  
  .coin{
    color: #FFFF;
    background: #03192C;
    border-radius: 10px;
    padding: 1rem;
    width: 60px;
    height: 30px;
    display: flex;
    align-items: center;
    font-size: 20px;
    flex-direction: row;
    justify-content: center;
  }
  
  .balance-yield {
    font-size: 12px;
    color: #06B800;
    display: flex;
    gap: 0.5rem;
    align-items: baseline; /* Esto asegura que el texto y el ícono estén alineados */
  }
  
  .balance-growth {
    background-color: #9DD6AB;
    border-radius: 40px;
    width: 4rem;
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }
  
  .add-card-btn:hover {
    background-color: #0a4b85;
  }
  
  .icon {
    font-size: 22px;
    cursor: pointer;
  }
  </style>