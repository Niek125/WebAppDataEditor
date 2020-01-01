import axios from 'axios'
import EurekaServer from "./EurekaServer";

var datasetservice = null;

async function load() {
    await EurekaServer.getInstance("dataset-service").then((url) => {
        datasetservice = axios.create({
            baseURL: "https://" + url.data,
            withCredentials: false,
        });
    });
}

export default {
    async getdata(projectid, token){
        if (datasetservice == null) {
            await load();
        }
        return datasetservice.get('data/get/' + projectid, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
    }
}