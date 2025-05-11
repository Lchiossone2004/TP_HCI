<template>
  <div class="suggested-contacts">
    <h2 class="suggested title">Contactos sugeridos</h2>
    <div class="divider"></div> <!-- Línea gris -->
    <ul class="contact-list">
      <li
        v-for="contact in suggested"
        :key="contact.id"
        class="contact-item"
        @click="selectContact(contact)"
      >
        <img :src="contact.avatar" alt="avatar" class="avatar" />
        <div class="info">
          <span class="name">{{ contact.name }}</span>
          <span class="alias">{{ contact.alias }}</span>
        </div>
      </li>
    </ul>

    <h2 class="recent title">Contactos recientes</h2>
    <div class="divider"></div> <!-- Línea gris -->
    <ul class="contact-list">
      <li
        v-for="contact in recent"
        :key="contact.id"
        class="contact-item"
        @click="selectContact(contact)"
      >
        <img :src="contact.avatar" alt="avatar" class="avatar" />
        <div class="info">
          <span class="name">{{ contact.name }}</span>
          <span class="alias">{{ contact.alias }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  suggested: {
    type: Array,
    required: true,
    default: () => [],
  },
  recent: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const emit = defineEmits(['select'])

function selectContact(contact) {
  emit('select', contact)
}
</script>

  
  <style scoped>
  .suggested-contacts {
    padding: 1rem;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }
  
  .title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #03192C;
    text-align: center;
  }
  
  .contact-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .contact-item {
    display: flex;
    align-items: center;
    padding: 0.8rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    
  }
  
  .contact-item:hover {
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
  .divider {
    height: 1px;
    background-color: rgba(0, 0, 0, 0.1);
    margin: 0.5rem 1rem;
    border: none;
  }
  </style>
  