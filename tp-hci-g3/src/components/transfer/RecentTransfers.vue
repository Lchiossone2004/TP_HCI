<template>
  <div class="recents-panel">
    <ul class="recents-list">
      <li v-for="transfer in transfers" :key="transfer.id" class="recents-item">
        <div class="contact-info" @click="$emit('select', transfer)">
          <img :src="transfer.avatar" class="avatar" />
          <div class="info">
            <span class="name">{{ transfer.name }}</span>
            <span class="alias">{{ transfer.alias }}</span>
          </div>
          <span class="amount">{{ transfer.amount }}</span>
        </div>
        <button 
          class="favorite-btn"
          @click.stop="$emit('toggleFavorite', transfer.id)"
        >
          <span class="material-symbols-rounded">
            {{ isFavorite(transfer.id) ? 'stars' : 'star' }}
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  transfers: { 
    type: Array, 
    required: true
  },
  favoriteIds: {
    type: Set,
    required: true
  }
})

const emit = defineEmits(['select', 'toggleFavorite'])

const isFavorite = (id) => props.favoriteIds.has(id)
</script>

<style scoped>
.recents-panel {
  background: #fff;
  border-radius: 16px;
  padding: 1rem;
}

.recents-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.recents-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 8px;
  transition: background 0.2s;
}

.recents-item:hover {
  background: #f1f1f1;
}

.contact-info {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

.favorite-btn {
  color: var(--black-text);
  font-size: var(--font-text);
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
}

.favorite-btn:hover {
  color: var(--blue-button-hover);
}

.favorite-btn .material-symbols-rounded {
  font-size: 1.25rem;
}
</style>
