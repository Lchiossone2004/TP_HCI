import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAccountStore } from './AccountStore'
import { ro } from 'vuetify/locale'


export const usePaymentStore = defineStore('payment', () => {

  const pendingPayments = ref([])
  const transferencias = ref([])

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
          // Lanza un error si la respuesta no fue satisfactoria
          throw new Error(`Error creando el pago: ${response.status}`);
      }
      const data = await response.json()
      //pendingPayments.push(payment)
      console.log(data)
      return data
    }
    catch(error){
        console.error('Error creando el pago', error);
        throw error; // vuelve a lanzar para que el componente pueda capturarlo
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
          // Lanza un error si la respuesta no fue satisfactoria
          throw new Error(`Error al pagar el pago pendiente: ${response.status}`);
      }
      const data = await response.json()
      pendingPayments = pendingPayments.filter(p => p.uuid !== uuid);
      console.log(data)
      return data
    }
    catch(error){
        console.error('Error al pagar el pago pendiente:', error);
        throw error; // vuelve a lanzar para que el componente pueda capturarlo
    }
  }

  async function transferViaEmail(email, cardId, motivo, monto) {
    try {
      const token = localStorage.getItem('auth-token');
      const accountStore = useAccountStore();
  
      if (!token) {
        throw new Error('No hay token de autenticación guardado.');
      }
  
      // Verificar si hay saldo suficiente
      if (accountStore.balance < monto) {
        throw new Error('Saldo insuficiente para realizar la transferencia.');
      }
  
      // Construir URL con o sin cardId
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
  
      // Actualizar el balance después de la transferencia exitosa
      await agregarTransaccion(monto, 'egreso');
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

      // Verificar si hay saldo suficiente
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
      
      // Actualizar el balance después de la transferencia exitosa
      await agregarTransaccion(monto, 'egreso');
      transferencias.push(data)
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

      // Verificar si hay saldo suficiente
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
      
      // Actualizar el balance después de la transferencia exitosa
      await agregarTransaccion(monto, 'egreso');
      transferencias.push(data)
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
          // Lanza un error si la respuesta no fue satisfactoria
          throw new Error(`Error al trater de obterner los pagos: ${response.status}`);
      }
      const data = await response.json()
      return data
    }
    catch(error){
        console.error('Error al trater de obtener los pagos:', error);
        throw error; // vuelve a lanzar para que el componente pueda capturarlo
    }
  }


    async function agregarTransaccion(monto, tipo) {
      const accountStore = useAccountStore()
      if (tipo === 'ingreso') {
        accountStore.balance += monto
        await accountStore.chargeBalance(monto)
      } else if (tipo === 'egreso') {
        accountStore.balance -= monto
      }
    }


  return { pullPayment, pushPayment, transferViaEmail, transferViaCVU, transferViaAlias, getAllPayments, agregarTransaccion, transferencias, pendingPayments}
})
