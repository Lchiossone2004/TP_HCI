<template>
  <div class="layout">
    <Sidebar />

    <div class="main-content">
      <template v-if="selectedContact">
        <div class="detail-and-contacts">
          <!-- Columna de detalle -->
          <div class="detail-col">
            <TransferDetail
              :contact="selectedContact"
              :availableBalance="balance"
              @back="selectedContact = null"
              @transfer="onTransfer"
            />
          </div>
          <!-- Columna de contactos -->
          <div class="contacts-col">
            <Suggestions
              :suggested="contactosSugeridos"
              :recent="contactosRecientes"
              @select="selectedContact = $event"
            />
            <RecentTransfers
              :transfers="transferenciasRecientes"
              @select="selectedContact = $event"
            />
          </div>
        </div>
      </template>

      <div v-else class="transfer-list-view">
        <div class="left">
          <TransferSearch @search="handleSearch" />
          <div class="panel dark-panel">
            <p class="panel-title">Balance</p>
            <BalanceCard />
          </div>
        </div>
        <div class="right">
          <Suggestions
            :suggested="contactosSugeridos"
            :recent="contactosRecientes"
            @select="selectedContact = $event"
          />
          <RecentTransfers
            :transfers="transferenciasRecientes"
            @select="selectedContact = $event"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import TransferSearch from '@/components/transfer/TransferSearch.vue'
import BalanceCard from '@/components/BalanceCard.vue'
import Suggestions from '@/components/transfer/Suggestions.vue'
import RecentTransfers from '@/components/transfer/RecentTransfers.vue'
import TransferDetail from '@/components/transfer/TransferDetail.vue'

function getAvatar(n) {
  return new URL(`../assets/images/avatars/Avatar${n}.jpg`, import.meta.url).href
}

const contactosSugeridos = [
  { id: 1, name: 'Pablo Gomez', alias: '@pablog', avatar: getAvatar(1) },
  { id: 2, name: 'Mónica Domínguez', alias: '@monica', avatar: getAvatar(2) },
  { id: 3, name: 'Josefina Grimolti', alias: '@josefina', avatar: getAvatar(4) },
]

const contactosRecientes = [
  { id: 4, name: 'Juan Perez', alias: '@juanp', avatar: getAvatar(4) },
  { id: 5, name: 'Micaela Trevi', alias: '@micaela', avatar: getAvatar(1) },
  { id: 6, name: 'Guillermo Rivas', alias: '@guillermo', avatar: getAvatar(4) },
  { id: 7, name: 'Flor Margalo', alias: '@flor', avatar: getAvatar(1) },
]

const transferenciasRecientes = [
  { id: 1, name: 'Pablo Gomez', alias: '@pablog', avatar: getAvatar(1), amount: '$1200' },
  { id: 2, name: 'Mónica Domínguez', alias: '@monica', avatar: getAvatar(2), amount: '$850' },
  { id: 3, name: 'Josefina Grimolti', alias: '@josefina', avatar: getAvatar(4), amount: '$430' },
]

const balance = ref(205768.79)
const selectedContact = ref(null)

function handleSearch(p) { console.log('search', p) }
function onTransfer({ to, amount }) {
  balance.value -= amount
  selectedContact.value = null
}
</script>

<style scoped>
.main-content { display: flex; flex-direction: column; gap: 2rem; padding: 2rem; background: #f5f5f7; min-height: 100vh; margin-left: 20vw; }
.transfer-list-view { display: flex; gap: 2rem; flex: 1; }
.left { flex: 1; display: flex; flex-direction: column; gap: 2rem; }
.right { flex: 1; display: flex; flex-direction: column; gap: 2rem; }

/* detalle + contactos ocupa todo el ancho */
.detail-and-contacts { display: flex; gap: 2rem; width: 100%; }
.detail-col { flex: 2; }   /* más espacio para detalle */
.contacts-col { flex: 1; display: flex; flex-direction: column; gap: 2rem; }

/* panel medio */
.dark-panel { background: #03192C; border-radius: 16px; padding: 1.5rem; color: #fff; }
.panel-title { font-size: 1.25rem; margin-bottom: 1rem; }
</style>
