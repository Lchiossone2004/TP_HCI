<template>
  <div class="detail-panel dark-panel">
    <button class="back-btn" @click="$emit('back')">
      <span class="material-symbols-rounded">arrow_back</span>
      Volver
    </button>

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

    <div class="transfer-row">
      <div class="amount-input">
        <label for="amount">Monto a transferir</label>
        <div class="input-wrapper">
          <span class="input-prefix">$</span>
          <input
            id="amount"
            v-model.number="amount"
            type="number"
            min="0"
            :max="availableBalance"
            placeholder="0.00"
            class="input-monto"
          />
        </div>
      </div>
      <button class="transfer-btn" :disabled="!canTransfer" @click="openConfirm">
        Transferir
      </button>
    </div>
    <div class="transfer-row">
      <div class="remaining-info" v-if="amount > 0">
        <span>Saldo luego de realizar la transferencia: </span>
        <strong>{{ formatCurrency(remaining) }}</strong>
      </div>
    </div>

    <!-- modal gris -->
    <div v-if="showConfirm" class="modal-overlay">
      <div class="modal-card">
        <p>Confirmar transferencia de <strong>{{ formatCurrency(amount) }}</strong> a <strong>{{ contact.name }}</strong>?</p>
        <div class="modal-actions">
          <button class="btn-cancel" @click="showConfirm = false">Cancelar</button>
          <button class="btn-confirm" @click="confirmTransfer">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePaymentStore } from '@/stores/PaymetStore'
import { useAccountStore } from '@/stores/AccountStore'

const props = defineProps({
  contact: Object
})

const store = usePaymentStore()
const accountStore = useAccountStore()
const emit = defineEmits(['back', 'transfer'])

const amount = ref(0)
const showConfirm = ref(false)

const remaining = computed(() =>
  amount.value > 0 ? accountStore.balance - amount.value : accountStore.balance
)
const canTransfer = computed(() =>
  amount.value > 0 && amount.value <= accountStore.balance
)

function formatCurrency(v) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(v)
}
function openConfirm() {
  if (canTransfer.value) showConfirm.value = true
}

const availableBalance = computed(() => accountStore.balance)

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

.input-wrapper {
  position: relative;
  width: 100%;
  display: block;
  margin-top: 1rem;
}
.input-monto {
  width: 100%; 
  padding-left: 10rem;
  font-size: 1rem;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
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

.transfer-row { display:flex; align-items:flex-end; gap:1rem; }
.amount-input { flex:1; display:flex; flex-direction:column; }
.amount-input input::-webkit-inner-spin-button, .amount-input input::-webkit-outer-spin-button { 
  -webkit-appearance: none; margin:0; 
}
.amount-input input {
  appearance: none;
  background:#1f2937;
  border:none;
  border-radius:8px;
  padding:0.75rem 2rem;
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
.back-btn {
  color: white;
  font-size: var(--font-text);
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
}

.back-btn .material-symbols-outlined {
  margin-right: 0.5rem;
  font-size: 0.5rem; 
  vertical-align: middle;
}
.back-btn:hover {
  color: var(--blue-button-hover);
}
</style>