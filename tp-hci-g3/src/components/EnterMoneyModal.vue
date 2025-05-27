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
            />
          </div>
  
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
  const montoTotal = ref(0);
  
  onMounted(() => {
    const accountStore = useAccountStore()
    const guardado = accountStore.balance;
    if (guardado) {
      accountStore.balance = Number(guardado);
    }
  });
  
  function abrirModal() {
    emit('update:modelValue', true);
  }
  
  function cerrarModalIngreso() {
    emit('update:modelValue', false);
    monto.value = 0;
  }
  
  async function confirmarIngreso() {
    if (monto.value > 0) {
      await store.agregarTransaccion(monto.value, 'ingreso');
      activityStore.loadActivities();
      cerrarModalIngreso();
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
  </style>
  