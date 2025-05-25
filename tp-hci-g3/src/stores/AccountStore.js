import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAccountStore = defineStore('account', () => {
  const balance = ref(100.0)
  const alias = ref('wing.pya.alias')
  const cvu = ref('') 

  async function getAccountInfo() {
    try {
      const token = localStorage.getItem('auth-token')

      if (!token) {
        throw new Error('No hay token de autenticación guardado.')
      }

      const response = await fetch(`http://localhost:8080/api/account`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })

      if (!response.ok) {
        throw new Error(`Error obteniendo información de cuenta: ${response.status}`)
      }

      const data = await response.json()
      alias.value = data.alias || ''
      cvu.value = data.cvu || ''
      balance.value = data.balance || 0

      return data
    } catch (error) {
      console.error('Error obteniendo información de cuenta:', error)
      throw error
    }
  }

  async function chargeBalance(amount) {
    try {
      const token = localStorage.getItem('auth-token')

      if (!token) {
        throw new Error('No hay token de autenticación guardado.')
      }

      const response = await fetch(
        `http://localhost:8080/api/account/recharge?amount=${amount}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        }
      )

      if (!response.ok) {
        throw new Error(`Error recargando el saldo: ${response.status}`)
      }
    } catch (error) {
      console.error('Error recargando el saldo:', error)
      throw error
    }
  }

  async function updateAlias(newAlias) {
    try {
      const token = localStorage.getItem('auth-token')

      if (!token) {
        throw new Error('No hay token de autenticación guardado.')
      }

      const response = await fetch(
        `http://localhost:8080/api/account/update-alias?alias=${newAlias}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        }
      )

      if (!response.ok) {
        throw new Error(`Error actualizando alias: ${response.status}`)
      }

      alias.value = newAlias // ✅ actualizamos el alias en el estado
    } catch (error) {
      console.error('Error actualizando alias:', error)
      throw error
    }
  }

  async function checkCVU(cvuToCheck) {
    try {
      const token = localStorage.getItem('auth-token')

      if (!token) {
        throw new Error('No hay token de autenticación guardado.')
      }

      const response = await fetch(
        `http://localhost:8080/api/account/verify-cvu?cvu=${cvuToCheck}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        }
      )

      if (!response.ok) {
        throw new Error(`Error verificando el cvu: ${response.status}`)
      }
    } catch (error) {
      console.error('Error verificando el cvu:', error)
      throw error
    }
  }

  async function checkAlias(aliasToCheck) {
    try {
      const token = localStorage.getItem('auth-token')

      if (!token) {
        throw new Error('No hay token de autenticación guardado.')
      }

      const response = await fetch(
        `http://localhost:8080/api/account/verify-alias?alias=${aliasToCheck}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        }
      )

      if (!response.ok) {
        throw new Error(`Error verificando el alias: ${response.status}`)
      }
    } catch (error) {
      console.error('Error verificando el alias:', error)
      throw error
    }
  }

  return {
    getAccountInfo,
    chargeBalance,
    updateAlias,
    checkAlias,
    checkCVU,
    balance,
    alias,
    cvu 
  }
})
