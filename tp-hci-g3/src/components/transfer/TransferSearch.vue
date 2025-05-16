<template>
  <div class="search-panel">
    <h2 class="search-title">Transferir a…</h2>
    <div class="search-row">
      <input
        v-model="query"
        class="search-input"
        placeholder="Buscar por CBU, CVU o alias"
        @keyup.enter="emitSearch"
      />
      <button class="search-btn" @click="emitSearch" :disabled="!query.trim()">
        Buscar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const query = ref('')
const emit = defineEmits(['search'])
function emitSearch() {
  const term = query.value.trim()
  if (term) {
    emit('search', { term })
  }
}
</script>

<style scoped>
.search-panel {
  background: #03192C;
  border-radius: 16px;
  padding: 1.5rem;
}
.search-title {
  color: #fff;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}
.search-row {
  display: flex;
  gap: 0.5rem;
}
.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  background: #1f2937;
  color: #fff;
}
.search-input::placeholder {
  color: #aaa;
}
.search-btn {
  background: #2e7dff;
  color: #fff;
  padding: 0 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.search-btn:disabled {
  background: #555;
  cursor: not-allowed;
}
.search-btn:hover:enabled {
  background: #1b5edb;
}
</style>
