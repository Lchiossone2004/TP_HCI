import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAccountStore = defineStore('account', () => {

    const balance = ref(100.000,30)
    const alias =  ref('wing.pya.alias')
    
    async function getAccountInfo(){
        try{
            const token = localStorage.getItem('auth-token');

            if (!token) {
                throw new Error('No hay token de autenticación guardado.');
            }
            const response = await fetch(`http://localhost:8080/api/account`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                });

            if (!response.ok) {
                // Lanza un error si la respuesta no fue satisfactoria
                throw new Error(`Error obteniendo informacion de cuenta: ${response.status}`);
            }
            const data = await response.json()
            return data
        }
        catch(error){
            console.error('Error obteniendo informacion de cuenta:', error);
            throw error; // vuelve a lanzar para que el componente pueda capturarlo
        }
    }       

    async function chargeBalance(amount){
        try{
            const token = localStorage.getItem('auth-token');

            if (!token) {
                throw new Error('No hay token de autenticación guardado.');
            }
            const response = await fetch(`http://localhost:8080/api/account/recharge?amount=${amount}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                });

            if (!response.ok) {
                // Lanza un error si la respuesta no fue satisfactoria
                throw new Error(`Error obteniendo informacion de cuenta: ${response.status}`);
            }
        }
        catch(error){
            console.error('Error obteniendo informacion de cuenta:', error);
            throw error; // vuelve a lanzar para que el componente pueda capturarlo
        }
    }
    async function updateAlias(alias){
        try{
            const token = localStorage.getItem('auth-token');

            if (!token) {
                throw new Error('No hay token de autenticación guardado.');
            }
            const response = await fetch(`http://localhost:8080/api/account/update-alias?alias=${alias}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                });

            if (!response.ok) {
                // Lanza un error si la respuesta no fue satisfactoria
                throw new Error(`Error obteniendo informacion de cuenta: ${response.status}`);
            }
        }
        catch(error){
            console.error('Error obteniendo informacion de cuenta:', error);
            throw error; // vuelve a lanzar para que el componente pueda capturarlo
        }
    }
    async function checkCVU(cvu){
        try{
            const token = localStorage.getItem('auth-token');

            if (!token) {
                throw new Error('No hay token de autenticación guardado.');
            }
            const response = await fetch(`http://localhost:8080/api/account/verify-cvu?cvu=${cvu}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                });

            if (!response.ok) {
                // Lanza un error si la respuesta no fue satisfactoria
                throw new Error(`Error verificando el cvu: ${response.status}`);
            }
        }
        catch(error){
            console.error('Error verificando el cvu:', error);
            throw error; // vuelve a lanzar para que el componente pueda capturarlo
        }
    }
    async function checkAlias(alias){
        try{
            const token = localStorage.getItem('auth-token');

            if (!token) {
                throw new Error('No hay token de autenticación guardado.');
            }
            const response = await fetch(`http://localhost:8080/api/account/verify-alias?alias=${alias}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                });

            if (!response.ok) {
                // Lanza un error si la respuesta no fue satisfactoria
                throw new Error(`Error verificando el alias: ${response.status}`);
            }
        }
        catch(error){
            console.error('Error verificando el alias:', error);
            throw error; // vuelve a lanzar para que el componente pueda capturarlo
        }
    }

    return {getAccountInfo, chargeBalance, updateAlias, checkAlias, checkCVU, balance}
})