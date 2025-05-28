<template>
  <div>
    <div @click="abrirModal">
      <slot></slot>
    </div>

    <Modal
      :modelValue="localModelValue"
      @update:modelValue="emit('update:modelValue', $event)"
      :title="'Ingresar dinero'"
      :subtitle="'Introducir la cantidad de dinero a ingresar a WingPay'"
    >
      <template #default>
        <div class="input-wrapper">
          <span class="input-prefix">$</span>
          <input
            v-model.number="monto"
            type="number"
            min="1"
            placeholder="Monto"
            class="input-monto"
            @input="clearMessages"
          />
        </div>

      
        <p v-if="mensajeExito" class="success-message">{{ mensajeExito }}</p>
        <p v-if="mensajeError" class="error-message">{{ mensajeError }}</p>

        <div class="modal-actions">
          <button class="submit-button" @click="confirmarIngreso">Confirmar</button>
          <button class="cancel-button" @click="cerrarModalIngreso">Cancelar</button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Modal from './Modal.vue'
import { usePaymentStore } from '@/stores/PaymetStore'
import { useAccountStore } from '@/stores/AccountStore'
import { useActivityStore } from '@/stores/ActivityStore'

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const localModelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const store = usePaymentStore();
const activityStore = useActivityStore();
const monto = ref(0);
const mensajeExito = ref('');
const mensajeError = ref('');

onMounted(() => {
  const accountStore = useAccountStore()
  const guardado = accountStore.balance;
  if (guardado) {
    accountStore.balance = Number(guardado);
  }
});

function abrirModal() {
  emit('update:modelValue', true);
  clearMessages();
}

function cerrarModalIngreso() {
  emit('update:modelValue', false);
  monto.value = 0;
  clearMessages();
}

function clearMessages() {
  mensajeExito.value = '';
  mensajeError.value = '';
}


  async function confirmarIngreso() {
  clearMessages();
  if (monto.value > 0) {
    try {
      await store.agregarTransaccion(monto.value, 'ingreso');
      
      const nuevaActividad = {
        id: Date.now(),
        title: 'Ingreso de dinero',
        subtitle: new Date().toLocaleDateString('es-AR', {
          day: '2-digit', month: '2-digit', year: 'numeric'
        }),
        date: new Date().toISOString(),
        amount: monto.value,
        formattedAmount: monto.value.toLocaleString('es-AR', {
          style: 'currency', currency: 'ARS', minimumFractionDigits: 2, maximumFractionDigits: 2
        }),
        icon: 'upload', 
        payerId: null,
        receiverId: null
      }
      activityStore.activities.unshift(nuevaActividad)
      

      mensajeExito.value = 'Ingreso realizado con éxito!'
      monto.value = 0
      setTimeout(() => {
        emit('update:modelValue', false)
        mensajeExito.value = ''
      }, 1000)
    } catch (error) {
      mensajeError.value = 'Error al procesar el ingreso.'
      console.error(error)
    }
  } else {
    mensajeError.value = 'Monto inválido.'
  }
}


</script>

<style scoped>
.input-wrapper {
  position: relative;
  width: 100%;
  display: block;
  margin-top: 1rem;
}

.input-prefix {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #666666;
  font-size: 1rem;
  pointer-events: none;
  user-select: none;
  line-height: 1;
}

.input-monto {
  width: 100%;
  padding: 0.5rem 0.5rem 0.5rem 1.5rem; 
  font-size: 1rem;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.5rem;
}

.submit-button,
.cancel-button {
  flex: 1;
  padding: 0.75rem;
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

.success-message {
  color: var(--green);
  margin-top: 0.5rem;
  font-weight: 600;
  text-align: center;
}

.error-message {
  color: var(--red-error-message);
  margin-top: 0.5rem;
  font-weight: 600;
  text-align: center;
}
</style>
