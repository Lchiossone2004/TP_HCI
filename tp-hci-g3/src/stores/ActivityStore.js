import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/UserStore'

// Mapa de categorías basado en palabras clave en el detalle
const CATEGORY_MAP = {
  'servicios': {
    keywords: ['servicio', 'servicios', 'pago de servicio', 'cobro de servicio'],
    color: '#FF6B6B'
  },
  'transporte': {
    keywords: ['taxi', 'uber', 'subte', 'colectivo', 'transporte', 'viaje'],
    color: '#4ECDC4'
  },
  'alimentacion': {
    keywords: ['comida', 'restaurante', 'cena', 'almuerzo', 'desayuno', 'café', 'mercado', 'supermercado'],
    color: '#FFD93D'
  },
  'entretenimiento': {
    keywords: ['cine', 'teatro', 'concierto', 'show', 'entrada', 'evento'],
    color: '#95E1D3'
  },
  'salud': {
    keywords: ['médico', 'farmacia', 'medicamento', 'consulta', 'salud'],
    color: '#FF8B94'
  },
  'educacion': {
    keywords: ['curso', 'libro', 'material', 'educación', 'estudio'],
    color: '#6C5CE7'
  },
  'otros': {
    keywords: [],
    color: '#A8E6CF'
  }
}

export const useActivityStore = defineStore('activity', () => {
  const activities   = ref([])
  const isLoading    = ref(false)
  const errorMessage = ref(null)
  const userStore    = useUserStore()

  // Función para determinar la categoría basada en el detalle
  function getCategoryFromDescription(description) {
    if (!description) return 'otros'
    
    const lowerDesc = description.toLowerCase()
    for (const [category, data] of Object.entries(CATEGORY_MAP)) {
      if (data.keywords.some(keyword => lowerDesc.includes(keyword))) {
        return category
      }
    }
    return 'otros'
  }

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
    cardId = null
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
        if (p.pending) continue

        const metadata = Array.isArray(p.metadata) ? p.metadata : []
        const dateObj = metadata.find(m => m.date) || { date: p.createdAt || new Date().toISOString() }
        if (!metadata.find(m => m.date)) metadata.push(dateObj)
  
        const rawDate = dateObj.date
        const validDate = rawDate && !isNaN(new Date(rawDate)) ? new Date(rawDate) : null
  
        let rawAmount = p.amount
        if (typeof rawAmount === 'string') rawAmount = parseFloat(rawAmount)
        if (isNaN(rawAmount)) rawAmount = 0
  
        const isPayer = p.payer?.id === currentUser?.id
        const signedAmount = isPayer ? -rawAmount : rawAmount
        const title = p.description ? p.description : isPayer ? 'Pago' : 'Cobro'
        const icon = p.method === 'CARD' ? 'credit_card' : 'account_balance'
        
        // Determinar la categoría
        const category = getCategoryFromDescription(p.description)
        const categoryColor = CATEGORY_MAP[category].color
  
        newActivities.push({
          id: p.id,
          title,
          subtitle: validDate
            ? validDate.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
            : 'Fecha no disponible',
          date: rawDate,
          amount: signedAmount,
          formattedAmount: Math.abs(signedAmount).toLocaleString('es-AR', {
            style: 'currency', currency: 'ARS', minimumFractionDigits: 2, maximumFractionDigits: 2
          }),
          icon,
          payerId: p.payer?.id || null,
          receiverId: p.receiver?.id || null,
          category,
          categoryColor
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

  // Nuevo computed para obtener gastos por categoría
  const getExpensesByCategory = computed(() => (month = -1, year = -1) => {
    const filteredActivities = getFilteredActivities.value(month, year)
    const expensesByCategory = {}
    
    filteredActivities.forEach(activity => {
      if (activity.amount < 0) { // Solo gastos (montos negativos)
        const category = activity.category
        if (!expensesByCategory[category]) {
          expensesByCategory[category] = {
            amount: 0,
            color: activity.categoryColor
          }
        }
        expensesByCategory[category].amount += Math.abs(activity.amount)
      }
    })
    
    return Object.entries(expensesByCategory).map(([category, data]) => ({
      category,
      amount: data.amount,
      color: data.color
    }))
  })

  return {
    activities,
    isLoading,
    errorMessage,
    loadActivities,
    getFilteredActivities,
    getRecentActivities,
    getExpensesByCategory
  }
})
