import axios from 'axios'

const tokenService = axios.create({
    baseURL: 'http://localhost:8092/token',
    withCredentials: false,
});

export default {
    getToken(GToken, setToken) {
        tokenService.get('/token/' + GToken).then(response => {
            setToken(response.data)
        });
    }
}