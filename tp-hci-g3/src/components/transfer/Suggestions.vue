<template>
  <div class="suggest-panel">
    <h2 class="suggest-title">Contactos sugeridos</h2>
    <ul class="suggest-list">
      <li v-for="c in suggested" :key="c.id" @click="select(c)" class="suggest-item">
        <img :src="c.avatar" class="avatar" />
        <div class="info">
          <span class="name">{{ c.name }}</span>
          <span class="alias">{{ c.alias }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  suggested: { type: Array, required: true, default: () => [] }
})
const emit = defineEmits(['select'])
function select(c) { emit('select', c) }
</script>

<style scoped>
.suggest-panel {
  background: #fff;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}
.suggest-title {
  font-size: 1.25rem;
  color: #03192C;
  margin-bottom: 0.75rem;
  text-align: center;
}
.suggest-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.suggest-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background .2s;
}
.suggest-item:hover { background: #f1f1f1; }
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 0.75rem;
  object-fit: cover;
}
.info { display: flex; flex-direction: column; }
.name { font-size: 1rem; font-weight: 600; color: #03192C; }
.alias { font-size: 0.875rem; color: #666; }
</style>
