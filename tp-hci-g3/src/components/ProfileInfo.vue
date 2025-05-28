<template>
  <div class="profile-container">
    <div class="profile-header">
      <button class="edit-btn" @click="$emit('edit')">
        Editar perfil
      </button>
    </div>
    
    <div class="profile-content">
      <div class="profile-image">
        <img :src="perfil.avatar"  :alt="perfil.nombre" />
        <h2>{{ perfil.nombre }}</h2>
        <h3>{{ perfil.email }}</h3>
      </div>
      
      <div class="profile-details">
        <div class="detail-row">
          <span>Nombre y apellido:</span>
          <span>{{ perfil.nombre }} {{ perfil.apellido }}</span>
        </div>
        <div class="detail-row">
          <span>Alias:</span>
          <span>{{ perfil.alias }}</span>
          <span class="material-symbols-rounded icon" @click="copyToClipboard(perfil.alias)">content_copy</span>
        </div>
        <div class="detail-row">
          <span>CVU:</span>
          <span>{{ perfil.cvu }}</span>
          <span class="material-symbols-rounded icon" @click="copyToClipboard(perfil.cvu)">content_copy</span>
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
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Error al copiar:', err)
  }
}
</script>

<style scoped>
.profile-container {
  background-color: var(--dark-blue);
  border-radius: var(--general-radius);
  color: var(--white-text);
  width: 100%;
  margin: 0 auto;             
  overflow: hidden;
  box-sizing: border-box;     
}

.profile-header {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem;
}

.icon {
  color: var(--white-text);
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
}

.icon:hover {
  color: var(--blue-button-hover);
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
  gap: 2rem;                  /* Nuevo: espacio reducido */
  width: 100%;
  box-sizing: border-box;
}

.profile-image {
  background: #073259;
  padding: 2rem;
  border-radius: var(--general-radius);
  text-align: center;
  width: 400px;
  max-width: 100%;            /* Nuevo: asegurar responsividad */
  min-width: 300px;
  flex-shrink: 0; 
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

.profile-image h3 {
  color: var(--light-grey);
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
  flex-wrap: wrap;         
  font-size: var(--font-subtitle);
  width: 100%;
}

@media (max-width: 1200px) {
  .profile-content {
    flex-direction: column;
    align-items: center;
    gap: 1rem;           
    padding: 1rem;         
  }
  .profile-image {
    width: 100%;
    max-width: 300px;      
    padding: 1rem;         
  }
  .profile-image h2 {
    font-size: 1.5rem;     
  }
  .profile-image h3 {
    font-size: 0.875rem;
  }
}
</style>
