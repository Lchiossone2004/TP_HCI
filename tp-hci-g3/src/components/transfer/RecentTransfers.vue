<template>
  <div class="recents-panel">
    <div class="recents-header">
      <span>Contactos recientes</span>
      <input class="recents-search" placeholder="Buscar" />
    </div>
    <ul class="recents-list">
      <li
        v-for="t in transfers"
        :key="t.id"
        class="recents-item"
        @click="$emit('select', t)"
      >
        <img :src="t.avatar" class="avatar" />
        <div class="info">
          <span class="name">{{ t.name }}</span>
          <span class="alias">{{ t.alias }}</span>
        </div>
        <span class="amount">{{ t.amount }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  transfers: { type: Array, required: true, default: () => [] }
})
</script>

<style scoped>
.recents-panel {
  background: #fff;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}
.recents-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}
.recents-header span {
  font-size: 1.25rem;
  color: #03192C;
}
.recents-search {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}
.recents-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.recents-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}
.recents-item:hover {
  background: #f1f1f1;
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 0.75rem;
  object-fit: cover;
}
.info {
  display: flex;
  flex-direction: column;
}
.name {
  font-size: 1rem;
  font-weight: 600;
  color: #03192C;
}
.alias {
  font-size: 0.875rem;
  color: #666;
}
.amount {
  margin-left: auto;
  font-size: 0.875rem;
  color: #03192C;
}
</style>
