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

    async function logIn(datos){
        try{
            const response = await fetch("http://localhost:8080/api/user/login", {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
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
            const response = await fetch("http://localhost:8080/api/user", {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + import.meta.env.VITE_JWT_TOKEN
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
        try{
            fetch("http://localhost:8080/api/user/verify?code=${code}",{
                method: 'POST',
                headers: {
                'Accept': 'application/json'
                },
            })
        }
        catch(error){
            console.error('Error verificando email', error)
        }
    }
    async function resendVerification(email){
        try{
            const response = await fetch("ttp://localhost:8080/api/user/resend-verification",{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(email)
            })
        }
        catch(error){
            console.error('Error al renviar el email:', error);
        }
    }
    return{createUser, getUser, resendVerification}
})