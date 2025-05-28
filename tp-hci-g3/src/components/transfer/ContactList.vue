<template>
  <div class="contact-list">
    <div v-for="contact in contacts" :key="contact.id" class="contact-item">
      <div class="contact-info" @click="$emit('select', contact)">  
        <img :src="contact.avatar" :alt="contact.name" class="avatar">
        <div class="info">
          <span class="name">{{ contact.name }}</span>
          <span class="alias">{{ contact.alias }}</span>
        </div>
      </div>
      <button 
        v-if="showFavoriteButton"
        class="favorite-btn"
        @click.stop="$emit('toggleFavorite', contact.id)"
      >
        <span class="material-symbols-rounded">
          {{ isFavorite(contact.id) ? 'stars' : 'star' }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  contacts: {
    type: Array,
    required: true
  },
  showFavoriteButton: {
    type: Boolean,
    default: false
  },
  favoriteIds: {
    type: Set,
    required: true
  }
})

const isFavorite = (id) => props.favoriteIds.has(id)

defineEmits(['select', 'toggleFavorite'])
</script>

<style scoped>
.contact-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: var(--icon-radius);
  background-color: var(--background-grey);
  transition: background-color 0.2s;
}

.contact-item:hover {
  background-color: var(--light-grey);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.contact-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.name {
  font-size: var(--font-text);
  color: var(--black-text);
  font-weight: 500;
}

.alias {
  font-size: var(--font-small);
  color: var(--dark-grey-text);
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

.select-btn {
  padding: 0.5rem 1rem;
  background-color: var(--dark-blue);
  color: var(--white-text);
  border: none;
  border-radius: var(--button-radius);
  cursor: pointer;
  font-size: var(--font-small);
  transition: background-color 0.2s;
}

.select-btn:hover {
  background-color: var(--blue-button-hover);
}

@media (max-width: 768px) {
  .contact-item {
    flex-wrap: wrap;
  }

  .actions {
    width: 100%;
    justify-content: flex-end;
    margin-top: 0.5rem;
  }
}
</style>