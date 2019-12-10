import EurekaServer from "./EurekaServer";

var socket = null;

export default {
    connect(projectid, addMessage, token) {
        if (socket != null) {
            socket.close();
            socket = null;
        }
        EurekaServer.getInstance("update-service").then((url) => {
            socket = new WebSocket(url.data.replace("http", "ws") + "/project");

            socket.onopen = function () {
                socket.send(projectid + "\n" + token);
                window.console.log('opened');
            }

            socket.onmessage = function (event) {
                addMessage(JSON.parse(event.data));
            };

            socket.onclose = function () {
                socket = null;
            }

            socket.onerror = function (e) {
                window.console.log(e);
            }
        });
    },
    disconnect() {
        socket.close();
    },
    sendMessage(object) {
        socket.send(object);
    }
}