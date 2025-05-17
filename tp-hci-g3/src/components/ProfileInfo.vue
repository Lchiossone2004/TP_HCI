<template>
  <div class="profile-container">
    <div class="profile-header">
      <button class="edit-btn" @click="$emit('edit')">
        Editar perfil
      </button>
    </div>
    
    <div class="profile-content">
      <div class="profile-image">
        <img :src="perfil.avatar" :alt="perfil.nombre" />
        <h2>{{ perfil.nombre }}</h2>
        <a :href="`mailto:${perfil.email}`">{{ perfil.email }}</a>
      </div>
      
      <div class="profile-details">
        <div class="detail-row">
          <span>DNI:</span>
          <span>{{ perfil.dni }}</span>
        </div>
        <div class="detail-row">
          <span>Nombre:</span>
          <span>{{ perfil.nombre }}</span>
        </div>
        <div class="detail-row">
          <span>Apellido:</span>
          <span>{{ perfil.apellido }}</span>
        </div>
        <div class="detail-row">
          <span>Número:</span>
          <span>{{ perfil.telefono }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    perfil: {
      type: Object,
      required: true
    }
  })

  defineEmits(['edit'])
</script>

<style scoped>
  .profile-container {
    background-color: var(--dark-blue);
    border-radius: var(--general-radius);
    color: var(--white-text);
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }

  .profile-header {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1rem;
  }

  .edit-btn {
    background: transparent;
    border: 2px solid var(--white-text);
    color: var(--white-text);
    border-radius: var(--button-radius);
    padding: 0.5rem 1.5rem;
    font-size: var(--font-text);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .edit-btn:hover {
    background: var(--white-text);
    color: var(--dark-blue);
  }

  .profile-content {
  display: flex;
  padding: 2rem;
  gap: 4rem;
  width: 100%;
  box-sizing: border-box;
}

  .profile-image {
    background: #073259;
    padding: 2rem;
    border-radius: var(--general-radius);
    text-align: center;
    width: 400px;
    min-width: 300px;
    flex-shrink: 0; /* Prevents the profile image from shrinking */
  }

  .profile-image img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
  }

  .profile-image h2 {
    font-size: var(--font-big);
    margin: 1rem 0;
  }

  .profile-image a {
    color: var(--blue-link);
    text-decoration: none;
    font-size: var(--font-text);
  }

  .profile-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    text-align: left;
    gap: 2rem;
    padding: 1rem;
    width: 100%;
    box-sizing: border-box;
  }

  .detail-row {
    display: flex;
    gap: 1rem;
    font-size: var(--font-subtitle);
    width: 100%;
    max-width: 600px; /* Add max-width to prevent too wide rows */
  }

  .detail-row span:first-child {
    font-weight: bold;
    min-width: 100px;
  }

  @media (max-width: 1150px) {
    .profile-content {
      flex-direction: column;
      align-items: center;
    }

    .profile-image {
      width: 100%;
      max-width: 400px;
    }

    .profile-details {
      width: 100%;
      align-items: center;
      flex-direction: column;
    }
  }
</style>