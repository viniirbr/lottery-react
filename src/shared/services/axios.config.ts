import axios, { AxiosError } from 'axios'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:3333/',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

instance.interceptors.request.use(async (config) => {

    const token = '';

    if (token) {
        config.headers!.Authorization = `Bearer ${token}`
    }

    return config;
}, (error: AxiosError) => {
    return Promise.reject(error);
});

instance.interceptors.response.use(async (response) => {
    return response.data;
}, (error: AxiosError) => {

    if (error.response) {
        const handledError = error.response;
        return Promise.reject(handledError);
    }

    return Promise.reject(error);
});

export default instance;