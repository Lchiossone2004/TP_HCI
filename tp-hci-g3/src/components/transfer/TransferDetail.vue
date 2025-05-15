<template>
    <div class="detail-panel dark-panel">
      <button class="back-btn" @click="$emit('back')">← Volver</button>
  
      <div class="contact-header">
        <img :src="contact.avatar" class="detail-avatar" />
        <div>
          <h2 class="detail-name">{{ contact.name }}</h2>
          <p class="detail-alias">{{ contact.alias }}</p>
        </div>
      </div>
  
      <div class="balance-info">
        <span>Saldo disponible:</span>
        <strong>{{ formatCurrency(availableBalance) }}</strong>
      </div>
  
      <!-- fila: monto input a la izquierda, botón a la derecha -->
      <div class="transfer-row">
        <div class="amount-input">
          <label for="amount">Monto a transferir</label>
          <input
            id="amount"
            v-model.number="amount"
            type="number"
            min="0"
            :max="availableBalance"
            placeholder="0.00"
          />
        </div>
        <button class="transfer-btn" :disabled="!canTransfer" @click="openConfirm">
          Transferir
        </button>
      </div>
  
      <div class="remaining-info" v-if="amount > 0">
        <span>Quedará:</span>
        <strong>{{ formatCurrency(remaining) }}</strong>
      </div>
  
      <!-- modal gris -->
      <div v-if="showConfirm" class="modal-overlay">
        <div class="modal-card">
          <p>Confirmar transferencia de <strong>{{ formatCurrency(amount) }}</strong> a <strong>{{ contact.name }}</strong>?</p>
          <div class="modal-actions">
            <button class="btn-cancel" @click="showConfirm = false">Cancelar</button>
            <button class="btn-confirm" @click="confirmTransfer">Sí, transferir</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  const props = defineProps({
    contact: Object,
    availableBalance: Number
  })
  const emit = defineEmits(['back','transfer'])
  
  const amount = ref(0)
  const showConfirm = ref(false)
  
  const remaining = computed(() =>
    amount.value > 0 ? props.availableBalance - amount.value : props.availableBalance
  )
  const canTransfer = computed(() =>
    amount.value > 0 && amount.value <= props.availableBalance
  )
  
  function formatCurrency(v) {
    return new Intl.NumberFormat('es-AR',{ style:'currency',currency:'ARS' }).format(v)
  }
  function openConfirm() {
    if (canTransfer.value) showConfirm.value = true
  }
  function confirmTransfer() {
    emit('transfer', { to: props.contact, amount: amount.value })
    showConfirm.value = false
    amount.value = 0
  }
  </script>
  
  <style scoped>
  .detail-panel { display: flex; flex-direction: column; gap:1rem; padding:2rem; border-radius:16px; color:#fff; background:#03192C; }
  .contact-header { display:flex; gap:1rem; align-items:center; }
  .detail-avatar { width:60px;height:60px;border-radius:50%;object-fit:cover; }
  .balance-info { display:flex; justify-content:space-between; }
  
  /* fila de transferencia */
  .transfer-row { display:flex; align-items:flex-end; gap:1rem; }
  .amount-input { flex:1; display:flex; flex-direction:column; }
  .amount-input input::-webkit-inner-spin-button, .amount-input input::-webkit-outer-spin-button { -webkit-appearance: none; margin:0; }
  .amount-input input {
    appearance: none;
    background:#1f2937;
    border:none;
    border-radius:8px;
    padding:0.75rem 1rem;
    color:#fff;
  }
  .amount-input input::placeholder { color:#aaa; }
  .transfer-btn {
    background:#2e7dff;
    border:none;
    border-radius:8px;
    padding:0.75rem 1.5rem;
    color:#fff;
    cursor:pointer;
    transition:background .2s;
  }
  .transfer-btn:disabled { background:#555; cursor:not-allowed; }
  .transfer-btn:hover:enabled { background:#1b5edb; }
  
  /* modal gris */
  .modal-overlay {
    position: fixed; top:0; left:0; right:0; bottom:0;
    background: rgba(0,0,0,0.2);
    display:flex; justify-content:center; align-items:center;
  }
  .modal-card {
    background: #f1f1f1;
    border-radius:12px;
    padding:1.5rem;
    width: 320px;
    text-align:center;
    color: #03192C;
  }
  .modal-actions { display:flex; justify-content:space-between; margin-top:1rem; }
  .btn-cancel, .btn-confirm {
    padding:0.5rem 1rem;
    border-radius:8px;
    border:none;
    cursor:pointer;
    font-size:1rem;
  }
  .btn-cancel { background:#ccc; }
  .btn-confirm { background:#2e7dff; color:#fff; }
  .btn-confirm:hover { background:#1b5edb; }
  </style>
  