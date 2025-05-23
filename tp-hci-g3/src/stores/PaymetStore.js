import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePaymetStore = defineStore('payment', () => {
  const transacciones = ref([])

  // Recuperar montoTotal desde localStorage o inicializar en 0
  const montoTotal = ref(Number(localStorage.getItem('montoTotal')) || 0)

  function agregarTransaccion(monto, tipo) {
    transacciones.value.push({ monto, tipo, fecha: new Date().toISOString() })

    if (tipo === 'ingreso') {
      montoTotal.value += monto
    } else if (tipo === 'egreso') {
      montoTotal.value -= monto
    }

    // Guardar en localStorage
    localStorage.setItem('montoTotal', montoTotal.value)
  }

  const getBalance = computed(() => montoTotal.value)

  return {
    transacciones,
    agregarTransaccion,
    getBalance,
  }
})
