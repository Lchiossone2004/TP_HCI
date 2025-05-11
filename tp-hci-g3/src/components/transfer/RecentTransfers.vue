<template>
    <div class="recent-transfers">
      <h2 class="title">Transferencias Recientes</h2>
      <div class="divider"></div>
      <ul class="transfer-list">
        <li
        v-for="transfer in transfers"
        :key="transfer.id"
        class="transfer-item"
        @click="$emit('select', transfer)"
      >
          <img :src="transfer.avatar" alt="avatar" class="avatar" />
          <div class="info">
            <span class="name">{{ transfer.name }}</span>
            <span class="alias">{{ transfer.alias }}</span>
          </div>
          <span class="amount">{{ transfer.amount }}</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    transfers: {
      type: Array,
      required: true,
      default: () => [],
    },
  })
  </script>
  
  <style scoped>
  .recent-transfers {
    margin-top: 2rem;
    padding: 1rem;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }
  
  .title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
    color: #03192C;
    text-align: center;
  }
  
  .transfer-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .transfer-item {
    display: flex;
    align-items: center;
    padding: 0.8rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .transfer-item:hover {
    background-color: #f1f1f1;
  }
  
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 1rem;
  }
  
  .info {
    display: flex;
    flex-direction: column;
  }
  
  .name {
    font-weight: bold;
    font-size: 1.5rem;
  }
  
  .alias {
    font-size: 0.9rem;
    color: #666;
    font-size: 1.5rem;
  }
  .amount {
    font-size: 1rem;
    color: #666;
    margin-left: auto; 
  }
  .divider {
    height: 1px;
    background-color: rgba(0, 0, 0, 0.1); 
    margin: 0.5rem 1rem; 
    border: none;
  }
  </style>