<template>
  <div class="profile-container">
    <div class="top-bar">
      <button class="edit-btn">Editar perfil</button>
   
    </div>

    <div class="profile-box">
      <div class="left">
        <img class="avatar" :src="perfil.avatar" alt="Foto de perfil" />
        <p class="name">{{ perfil.nombre }}</p>
        <a :href="`mailto:${perfil.email}`" class="email">{{ perfil.email }}</a>
      </div>

      <div class="right">
        <p><strong>DNI:</strong> {{ perfil.dni }}</p>
        <p><strong>Nombre:</strong> {{ perfil.nombre }}</p>
        <p><strong>Apellido:</strong> {{ perfil.apellido }}</p>
        <p><strong>Número:</strong> {{ perfil.telefono }}</p>
      </div>
    </div>
  </div>
</template>

  <script setup>
defineProps({
  perfil: {
    type: Object,
    required: true,
  }
})
  </script>
  
  <style scoped>
.profile-container {
  background-color: #03192C;
  border-radius: 30px;
  padding: 1.5rem;
  color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 25rem;
  padding-top: 0.5rem;
  /* transition: transform 0.2s ease, box-shadow 0.2s ease; */
}

/* .profile-container:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
} */

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0rem;
}

.edit-btn {
  background-color: transparent;
  color: white;
  border: 2px solid white;
  border-radius: 999px; 
  padding: 0.4rem 1rem;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  margin-left: auto; 
}


.edit-btn:hover {
  background-color: white;
  color: #001f3f;
}

.profile-box {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
  margin-left: 3rem;
}

.left {
  background-color: #073259;
  padding: 2rem;
  border-radius: 30px;
  text-align: center;
  min-width: 200px;
  flex-shrink: 0;
}

.avatar {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 1rem;
  margin-left: 5rem;
  margin-right: 5rem;
  margin-top: 2rem;
}
.name{
    font-size: 2rem; 
}
.email {
  color: #9ecbff;
  text-decoration: none;
  font-size: 1.2rem;
}

.right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  gap: 3rem;
  font-size: 1.8rem; /* Aumenta el tamaño del texto */
  font-weight: 500;
 
}
</style>