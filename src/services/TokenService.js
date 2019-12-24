import axios from 'axios'
import EurekaServer from "./EurekaServer";

var tokenService = null;

async function load() {
    await EurekaServer.getInstance("token-service").then((url) => {
        tokenService = axios.create({
            baseURL: "http://" + url.data,
            withCredentials: false
        });
    });
}

export default {
    async getToken(GToken, setToken) {
        if (tokenService == null) {
            await load();
        }
        tokenService.get('token/token', {headers: {gtoken: GToken}}).then(response => {
            setToken(response.data)
        });
    }
}