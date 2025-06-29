import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAccountStore } from './AccountStore'
import { useActivityStore } from './ActivityStore'

export const usePaymentStore = defineStore('payment', () => {
  const pendingPayments = ref([])
  const transferencias = ref([])
 

 
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


  async function makePayment(uuid, cardId){
    try{
      const token = localStorage.getItem('auth-token');

      if (!token) {
          throw new Error('No hay token de autenticación guardado.');
      }
      console.log(cardId)
      let url = `http://localhost:8080/api/payment/push?uuid=${encodeURIComponent(uuid)}`;
      if (cardId != null && cardId !== '') {
        url += `&cardId=${encodeURIComponent(cardId)}`;
      }
      const response = await fetch(url, {
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
      await accountStore.chargeBalance(monto);
      await accountStore.getAccountInfo();
    }
  }

  async function transferViaEmail(email, cardId, motivo, monto,detalle) {
    console.log(detalle)
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
          metadata: {detalle},
        })
      });
  
      if (!response.ok) {
        throw new Error(`Error al transferir via email: ${response.status}`);
      }
  
      const data = await response.json();
      if(cardId == null){
        accountStore.balance -= monto;
      }
      return data;
    } catch (error) {
      console.error('Error al transferir via email:', error);
      throw error;
    }
  }

  async function transferViaCVU(cvu, cardId, motivo, monto,detalle){
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
            metadata: {detalle}
          })
      });

      if (!response.ok) {
          throw new Error(`Error al transferir via cvu: ${response.status}`);
      }
      const data = await response.json()
  
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

  async function transferViaAlias(alias, cardId, motivo, monto,detalle){
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
            metadata: {detalle}
          })
      });

      if (!response.ok) {
          throw new Error(`Error al transferir via alias: ${response.status}`);
      }
      const data = await response.json()

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

  async function generateServicePayment(amount, description,motivo) {
    try {
    
      const uniqueCode = Math.random().toString(36).substring(2, 10).toUpperCase();
      
    
      const baseUrl = window.location.origin;
      const paymentLink = `${baseUrl}/servicios?tab=pay&code=${uniqueCode}`;

  
      const payment = {
        amount: parseFloat(amount),
        description,
        metadata: {
          detalle: motivo,
          code: uniqueCode,
          link: paymentLink,
          createdAt: new Date().toISOString()
        }
      };

     
      const response = await pullPayment(payment);

      if (!response) {
        throw new Error('Error al crear el pago');
      }

     
      const fullPayment = {
        ...response,
        code: uniqueCode,
        link: paymentLink,
        amount: parseFloat(amount),
        description,
        status: 'pending',
        type: 'service'
      };

   
      pendingPayments.value = [fullPayment, ...pendingPayments.value];

      return fullPayment;
    } catch (error) {
      console.error('Error al generar cobro:', error);
      throw error;
    }
  }

  async function getPendingServicePayments() {
    try {
      const response = await fetch(
        'http://localhost:8080/api/payment?pending=true&method=PULL',
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Error al obtener pagos pendientes');
      }

      const data = await response.json();
      const payments = data.results.map(payment => ({
        ...payment,
        detalle: payment.metadata?.detalle
      }));

      pendingPayments.value = payments;
      return payments;
    } catch (error) {
      console.error('Error al obtener pagos pendientes:', error);
      throw error;
    }
  }

  async function deleteServicePayment(paymentId) {
  try {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      throw new Error('No hay token de autenticación guardado');
    }

    const response = await fetch(`http://localhost:8080/api/payment/${paymentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar el pago: ${response.status}`);
    }


    pendingPayments.value = pendingPayments.value.filter(p => p.id !== paymentId);
    return true;
  } catch (error) {
    console.error('Error al eliminar el pago:', error);
    throw error;
  }
}

async function getSinglePayment(code) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/payment?page=1&direction=ASC&pending=true&method=null&range=LAST_MONTH&role=NULLcardId=null`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Error al obtener el pago');
    }

    const data = await response.json();
    console.log('Respuesta completa:', data);

    const payment = data.results.find(p => p.metadata?.code === code);

    if (!payment) {
      throw new Error('No se encontró el pago con ese código');
    }

    return payment;

  } catch (error) {
    console.error('Error al obtener el pago:', error);
    throw error;
  }
}


  return { pullPayment, makePayment, transferViaEmail, transferViaCVU, transferViaAlias, getAllPayments, getSinglePayment,transferencias, pendingPayments, agregarTransaccion, generateServicePayment,
    getPendingServicePayments, deleteServicePayment }
})
