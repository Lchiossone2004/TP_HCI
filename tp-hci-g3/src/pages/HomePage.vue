import Sidebar from 'src/components/Sidebar.vue'
import Card from 'src/components/Card.vue'
<template>
    <div class="layout">
       <Sidebar />
       <main class="main-content">
         <Card bgColor="#03192c" width="300px" height="250px">
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
       </main>
     </div>
   </template>
   
   <script setup>
   
   
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
     width: 220px;
     height: 100vh;
     background-color: #03192C;
     color: white;
     padding: 1.5rem;
     box-sizing: border-box;
   }
   
   
   </style>