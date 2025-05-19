<template>
  <div>
    <!-- Slot para personalizar el botón -->
    <div @click="showModal = true">
      <slot></slot>
    </div>

    <!-- Modal reutilizable -->
    <Modal v-model="showModal" title="Ingresar dinero" subtitle="Copiar tus datos para ingresar dinero desde otra cuenta.">
      <div class="enter-money-form">
        <div class="form-group">
          <label>CVU</label>
          <div class="info-row">
            <div class="info-value-container">
              <span class="info-value">{{ accountInfo.cvu }}</span>
              <span 
                class="material-symbols-rounded copy-icon" 
                @click="copyToClipboard(accountInfo.cvu)"
                title="Copiar CVU"
              >
                content_copy
              </span>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>Alias</label>
          <div class="info-row">
            <div class="info-value-container">
              <span class="info-value">{{ accountInfo.alias }}</span>
              <span 
                class="material-symbols-rounded copy-icon" 
                @click="copyToClipboard(accountInfo.alias)"
                title="Copiar Alias"
              >
                content_copy
              </span>
            </div>
          </div>
        </div>
        <button class="submit-button" @click="showModal = false">Cerrar</button>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Modal from './Modal.vue'

const showModal = ref(false)
const accountInfo = ref({
  cvu: '0000003100064484890001',
  alias: 'mateo.gorriti'
})

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    // Podés mostrar un mensaje de confirmación si querés
    console.log('Texto copiado:', text);
  } catch (err) {
    console.error('Error al copiar al portapapeles:', err);
  }
};
</script>

<style scoped>
.enter-money-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
}

.info-row {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 0.5rem;
}

.info-value-container {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

.info-value {
  color: #666666;
  font-family: monospace;
  font-size: 0.9rem;
  background-color: #f5f5f5;
  padding: 0.5rem;
  border-radius: 4px;
  width: 100%;
  text-align: left;
  padding-right: 2.5rem;
}

.submit-button, .cancel-button {
  padding: 0.75rem 2rem;
  border-radius: var(--button-radius);
  border: none;
  font-size: var(--font-text);
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button {
  background: var(--dark-blue);
  color: var(--white-text);
}

.submit-button:hover {
  background: var(--blue-button-hover);
}

.cancel-button {
  background: var(--background-grey);
  color: var(--dark-blue);
}

.cancel-button:hover {
  background: var(--light-grey);
}

.copy-icon {
  color: #03192C;
  cursor: pointer;
  font-size: 1.2rem;
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.copy-icon:hover {
  background-color: #e0e0e0;
}
</style>