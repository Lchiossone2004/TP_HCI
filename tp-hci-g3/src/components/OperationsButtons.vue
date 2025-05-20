<template>
  <div class="card">
    <div class="grid-container">
      <div class="grid-item">
        <button class="operation-button" @click="openInfoModal">
          <span class="material-symbols-rounded icon">add</span>
        </button>
        <h4>Ingresar</h4>
      </div>
      <div class="grid-item">
        <button class="operation-button" @click="irATransferencias">
          <span class="material-symbols-rounded icon">sync_alt</span>
        </button>
        <h4>Transferir</h4>
      </div>
      <div class="grid-item">
        <button class="operation-button" @click="irAServicios('collect')">
          <span class="material-symbols-rounded icon">attach_money</span>
        </button>
        <h4>Cobrar servicios</h4>
      </div>
      <div class="grid-item">
        <button class="operation-button" @click="irAServicios('pay')">
          <span class="material-symbols-rounded icon">payment_arrow_down</span>
        </button>
        <h4>Pagar servicios</h4>
      </div>
    </div>
  </div>
  <Modal v-model="showMyInfoModal" title="Ingresar dinero" subtitle="Copiar tus datos para ingresar dinero desde otra cuenta.">
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
        <button class="submit-button" @click="closeModal">Cerrar</button>
      </div>
    </Modal>

</template>

<script setup>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import Modal from '@/components/Modal.vue';
  const router = useRouter();
  const showMyInfoModal = ref(false);
  function irATransferencias() {
  router.push({ name: 'Transfer' });
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    // Podés mostrar un mensaje de confirmación si querés
    console.log('Texto copiado:', text);
  } catch (err) {
    console.error('Error al copiar al portapapeles:', err);
  }
};

// Account information
const accountInfo = ref({
  cvu: '0000003100064484890001',
  alias: 'mateo.gorriti'
});
const openInfoModal = () => {
  showMyInfoModal.value = true;
};

const closeModal = () => {
  showMyInfoModal.value = false;
};

function irAServicios(tab) {
  router.push({ 
    name: 'Servicios',
    query: { tab } 
  });
}

</script>

<style scoped>
  .card {
    width: 360px;
    height: 300px;
    background-color:#03192c;
    border-radius: 20px;
    padding: 1rem;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .grid-container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-items: center;
    gap: 1rem;
    text-align: center;
    color: white;
    box-sizing: border-box;
  }

  .grid-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .operation-button {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #093256;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-bottom: 0.4rem;
  }

  .operation-button:hover {
    background-color: #0a4b85;
  }

  .icon {
    font-size: 35px;
    color: white;
  }

  .grid-item h4 {
    margin: 0;
    font-size: 17px;
  }
.enter-money-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
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
