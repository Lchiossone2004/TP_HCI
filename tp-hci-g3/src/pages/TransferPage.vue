<template>
  <div class="layout">
    <main class="main-content">
      <div class="header">
        <h1>Transferencias</h1>
      </div>
        <template v-if="selectedContact">
          <div class="transfer-detail-view">
            <div class="detail-section">
              <TransferDetail
                :contact="selectedContact"
                :availableBalance="balance"
                @back="selectedContact = null"
                @transfer="onTransfer"
              />
            </div>
            <div class="side-section">
              <div class="panel">
                <h2>Contactos Favoritos</h2>
                <div v-if="!favoritedContacts.length" class="empty-state">
                  No hay contactos favoritos
                </div>
                <ContactList
                  v-else
                  :contacts="favoritedContacts"
                  :favoriteIds="favoriteIds"
                  @select="handleContactSelect"
                  @toggleFavorite="toggleFavorite"
                  showFavoriteButton
                />
              </div>
            </div>
          </div>
          </template>
      <template v-else>
        <!-- Vista principal de transferencias -->
        <div class="transfer-main-view">
          <div class="left-section">
           <div class="search-section panel">
            <TransferSearch @search="handleSearch" />
          </div>
            
            <div class="recent-transfers-section">
              <div class="panel">
                <h2>Transferencias Recientes</h2>
                <div v-if="!filteredRecentTransfers.length" class="empty-state">
                  No hay transferencias recientes
                </div>
                  <RecentTransfers
                    :transfers="filteredRecentTransfers"
                    :favoriteIds="favoriteIds"
                    @select="handleContactSelect"
                    @toggleFavorite="toggleFavorite"
                  />
              </div>
            </div>
          </div>

          <div class="right-section">
            <div class="panel">
              <h2>Contactos Favoritos</h2>
              <div v-if="!favoritedContacts.length" class="empty-state">
                No hay contactos favoritos
              </div>
                <ContactList
                  v-if="favoritedContacts.length"
                  :contacts="favoritedContacts"
                  :favoriteIds="favoriteIds"
                  @select="handleContactSelect"
                  @toggleFavorite="toggleFavorite"
                  showFavoriteButton
                />
            </div>
          </div>
        </div>
      </template>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ContactList from '@/components/transfer/ContactList.vue'
import RecentTransfers from '@/components/transfer/RecentTransfers.vue'
import TransferDetail from '@/components/transfer/TransferDetail.vue'


function getAvatar(n) {
  return new URL(`../assets/images/avatars/Avatar${n}.jpg`, import.meta.url).href
}

const transferenciasRecientes = ref([
  { id: 1, name: 'Pablo Gomez', alias: '@pablog', avatar: getAvatar(1), amount: '$1200' },
  { id: 2, name: 'Mónica Domínguez', alias: '@monica', avatar: getAvatar(5), amount: '$850' },
  { id: 3, name: 'Josefina Grimolti', alias: '@josefina', avatar: getAvatar(4), amount: '$430' },
  { id: 4, name: 'Juan Perez', alias: '@juanp', avatar: getAvatar(2), amount: '$2500' },
  { id: 5, name: 'Micaela Trevi', alias: '@micaela', avatar: getAvatar(1), amount: '$1800' },
  { id: 6, name: 'Guillermo Rivas', alias: '@guillermo', avatar: getAvatar(2), amount: '$950' },
  { id: 7, name: 'Flor Margalo', alias: '@flor', avatar: getAvatar(4), amount: '$3200' },
  { id: 8, name: 'Lucas Martinez', alias: '@lucas', avatar: getAvatar(1), amount: '$1500' }
].slice(0, 15))

const searchQuery = ref('')
const selectedContact = ref(null)
const favoriteIds = ref(new Set()) // Guardar IDs de favoritos
const balance = ref(205768.63)

// Contactos con información adicional
const allContacts = [
  { 
    id: 1, 
    name: 'Pablo Gomez', 
    alias: '@pablog', 
    avatar: getAvatar(1),
    cvu: '0000003100064484890002',
    phone: '+5491145678901'
  },
  { 
    id: 2, 
    name: 'Mónica Domínguez', 
    alias: '@monica', 
    avatar: getAvatar(5),
    cvu: '0000003100064484890003',
    phone: '+5491145678902'
  },
  { 
    id: 3, 
    name: 'Josefina Grimolti', 
    alias: '@josefina', 
    avatar: getAvatar(4),
    cvu: '0000003100064484890004',
    phone: '+5491145678903'
  },
  { 
    id: 4, 
    name: 'Juan Perez', 
    alias: '@juanp', 
    avatar: getAvatar(2),
    cvu: '0000003100064484890005',
    phone: '+5491145678904'
  },
  { 
    id: 5, 
    name: 'Micaela Trevi', 
    alias: '@micaela', 
    avatar: getAvatar(1),
    cvu: '0000003100064484890006',
    phone: '+5491145678905'
  },
  { 
    id: 6, 
    name: 'Guillermo Rivas', 
    alias: '@guillermo', 
    avatar: getAvatar(2),
    cvu: '0000003100064484890007',
    phone: '+5491145678906'
  },
  { 
    id: 7, 
    name: 'Flor Margalo', 
    alias: '@flor', 
    avatar: getAvatar(4),
    cvu: '0000003100064484890008',
    phone: '+5491145678907'
  },
  { 
    id: 8, 
    name: 'Lucas Martinez', 
    alias: '@lucas', 
    avatar: getAvatar(1),
    cvu: '0000003100064484890009',
    phone: '+5491145678908'
  }
]

const favoritedContacts = computed(() => {
  return allContacts.filter(contact => favoriteIds.value.has(contact.id))
})

const filteredRecentTransfers = computed(() => {
  if (!searchQuery.value) return transferenciasRecientes.value

  const query = searchQuery.value.toLowerCase()
  return transferenciasRecientes.value.filter(transfer => {
    return transfer.name.toLowerCase().includes(query) ||
           transfer.alias.toLowerCase().includes(query)
  })
})


function toggleFavorite(contactId) {
  const newFavorites = new Set(favoriteIds.value)
  if (newFavorites.has(contactId)) {
    newFavorites.delete(contactId)
  } else {
    newFavorites.add(contactId)
  }
  favoriteIds.value = newFavorites
  localStorage.setItem('favoriteContacts', JSON.stringify([...newFavorites]))
}

// Cargar favoritos al montar
onMounted(() => {
  const saved = localStorage.getItem('favoriteContacts')
  if (saved) {
    favoriteIds.value = new Set(JSON.parse(saved))
  }
})

function getFullContact(contactId) {
  return allContacts.find(c => c.id === contactId)
}

// Actualizar el handler de selección
function handleContactSelect(contact) {
  // Siempre buscar la información completa del contacto
  const fullContact = getFullContact(contact.id)
  selectedContact.value = fullContact || contact
}

function handleSearch(event) {
  searchQuery.value = event.target.value
}

function onTransfer({ to, amount }) {
  // Actualizar transferencias recientes
  const newTransfer = {
    id: to.id,
    name: to.name,
    alias: to.alias,
    avatar: to.avatar,
    amount: `$${amount}`
  }
  
  transferenciasRecientes.value.unshift(newTransfer)
  if (transferenciasRecientes.value.length > 15) {
    transferenciasRecientes.value.pop()
  }
  
  selectedContact.value = null
}

</script>

<style scoped>

.main-content {
  margin-left: 21vw;
  padding: 1rem;
  min-height: 100vh;
  background-color: var(--background-grey);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.header {
  margin-bottom: 1rem;
}

.header h1 {
  font-size: var(--font-title);
  color: var(--black-text);
}

/* Panel común para todas las secciones */
.panel {
  background-color: var(--white-inputs);
  border-radius: var(--general-radius);
  padding: 1.5rem;
  height: fit-content;
}

.panel h2 {
  font-size: var(--font-subtitle);
  color: var(--black-text);
  margin-bottom: 1rem;
}

/* Vista principal de transferencias */
.transfer-main-view {
  display: flex;
  gap: 1rem;
  height: 100%;
}

.left-section {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.right-section {
  flex: 1;
  min-width: 300px;
}

.search-section {
  margin-bottom: 1rem;
}

/* Vista de detalle de transferencia */
.transfer-detail-view {
  display: flex;
  gap: 1rem;
  height: 100%;
}

.detail-section {
  flex: 2;
  background-color: var(--white-inputs);
  border-radius: var(--general-radius);
  padding: 1.5rem;
}

.side-section {
  flex: 1;
  min-width: 300px;
}

.search-container {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid var(--light-grey);
  border-radius: var(--icon-radius);
  font-size: var(--font-text);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--dark-grey-text);
}

.empty-state {
  text-align: center;
  color: var(--dark-grey-text);
  padding: 2rem;
  font-size: var(--font-text);
}

@media (max-width: 1200px) {
  .transfer-main-view,
  .transfer-detail-view {
    flex-direction: column;
  }

  .right-section,
  .side-section {
    min-width: 100%;
  }

  .panel {
    width: 100%;
    max-width: 750px;
    margin: 0 auto;
  }
}

</style>
