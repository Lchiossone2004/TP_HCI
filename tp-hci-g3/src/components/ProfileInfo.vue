<template>
    <div class="profile-container">
      <div class="top-bar">
        <button class="back-btn"><  Volver</button>
        <div>
        <button class="edit-btn">Editar perfil</button>
        <button class="help-btn">?</button>
        </div>
      </div>
  
      <div class="profile-box">
        <div class="left">
          <img class="avatar" src="/src//assets/images/FotoPerfil.jpeg" alt="Foto de perfil" />
          <p class="name">Mateo</p>
          <a href="mailto:mateo.go@gmail.com" class="email">mateo.go@gmail.com</a>
        </div>
  
        <div class="right">
          <p><strong>DNI:</strong> 40.527.004</p>
          <p><strong>Nombre:</strong> Mateo Tomás</p>
          <p><strong>Apellido:</strong> Gorriti</p>
          <p><strong>Número:</strong> +54 11 7385-4992</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Este componente aún no requiere lógica
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
  margin-bottom: 1rem;
}

.back-btn{
  background: none;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
  font-size: 1.3rem;
}
.back-btn:hover{
  text-decoration: underline;
}
.edit-btn{
  background-color: transparent;
  color: white;
  border: 2px solid white;
  border-radius: 999px; 
  padding: 0.4rem 1rem;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.edit-btn:hover {
  background-color: white;
  color: #001f3f;
}

.help-btn{
  background-color: transparent;
  color: white;
  border: 2px solid white;
  border-radius: 999px; 
  padding: 0.4rem 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  margin-left: 1rem;
}

.help-btn:hover{
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
  margin-left: 8rem;
}
</style>