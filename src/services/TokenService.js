import axios from 'axios'
import EurekaServer from "./EurekaServer";

var tokenService = null;
EurekaServer.getInstance("token-service").then((url) => {
    tokenService = axios.create({
        baseURL: url.data,
        withCredentials: false
    });
});
export default {
    getToken(GToken, setToken) {
        if(tokenService == null){
            setTimeout(this.getToken(GToken, setToken), 10)
        }
        tokenService.get('token/token/' + GToken).then(response => {
            setToken(response.data)
        });
    }
}