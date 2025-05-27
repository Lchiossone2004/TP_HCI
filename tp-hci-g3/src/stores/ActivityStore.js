import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useActivityStore = defineStore('activity', () => {
  const activities   = ref([])
  const isLoading    = ref(false)
  const errorMessage = ref(null)

  async function loadActivities({
    page      = 1,
    direction = 'DESC',
    pending   = null,
    method    = null,
    range     = null,
    role      = null,
    cardId    = null
  } = {}) {
    isLoading.value    = true
    errorMessage.value = null

    try {
      const token = localStorage.getItem('auth-token')
      if (!token) throw new Error('No hay token de autenticación guardado.')

      const params = new URLSearchParams({ page, direction })
      if (pending !== null) params.set('pending', pending)
      if (method)        params.set('method', method)
      if (range)         params.set('range', range)
      if (role)          params.set('role', role)
      if (cardId)        params.set('cardId', cardId)

      const res = await fetch(`http://localhost:8080/api/payment?${params.toString()}`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })

      if (!res.ok) {
        throw new Error(`Error ${res.status} cargando actividades`)
      }

      const { results } = await res.json()

      // Aquí transformamos results para asegurarnos que metadata sea array con un objeto date
      const resultsWithDate = results.map(p => {
        if (!p.metadata || !Array.isArray(p.metadata)) p.metadata = []

        if (!p.metadata.find(item => item.date)) {
          p.metadata.push({ date: p.createdAt || new Date().toISOString() })
        }

        return p
      })

      activities.value = resultsWithDate.map(p => {
        const dateEntry = p.metadata.find(item => item.date)
        const rawDate = dateEntry ? dateEntry.date : null
        const validDate = rawDate && !isNaN(new Date(rawDate)) ? new Date(rawDate) : null

        return {
          id: p.id,
          title: p.description || (p.amount < 0 ? 'Pago' : 'Cobro'),
          subtitle: validDate
            ? validDate.toLocaleDateString('es-AR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })
            : 'Fecha no disponible',
          date: rawDate,
          amount: p.amount,
          formattedAmount: p.amount.toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }),
          icon: p.method === 'CARD' ? 'credit_card' : 'account_balance'
        }
      })
    }
    catch (err) {
      console.error('Error cargando actividades:', err)
      errorMessage.value = err.message || 'Error desconocido'
      activities.value  = []
    }
    finally {
      isLoading.value = false
    }
  }

  const getFilteredActivities = computed(() => {
    return (month, year) =>
      activities.value.filter(a => {
        const d = new Date(a.date)
        return (month === -1 || d.getMonth() === month)
            && (year  === -1 || d.getFullYear() === year)
      })
  })

  const getRecentActivities = computed(() => {
    return (limit = 10) => activities.value.slice(0, limit)
  })

  return {
    activities,
    isLoading,
    errorMessage,
    loadActivities,
    getFilteredActivities,
    getRecentActivities
  }
})
