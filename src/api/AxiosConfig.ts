import axios from 'axios'

export const axiosBase = axios.create({
    baseURL:'http://127.0.0.1:3333/'
})