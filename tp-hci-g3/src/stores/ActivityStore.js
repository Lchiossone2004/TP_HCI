import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/UserStore'

export const useActivityStore = defineStore('activity', () => {
  const activities   = ref([])
  const isLoading    = ref(false)
  const errorMessage = ref(null)
  const userStore    = useUserStore()

  /**
   * @param {{ page?: number, direction?: string, pending?: boolean|null,
   *           method?: string|null, range?: string|null,
   *           role?: 'PAYER'|'RECEIVER'|null, cardId?: number|null }} opts
   */
  async function loadActivities({
    page = 1,
    direction = 'DESC',
    pending = null,
    method = null,
    range = null,
    role = null,
    cardId = null,
  } = {}) {
    isLoading.value = true
    errorMessage.value = null
  
    try {
      const token = localStorage.getItem('auth-token')
      if (!token) throw new Error('No hay token guardado.')
  
      let url = 'http://localhost:8080/api/payment?page=' + page + '&direction=' + direction
      if (pending !== null) url += '&pending=' + pending
      if (method) url += '&method=' + method
      if (range) url += '&range=' + range
      if (role) url += '&role=' + role
      if (cardId) url += '&cardId=' + cardId
  
      const res = await fetch(url, { headers: { 'Authorization': 'Bearer ' + token } })
      if (!res.ok) throw new Error('Error ' + res.status + ' cargando actividades')
  
        const json = await res.json()
        const results = json.results
        const currentUser = await userStore.getUser()
        const newActivities = []
        
        for (let i = 0; i < results.length; i++) {
          const p = results[i]
          const metadata = p.metadata || {}
        
          const rawDate = metadata.date || p.createdAt || new Date().toISOString()
          const Detalle = metadata.detalle || null
        
          const validDate = rawDate && !isNaN(new Date(rawDate)) ? new Date(rawDate) : null
        
          let rawAmount = p.amount
          if (typeof rawAmount === 'string') rawAmount = parseFloat(rawAmount)
          if (isNaN(rawAmount)) rawAmount = 0
        
          const isPayer = p.payer?.id === currentUser?.id
          const signedAmount = isPayer ? -rawAmount : rawAmount
          const title = p.description ? p.description : isPayer ? 'Pago' : 'Cobro'
          const icon = p.method === 'CARD' ? 'credit_card' : 'account_balance'
        
          newActivities.push({
            id: p.id,
            title,
            subtitle: validDate
              ? validDate.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
              : 'Fecha no disponible',
            date: rawDate,
            amount: signedAmount,
            formattedAmount: Math.abs(signedAmount).toLocaleString('es-AR', {
              style: 'currency',
              currency: 'ARS',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }),
            icon,
            payerId: p.payer?.id || null,
            receiverId: p.receiver?.id || null,
            detalle: Detalle
          })
        }
  
      activities.value = newActivities
    } catch (err) {
      console.error(err)
      errorMessage.value = err.message || 'Error desconocido'
      activities.value = []
    } finally {
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
