
<template>
    <div class="layout">
       <Sidebar />
       <main class="main-content">
        <div class = "card-row">
         <Card bgColor="#03192c" width="350px" height="300px">
           <div class="grid-container">
             <div class="grid-item">
           <button> 
             <span class="material-symbols-outlined icon">add</span>
           </button>
           <h4> Ingresar </h4>
         </div>
         <div class="grid-item">
           <button> 
             <span class="material-symbols-outlined icon">sync_alt</span>
           </button>
           <h4> Transferir </h4>
         </div>
         <div class="grid-item">
           <button> 
             <span class="material-symbols-outlined icon">id_card</span>
           </button>
           <h4> Mis datos </h4>
         </div>
         <div class="grid-item">
           <button> 
             <span class="material-symbols-outlined icon">more_horiz</span>
           </button>
           <h4> Más </h4>
         </div>
           </div>
         </Card>
         <Card bgColor="#03192c" width="750px" height="300px"> 
          <Swiper> 
            <div>Contenido 1</div>
            <div>Contenido 2</div>
            <div>Contenido 3</div>
          </Swiper>
        <span class="material-symbols-outlined top-right-icon left-offset">notifications</span>
        <span class="material-symbols-outlined top-right-icon">help</span>
       </Card>
       </div>
       </main>
     </div>
   </template>
   
   <script setup>
  import Sidebar from '@/components/Sidebar.vue'
  import Card from '@/components/Card.vue'
  import Swiper from '@/components/Swiper.vue'
   </script>
   
   <style>
   .app {
     display: flex;
   }
   .grid-container {
     width: 100%;
     height: 100%;
     display: grid;
     grid-template-columns: 1fr 1fr;
     align-items: center;
     justify-items: center;
     gap: 1rem;
     text-align: center;
     color: white;
   }
   .card-row {
  display: flex;
  gap: 2rem; /* espacio entre las cards */
  margin-left: 2rem;
}
   
   .grid-item button {
     width: 60px;
     height: 60px;
     border-radius: 50%;
     background-color: #093256; 
     border: none;
     display: flex;
     align-items: center;
     justify-content: center;
     cursor: pointer;
     transition: background-color 0.2s;
   }
   
   .grid-item button:hover {
     background-color: #0a4b85; 
   }
   
   .grid-item .material-symbols-outlined {
     color: white;
     font-size: 28px;
   }
   
   .grid-item h4 {
     margin: 0.3rem 0 0;
     font-size: 14px;
   }
   
   .main-content {
     margin-left: 220px;
     padding: 2rem;
     min-height: 100vh;
     background-color: #cccccc;
   }
   .sidebar {
     position: fixed;
     top: 0;
     left: 0;
     width: 250px;
     height: 100vh;
     background-color: #03192C;
     color: white;
     padding: 1.5rem;
     box-sizing: border-box;
   }
   .top-right-icon {
    position: fixed;
    top: 40px;
    right: 40px;
    font-size: 24px; /* ajustalo si querés */
    cursor: pointer;
    z-index: 1000; /* para que no lo tape nada */
  }
  .top-right-icon.left-offset {
    right: 70px;
  }
   
   
   </style>