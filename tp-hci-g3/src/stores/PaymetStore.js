import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePaymentStore = defineStore('payment', () => {
  const items = ref([]) 
  const balance = ref(0) 

  const agregarTransaccion = (monto, tipo) => {
    const transaccion = {
      id: crypto.randomUUID(),
      tipo, 
      monto,
      fecha: new Date().toISOString()
    }
    items.value.push(transaccion)

    if (tipo === 'ingreso') balance.value += monto
    if (tipo === 'transferencia') balance.value -= monto
  }

  const getBalance = computed(() => balance.value)
  const getTransacciones = computed(() => items.value)

  return {
    balance,
    items,
    agregarTransaccion,
    getBalance,
    getTransacciones
  }
})
