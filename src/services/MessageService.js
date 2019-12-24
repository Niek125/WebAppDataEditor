import axios from 'axios'
import EurekaServer from "./EurekaServer";

var messageservice = null;

async function load() {
    await EurekaServer.getInstance("message-service").then((url) => {
        messageservice = axios.create({
            baseURL: "http://" + url.data,
            withCredentials: false,
        });
    });
}

export default {
    async getmessages(projectid, token){
        if (messageservice == null) {
            await load();
        }
        return messageservice.get('chat/messages/' + projectid, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
    }
}