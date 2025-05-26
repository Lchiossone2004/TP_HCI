import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCardStore = defineStore('card', () => {

    const tarjetas = ref([]);

    async function getCards(){
        try{
            const token = localStorage.getItem('auth-token');

            if (!token) {
                throw new Error('No hay token de autenticación guardado.');
            }
            const response = await fetch("http://localhost:8080/api/card", {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
                }
              });

            if (!response.ok) {
                // Lanza un error si la respuesta no fue satisfactoria
                throw new Error(`Error obteniendo tarjetas: ${response.status}`);
            }

            const data = await response.json();
            return data
        }
        catch(error){
            console.error('Error al obtener las tarjetas:', error);
            throw error; // vuelve a lanzar para que el componente pueda capturarlo
        }
    }


    async function getSingleCard(id){
        try{
            const token = localStorage.getItem('auth-token');

            if (!token) {
                throw new Error('No hay token de autenticación guardado.');
            }
            const response = await fetch(`http://localhost:8080/api/card/${id}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
                },
              });

            if (!response.ok) {
                // Lanza un error si la respuesta no fue satisfactoria
                throw new Error(`Error agregando tarjeta: ${response.status}`);
            }
            const data = await response.json();
            return data;
        }
        catch(error){
            console.error('Error en cargando tarjeta:', error);
            throw error; // vuelve a lanzar para que el componente pueda capturarlo
        }
    }

    async function addCard(newCard){
        try{
            const token = localStorage.getItem('auth-token');

            if (!token) {
                throw new Error('No hay token de autenticación guardado.');
            }
            const bodyToSend = {
                type: newCard.type,
                number: newCard.number,
                expirationDate: newCard.expirationDate,
                fullName: newCard.fullName,
                cvv: newCard.cvv,
                metadata: {}
            }
            console.log(JSON.stringify(bodyToSend))
            const response = await fetch("http://localhost:8080/api/card", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(bodyToSend)
              });
            if (!response.ok) {
                // Lanza un error si la respuesta no fue satisfactoria
                throw new Error(`Error agregando tarjeta: ${response.status}`);
            }
            const tarjetaAgregada = await response.json()
            tarjetas.value.push(tarjetaAgregada)
        }
        catch(error){
            console.error('Error en cargando tarjeta:', error);
            throw error; // vuelve a lanzar para que el componente pueda capturarlo
        }
    }

    async function deleteCard(id){
        try{
            const token = localStorage.getItem('auth-token');

            if (!token) {
                throw new Error('No hay token de autenticación guardado.');
            }
            const response = await fetch(`http://localhost:8080/api/card/${id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
                },
              });

            if (!response.ok) {
                // Lanza un error si la respuesta no fue satisfactoria
                throw new Error(`Error agregando tarjeta: ${response.status}`);
            }
             tarjetas.value = tarjetas.value.filter(t => t.id !== id);
        }
        catch(error){
            console.error('Error en cargando tarjeta:', error);
            throw error; // vuelve a lanzar para que el componente pueda capturarlo
        }
    }
    

    return {getCards, getSingleCard, addCard, deleteCard, tarjetas}
})