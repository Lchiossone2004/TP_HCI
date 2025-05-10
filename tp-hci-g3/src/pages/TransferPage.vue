<template>
  <div class="main-layout">
    <Sidebar />
    <div class="main-content">
      <div class="left">
        <div>
          <TransferSearch @search="handleSearch" />
        </div>
        <div>
          <RecentTransfers :transfers="transferenciasRecientes" @select="handleTransferSelect"/>
        </div>
      </div>
      <div class="right">
        <Suggestions
          :suggested="contactosSugeridos"
          :recent="contactosRecientes"
          @select="manejarSeleccion"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
import Suggestions from '@/components/transfer/Suggestions.vue'
import TransferSearch from '@/components/transfer/TransferSearch.vue'
import RecentTransfers from '@/components/transfer/RecentTransfers.vue'

import avatarJuan from '@/assets/images/avatars/Avatar1.jpg'
import avatarAna from '@/assets/images/avatars/Avatar2.jpg'
import avatarCarlos from '@/assets/images/avatars/Avatar3.jpeg'
import avatarLaura from '@/assets/images/avatars/Avatar4.jpg'
import avatarPedro from '@/assets/images/avatars/Avatar5.jpeg'
import avatarBenja from '@/assets/images/avatars/Avatar6.jpeg'
import avatarHilario from '@/assets/images/avatars/Avatar7.jpeg'

const contactosSugeridos = [
  { id: 1, name: 'Juan Pérez', alias: '@juanp', avatar: avatarJuan },
  { id: 2, name: 'Ana Torres', alias: '@ana_t', avatar: avatarAna },
  { id: 3, name: 'Carlos Ruiz', alias: '@cruiz', avatar: avatarCarlos },
]

const contactosRecientes = [
  { id: 4, name: 'Laura Méndez', alias: '@lau_m', avatar: avatarLaura },
  { id: 5, name: 'Pedro González', alias: '@pedrog', avatar: avatarPedro },
]

const transferenciasRecientes = [
  { id: 1, name: 'Juan Pérez', alias: '@juanp', avatar: avatarJuan, amount: '$100' },
  { id: 2, name: 'Ana Torres', alias: '@ana_t', avatar: avatarAna, amount: '$200' },
  { id: 3, name: 'Carlos Ruiz', alias: '@cruiz', avatar: avatarCarlos, amount: '$150' },
  { id: 4, name: 'Benja Such', alias: '@ana_t', avatar: avatarBenja, amount: '$2000' },
  { id: 5, name: 'Hilario Lagos', alias: '@cruiz', avatar: avatarHilario, amount: '$1530' },
]

function manejarSeleccion(contacto) {
  console.log('Contacto seleccionado:', contacto)
}

function handleSearch(valor) {
  console.log('Buscar por:', valor)
}
function handleTransferSelect(transferencia) {
  console.log('Transferencia seleccionada:', transferencia)
  // Aquí puedes redirigir, abrir un modal, etc.
}
</script>
  
  <style scoped>

.main-content {
  display: flex;
  flex-direction: row; /* Asegura distribución horizontal */
  justify-content: space-between; /* Opcional: agrega separación */
  gap: 2rem; /* Espacio entre opciones y sugerencias */
  margin-left: 21vw;
  padding: 2rem;
  background-color: #f1f1f1;
  min-height: 100vh;
}

.left {
  flex: 1;
  max-width: 40%; /* Por ejemplo */
}

.right {
  flex: 1;
  max-width: 60%; /* Por ejemplo */
}
  </style>