import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAccountStore } from './AccountStore'
import { useActivityStore } from './ActivityStore'

export const usePaymentStore = defineStore('payment', () => {
  const pendingPayments = ref([])
  const transferencias = ref([])
  const activityStore = useActivityStore()

 
  function formatAmount(amount) {
    return amount.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  function formatDate(date) {
    const now = new Date()
    const activityDate = new Date(date)
    const diffTime = Math.abs(now - activityDate)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      return 'Hoy ' + activityDate.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
    } else if (diffDays === 1) {
      return 'Ayer ' + activityDate.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
    } else {
      return activityDate.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' }) + ' ' + 
             activityDate.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
    }
  }

  async function pullPayment(payment){
    try{
      const token = localStorage.getItem('auth-token');

      if (!token) {
          throw new Error('No hay token de autenticación guardado.');
      }
      const response = await fetch(`http://localhost:8080/api/payment/pull`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify(payment)
          });

      if (!response.ok) {
          throw new Error(`Error creando el pago: ${response.status}`);
      }
      const data = await response.json()
      console.log(data)
      return data
    }
    catch(error){
        console.error('Error creando el pago', error);
        throw error; 
    }
  } 


  async function pushPayment(uuid, cardId){
    try{
      const token = localStorage.getItem('auth-token');

      if (!token) {
          throw new Error('No hay token de autenticación guardado.');
      }
      const response = await fetch(`http://localhost:8080/api/payment/push?uuid=${uuid}&card=${cardId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          },
          });

      if (!response.ok) {
          throw new Error(`Error al pagar el pago pendiente: ${response.status}`);
      }
      const data = await response.json()
      pendingPayments = pendingPayments.filter(p => p.uuid !== uuid);
      console.log(data)
      return data
    }
    catch(error){
        console.error('Error al pagar el pago pendiente:', error);
        throw error; 
    }
  }

  async function agregarTransaccion(monto, tipo) {
    const accountStore = useAccountStore();
    
    if (tipo === 'ingreso') {
      accountStore.balance += monto;
      
      activityStore.addActivity({
        icon: 'add',
        title: 'Ingreso de dinero',
        subtitle: 'Ingreso a tu cuenta',
        amount: monto,
        formattedAmount: formatAmount(monto),
        type: 'income',
        method: 'balance',
        date: new Date().toISOString(),
        details: {
          description: 'Ingreso a tu cuenta'
        }
      });
    }
  }

  async function transferViaEmail(email, cardId, motivo, monto) {
    try {
      const token = localStorage.getItem('auth-token');
      const accountStore = useAccountStore();
  
      if (!token) {
        throw new Error('No hay token de autenticación guardado.');
      }
  
      if (accountStore.balance < monto) {
        throw new Error('Saldo insuficiente para realizar la transferencia.');
      }
  
      let url = `http://localhost:8080/api/payment/transfer-email?email=${encodeURIComponent(email)}`;
      if (cardId != null) {
        url += `&cardId=${encodeURIComponent(cardId)}`;
      }
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          description: motivo || "Transferencia",
          amount: monto,
          metadata: {},
        })
      });
  
      if (!response.ok) {
        throw new Error(`Error al transferir via email: ${response.status}`);
      }
  
      const data = await response.json();

      activityStore.addActivity({
        icon: 'sync_alt',
        title: `Transferencia a ${email}`,
        subtitle: motivo || "Transferencia",
        amount: -monto,
        formattedAmount: formatAmount(-monto),
        type: 'transfer',
        method: cardId ? 'card' : 'balance',
        date: new Date().toISOString(),
        details: {
          recipient: email,
          description: motivo || "Transferencia"
        }
      });
  
      if(cardId == null){
        accountStore.balance -= monto;
      }
      return data;
    } catch (error) {
      console.error('Error al transferir via email:', error);
      throw error;
    }
  }

  async function transferViaCVU(cvu, cardId, motivo, monto){
    try{
      const token = localStorage.getItem('auth-token');
      const accountStore = useAccountStore();

      if (!token) {
          throw new Error('No hay token de autenticación guardado.');
      }

      if (accountStore.balance < monto) {
          throw new Error('Saldo insuficiente para realizar la transferencia.');
      }

      let url = `http://localhost:8080/api/payment/transfer-cvu?cvu=${encodeURIComponent(cvu)}`;
      if (cardId != null) {
        url += `&cardId=${encodeURIComponent(cardId)}`;
      }

      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            description: motivo || "Transferencia",
            amount: monto,
            metadata: {}
          })
      });

      if (!response.ok) {
          throw new Error(`Error al transferir via cvu: ${response.status}`);
      }
      const data = await response.json()
    
      activityStore.addActivity({
        icon: 'sync_alt',
        title: `Transferencia a CVU ${cvu.slice(-4)}`,
        subtitle: motivo || "Transferencia",
        amount: -monto,
        formattedAmount: formatAmount(-monto),
        type: 'transfer',
        method: cardId ? 'card' : 'balance',
        date: new Date().toISOString(),
        details: {
          recipient: cvu,
          description: motivo || "Transferencia"
        }
      });

      if(cardId == null){
        accountStore.balance -= monto;
      }
      return data
    }
    catch(error){
        console.error('Error al transferir via cvu:', error);
        throw error;
    }
  }

  async function transferViaAlias(alias, cardId, motivo, monto){
    try{
      const token = localStorage.getItem('auth-token');
      const accountStore = useAccountStore();

      if (!token) {
          throw new Error('No hay token de autenticación guardado.');
      }

      if (accountStore.balance < monto) {
          throw new Error('Saldo insuficiente para realizar la transferencia.');
      }

      let url = `http://localhost:8080/api/payment/transfer-alias?alias=${encodeURIComponent(alias)}`;
      if (cardId != null) {
        url += `&cardId=${encodeURIComponent(cardId)}`;
      }

      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            description: motivo || "Transferencia",
            amount: monto,
            metadata: {}
          })
      });

      if (!response.ok) {
          throw new Error(`Error al transferir via alias: ${response.status}`);
      }
      const data = await response.json()
    
      activityStore.addActivity({
        icon: 'sync_alt',
        title: `Transferencia a ${alias}`,
        subtitle: motivo || "Transferencia",
        amount: -monto,
        formattedAmount: formatAmount(-monto),
        type: 'transfer',
        method: cardId ? 'card' : 'balance',
        date: new Date().toISOString(),
        details: {
          recipient: alias,
          description: motivo || "Transferencia"
        }
      });

      if(cardId == null){
        accountStore.balance -= monto;
      }
      return data
    }
    catch(error){
        console.error('Error al transferir via alias:', error);
        throw error;
    }
  }

  async function getAllPayments(page, order, status, method, range, role, cardId){
    try{
      const token = localStorage.getItem('auth-token');

      if (!token) {
          throw new Error('No hay token de autenticación guardado.');
      }
      const response = await fetch(`http://localhost:8080/api/payment?page=${page}&direction=${order}&pending=${status}&method=${method}&range=${range}&role=${role}&cardId=${cardId}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          },
          });

      if (!response.ok) {
          throw new Error(`Error al trater de obterner los pagos: ${response.status}`);
      }
      const data = await response.json()
      return data
    }
    catch(error){
        console.error('Error al trater de obtener los pagos:', error);
        throw error; 
    }
  }

  return { pullPayment, pushPayment, transferViaEmail, transferViaCVU, transferViaAlias, getAllPayments, transferencias, pendingPayments, agregarTransaccion }
})
