import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useActivityStore = defineStore('activity', () => {
  const activities   = ref([])
  const isLoading    = ref(false)
  const errorMessage = ref(null)

  /**
   * @param {{ page?: number, direction?: string, pending?: boolean|null,
   *           method?: string|null, range?: string|null,
   *           role?: 'PAYER'|'RECEIVER'|null, cardId?: number|null }} opts
   */
async function loadActivities({
  page      = 1,
  direction = 'DESC',
  pending   = null,
  method    = null,
  range     = null,
  role      = null,
  cardId    = null
} = {}) {
  isLoading.value = true
  errorMessage.value = null

  try {
    const token = localStorage.getItem('auth-token')
    if (!token) throw new Error('No hay token guardado.')

    const params = new URLSearchParams({ page, direction })
    if (pending  !== null) params.set('pending',  pending)
    if (method)          params.set('method',   method)
    if (range)           params.set('range',    range)
    if (role)            params.set('role',     role)
    if (cardId)          params.set('cardId',   cardId)

    const res = await fetch(
      `http://localhost:8080/api/payment?${params.toString()}`,
      { headers: { 'Authorization': 'Bearer ' + token } }
    )
    if (!res.ok) throw new Error(`Error ${res.status} cargando actividades`)

    const { results } = await res.json()

    activities.value = results.map(p => {
      const get = obj =>
        obj && typeof obj.get === 'function'
          ? obj.get.bind(obj)
          : key => obj[key]

      const g = get(p)

      let metadata = g('metadata')
      if (!Array.isArray(metadata)) metadata = []
      if (!metadata.find(item => item.date)) {
        metadata.push({ date: g('createdAt') || new Date().toISOString() })
      }

      const dateEntry = metadata.find(item => item.date)
      const rawDate = dateEntry ? dateEntry.date : null
      const validDate = rawDate && !isNaN(new Date(rawDate)) ? new Date(rawDate) : null

      const rawAmount = g('amount')
      const isPayerRole = role === 'PAYER'
      const signedAmount = isPayerRole ? -rawAmount : rawAmount

      return {
        id: g('id'),
        title: g('description') || (signedAmount < 0 ? 'Pago' : 'Cobro'),
        subtitle: validDate
          ? validDate.toLocaleDateString('es-AR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })
          : 'Fecha no disponible',
        date: rawDate,
        amount: signedAmount,
        formattedAmount: Math.abs(signedAmount).toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        icon: g('method') === 'CARD' ? 'credit_card' : 'account_balance',
        payerId: g('payer')?.id || null,
        receiverId: g('receiver')?.id || null
      }
    })
  }
  catch (err) {
    console.error(err)
    errorMessage.value = err.message || 'Error desconocido'
    activities.value   = []
  }
  finally {
    isLoading.value = false
  }
}


  const getFilteredActivities = computed(() => (m, y) =>
    activities.value.filter(a => {
      const d = new Date(a.date)
      return (m === -1 || d.getMonth() === m)
          && (y === -1 || d.getFullYear() === y)
    })
  )

  const getRecentActivities = computed(() => (limit = 10) =>
    activities.value.slice(0, limit)
  )

  return {
    activities,
    isLoading,
    errorMessage,
    loadActivities,
    getFilteredActivities,
    getRecentActivities
  }
})
