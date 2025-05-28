import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {

  async function createUser(datos) {
    try {
      // Aseguremos que el formato de fecha sea correcto
      if (datos.birthDate) {
        // Convertir la fecha al formato YYYY-MM-DD
        const date = new Date(datos.birthDate);
        datos.birthDate = date.toISOString().split('T')[0];
      }

      console.log('Enviando datos al servidor:', datos); // Para debugging

      const response = await fetch("http://localhost:8080/api/user", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error('Respuesta de error completa:', errorBody); // Para debugging
        
        // Si es un error de duplicado
        if (errorBody.includes('duplicate') || errorBody.includes('already exists')) {
          throw new Error('duplicate_email');
        }
        
        throw new Error(`Error al registrar: ${response.status} - ${errorBody}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      throw error;
    }
  }
  
  // Nueva función para verificar el estado de un email
  async function checkEmailStatus(email) {
    try {
      const response = await fetch(`http://localhost:8080/api/user/check-email-status?email=${email}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        return { exists: false, verified: false }; // Por defecto asumimos que no existe
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al verificar estado del email:', error);
      return { exists: false, verified: false }; // En caso de error, asumimos que no existe
    }
  }
  
  // Nueva función para eliminar usuario no verificado
  async function deleteUnverifiedUser(email) {
    try {
      const response = await fetch(`http://localhost:8080/api/user/delete-unverified?email=${email}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error al eliminar usuario no verificado:', error);
      return false;
    }
  }
  

    async function logIn(email, password) {
        try {
          const response = await fetch("http://localhost:8080/api/user/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }) 
          });
      
          if (!response.ok) {
            throw new Error(`Error en login: ${response.status}`);
          }
      
          const data = await response.json();
          localStorage.setItem('auth-token', data.token);
          return data;
        } catch (error) {
          console.error('Error en logIn:', error);
          throw error; 
        }
      }
      async function sendRecoveryCode(email) {
        try {
          const response = await fetch(`http://localhost:8080/api/user/reset-password?email=${email}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            console.error(`Error sending code: ${response.status}`);
            return false;
          }
      
          return true;
        } catch (error) {
          console.error('Error en sendRecoveryCode:', error);
          return false;
        }
      }
      
      async function changePassword(code, password) {
        try {
          const response = await fetch("http://localhost:8080/api/user/change-password", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code, password }),
          });
      
          if (!response.ok) {
            console.error(`Error cambiando password: ${response.status}`);
            return false;
          }
      
          return true;
        } catch (error) {
          console.error('Error en changePassword:', error);
          return false;
        }
      }      
    async function getUser(){
        try{
            const token = localStorage.getItem('auth-token');

            if (!token) {
                throw new Error('No hay token de autenticación guardado.');
            }
            const response = await fetch("http://localhost:8080/api/user", {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
                }
              });
            const data = await response.json();
            return data;
        }
        catch(error){
            console.error('Error al obtener el usuario:', error);
        }
    }

    async function verifyUser(code) {
      try {
        const response = await fetch(`http://localhost:8080/api/user/verify?code=${code}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          }
        });
    
        if (!response.ok) {
          const errorBody = await response.text();
          console.error(`Error del servidor: ${response.status} - ${errorBody}`);
          return false;
        }
    
        const result = await response.json();
        console.log('Verificación exitosa:', result);
        return true;
      } catch (error) {
        console.error('Error verificando email:', error);
        return false;
      }
    }

    async function resendVerification(email) {
      try {
        const response = await fetch(`http://localhost:8080/api/user/resend-verification?email=${email}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        });
    
        if (!response.ok) {
          console.error(`Error reenviando verificación: ${response.status}`);
          return false;
        }
    
        return true;
      } catch (error) {
        console.error('Error al reenviar el email:', error);
        return false;
      }
    }
  
    
  async function getDefaultAccountData() {
    const token = localStorage.getItem('auth-token')
    const response = await fetch('http://localhost:8080/api/account/default', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    if (!response.ok) throw new Error('Error al obtener datos por defecto')
    return await response.json()
  }

  async function logOut() {
    const token = localStorage.getItem('auth-token')
    try {
      await fetch("http://localhost:8080/api/user/logout", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
    } catch (error) {
      console.warn('Error al cerrar sesión en el backend:', error)
    } finally {
      localStorage.removeItem('auth-token')
      localStorage.removeItem('email')
      sessionStorage.removeItem('email')
    }
  }
  
return {
    createUser, 
    logIn, 
    getUser, 
    verifyUser, 
    resendVerification, 
    sendRecoveryCode, 
    changePassword, 
    logOut,
    checkEmailStatus,
    deleteUnverifiedUser 
  }    
})
