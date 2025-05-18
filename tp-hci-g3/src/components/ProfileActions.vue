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

    <!-- Modal para Administrar dinero -->
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

    <!-- Modal para Mis datos -->
    <Modal v-model="showMyInfoModal" title="Mis datos">
      <div class="enter-money-form">
        <div class="form-group">
          <label for="cvu">CVU</label>
          <div class="info-row">
            <div class="info-value-container">
              <span class="info-value">{{ accountInfo.cvu }}</span>
              <span class="material-symbols-rounded copy-icon" @click="copyToClipboard(accountInfo.cvu)" title="Copiar CVU">content_copy</span>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="alias">Alias</label>
          <div class="info-row">
            <div class="info-value-container">
              <span class="info-value">{{ accountInfo.alias }}</span>
              <span class="material-symbols-rounded copy-icon" @click="copyToClipboard(accountInfo.alias)" title="Copiar Alias">content_copy</span>
            </div>
          </div>
        </div>
        <button class="submit-button" @click="showMyInfoModal = false">Cerrar</button>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Modal from './Modal.vue'

const router = useRouter()
const emit = defineEmits(['edit'])
const showMoneyModal = ref(false)
const showMyInfoModal = ref(false)

const accountInfo = ref({
  cvu: '0000003100064484890001',
  alias: 'mateo.gorriti'
})

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
  showMyInfoModal.value = true
}

const handleTransfer = () => {
  router.push({ name: 'Transfer' })
}

const handleCollect = () => {
  // Implementar lógica de cobro
  showMoneyModal.value = false
}

const handlePay = () => {
  // Implementar lógica de pago
  showMoneyModal.value = false
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    // Aquí podrías añadir una notificación de éxito si lo deseas
  } catch (err) {
    console.error('Error al copiar:', err)
  }
}
</script>

<style scoped>
.actions-container {
  background: var(--white-inputs);
  border-radius: var(--general-radius);
  padding: 1rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
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

.enter-money-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-value-container {
  position: relative;
  flex: 1;
}

.info-value {
  display: block;
  width: 100%;
  padding: 0.75rem;
  background-color: var(--background-grey);
  border-radius: var(--icon-radius);
  padding-right: 2.5rem;
}

.copy-icon {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--dark-blue);
}

.submit-button {
  background: var(--dark-blue);
  color: var(--white-text);
  border: none;
  padding: 0.75rem;
  border-radius: var(--button-radius);
  cursor: pointer;
  margin-top: 1rem;
}

.submit-button:hover {
  background: var(--blue-button-hover);
}

@media (max-width: 768px) {
  .actions-container {
    padding: 1rem;
  }

  .action-button {
    padding: 1rem;
  }
}
</style>
  