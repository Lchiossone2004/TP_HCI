import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {

  async function createUser(datos) {
    try {
      const response = await fetch("http://localhost:8080/api/user", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      })
  
      if (!response.ok) {
        const errorBody = await response.text()
        throw new Error(`Error al registrar: ${response.status} - ${errorBody}`)
      }
  
      return await response.json()
    } catch (error) {
      console.error('Error al crear el usuario:', error)
      throw error
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
      async function sendRecoveryCode(email){
        try {
            const response = await fetch(`http://localhost:8080/api/user/reset-password?email=${email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
            })
            if (!response.ok) {
                throw new Error(`Error sending code: ${response.status}`);
              }
        }
        catch(error){
            console.error('Error en sendReocveryCode:', error);
            throw error; 
        }
      }
      
      async function changePassword(code, password) {
        try {
            const response = await fetch("http://localhost:8080/api/user/change-password", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code: code, password: password })
            })
            if (!response.ok) {
                throw new Error(`Error cambiando password: ${response.status}`);
              }
        }
        catch(error){
            console.error('Error en changePassword:', error);
            throw error; 
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

    async function verifyUser(code){
        try {
            const response = await fetch(`http://localhost:8080/api/user/verify?code=${code}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }
            });
    
            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Error del servidor: ${response.status} - ${errorBody}`);
            }
    
            const result = await response.json();
            console.log('Verificación exitosa:', result);
            return result;
        } catch(error){
            console.error('Error verificando email:', error);
        }
    }

    async function resendVerification(email){
        try{
            const response = await fetch(`http://localhost:8080/api/user/resend-verification?email=${email}`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
            })
        }
        catch(error){
            console.error('Error al renviar el email:', error);
        }
    }
    async function updateUser({ firstname, lastname, email, avatar }) {
      console.log('INTENTANDO guardar usuario:', firstname, lastname, email, avatar)
    
      const token = localStorage.getItem('auth-token')
      const response = await fetch('http://localhost:8080/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ firstname, lastname, email, avatar }) 
      })
    
      const text = await response.text()
     
    
      if (!response.ok) {
        throw new Error(`Error al actualizar perfil: ${response.status} - ${text}`)
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
      
      
      
    return{createUser, logIn ,getUser, verifyUser,resendVerification, sendRecoveryCode, changePassword, updateUser, logOut}
    
})
