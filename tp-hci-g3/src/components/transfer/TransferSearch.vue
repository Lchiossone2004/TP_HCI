<template>
    <div class="transfer-card">
      <h2 class="title">Buscar para Transferir</h2>
      <div class="input-group">
        <input
          v-model="cbuOrAlias"
          type="text"
          placeholder="CBU o alias"
          class="input"
        />
        <h2 class ="divider">o</h2>
        <input
          v-model="nameOrPhone"
          type="text"
          placeholder="Nombre o celular"
          class="input"
        />
      </div>
      <button @click="emitSearch" class="transfer-button">Transferir</button>
    </div>
  </template>
  
<script setup>
import { ref, watch } from 'vue'

const cbuOrAlias = ref('')
const nameOrPhone = ref('')

const emit = defineEmits(['search'])

function emitSearch() {
  if (cbuOrAlias.value.trim() || nameOrPhone.value.trim()) {
    emit('search', {
      cbuOrAlias: cbuOrAlias.value.trim(),
      nameOrPhone: nameOrPhone.value.trim(),
    })
  }
}

// Limpiar el otro campo si se escribe en uno
watch(cbuOrAlias, (newVal) => {
  if (newVal.trim() !== '') {
    nameOrPhone.value = ''
  }
})

watch(nameOrPhone, (newVal) => {
  if (newVal.trim() !== '') {
    cbuOrAlias.value = ''
  }
})
</script>
  
  <style scoped>
  .transfer-card {
    background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  }
  
.title {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #03192C;
    text-align: center;
    display: block;
    width: 100%;
}
  
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .input {
    padding: 1rem 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1.5rem;
  }
  
  .transfer-button {
    background-color: #2e7dff;
    color: white;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 8px;
    font-size: 1.5rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .transfer-button:hover {
    background-color: #1b5edb;
  }
  .divider{
    align-self: center;
    opacity: 70%;
  }
  </style>
  
  