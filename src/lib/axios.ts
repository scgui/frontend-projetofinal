import axios from 'axios'
export const api = axios.create({
    baseURL: 'https://backend-42eu.onrender.com/'
})