import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {

    async function createUser(datos){
        try{
            fetch("http://localhost:8080/api/user",{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            })
        }
        catch(error){
            console.error('Error al crear el usuario:', error);
        }
    }

    async function logIn(email, password){
        try{
            const response = await fetch("http://localhost:8080/api/user/login", {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const data = await response.json()

            localStorage.setItem('auth-token', data.token)
        }
        catch(error){
            console.error('Error al hacer el logIn', error)
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
    return{createUser, logIn ,getUser, verifyUser,resendVerification}
})