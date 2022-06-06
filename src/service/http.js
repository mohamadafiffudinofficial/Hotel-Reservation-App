import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;
const apiHost = process.env.REACT_APP_API_HOST;

const http = axios.create({
    baseURL: baseUrl,
    headers: {
        'x-rapidapi-host': apiHost,
        'x-rapidapi-key': apiKey
    }
})

const parseResponse = (response) => {
    return {
        data: response.data
    }
}

http.interceptors.response.use((response) => {
    return parseResponse(response)
}, (error) => {
    return Promise.reject(error)
})

export default http;