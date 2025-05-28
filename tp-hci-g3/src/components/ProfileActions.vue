<template>
  <div class="actions-container">
    <button 
      v-for="action in actions" 
      :key="action.label" 
      class="action-button"
      @click="handleClick(action)"
    >
      <span class="material-symbols-rounded icon">{{ action.icon }}</span>
      <span class="label">{{ action.label }}</span>
      <span class="material-symbols-rounded arrow">chevron_right</span>
    </button>

    <Modal v-model="showMoneyModal" title="Administrar dinero">
      <div class="money-actions">
        <button class="money-action-btn" @click="handleEnterMoney">
          <span class="material-symbols-rounded">add</span>
          <span>Ingresar dinero</span>
        </button>
        <button class="money-action-btn" @click="handleTransfer">
          <span class="material-symbols-rounded">sync_alt</span>
          <span>Transferir</span>
        </button>
        <button class="money-action-btn" @click="handleCollect">
          <span class="material-symbols-rounded">point_of_sale</span>
          <span>Cobrar servicios</span>
        </button>
        <button class="money-action-btn" @click="handlePay">
          <span class="material-symbols-rounded">payments</span>
          <span>Pagar servicios</span>
        </button>
      </div>
    </Modal>

    <EnterMoneyModal v-model="mostrarModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Modal from './Modal.vue'
import EnterMoneyModal from './EnterMoneyModal.vue'

const router = useRouter()
const emit = defineEmits(['edit'])

const showMoneyModal = ref(false)
const mostrarModal = ref(false)

const actions = [
  { label: 'Datos de mi cuenta', icon: 'person', action: 'edit' },
  { label: 'Tarjetas', icon: 'credit_card', action: 'cards' },
  { label: 'Actividad', icon: 'description', action: 'movements' },
  { label: 'Administrar dinero', icon: 'sync_alt', action: 'money' }
]

const handleClick = (action) => {
  if (action.action === 'edit') {
    emit('edit')
  } else if (action.action === 'movements') {
    router.push({ name: 'Actividad' })
  } else if (action.action === 'cards') {
    router.push({ name: 'Tarjetas' })
  } else if (action.action === 'money') {
    showMoneyModal.value = true
  }
}

const handleEnterMoney = () => {
  showMoneyModal.value = false
  mostrarModal.value = true
}

const handleTransfer = () => {
  showMoneyModal.value = false 
  router.push('/transfer').catch(err => {
    console.error('Error de navegación:', err)
  })
}

const handleCollect = () => {
  router.push({ name: 'Servicios', query: { tab: 'collect' } }).catch(console.error)
  showMoneyModal.value = false
}

const handlePay = () => {
  router.push({ name: 'Servicios', query: { tab: 'pay' } }).catch(console.error)
  showMoneyModal.value = false
}
</script>

<style scoped>
.actions-container {
  background: var(--white-inputs);
  border-radius: var(--general-radius);
  padding: 1rem;
  width: 100%;
  margin: 0 auto;           /* Nuevo: centrar */
  box-sizing: border-box;   /* Nuevo */
  margin-bottom: 1rem;      /* Nuevo: separación vertical */
}

.action-button {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem;
  margin: 0.5rem 0;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: var(--button-radius);
  font-size: var(--font-text);
  color: var(--black-text);
  transition: background-color 0.2s ease;
}

.action-button:hover {
  background-color: var(--button-grey-hover);
}

.icon {
  margin-right: 1rem;
  color: var(--dark-blue);
}

.label {
  flex: 1;
  text-align: left;
}

.arrow {
  color: var(--dark-grey-text);
}

.money-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.money-action-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--background-grey);
  border: none;
  border-radius: var(--button-radius);
  font-size: var(--font-text);
  color: var(--black-text);
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
}

.money-action-btn:hover {
  background-color: var(--button-grey-hover);
}

.money-action-btn .material-symbols-rounded {
  color: var(--dark-blue);
}
</style>
