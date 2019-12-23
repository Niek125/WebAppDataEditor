import EurekaServer from "./EurekaServer";

var socket = null;

export default {
    connect(projectid, addMessage, token) {
        if (socket != null) {
            socket.close();
            socket = null;
        }
        EurekaServer.getInstance("update-service").then((url) => {
            socket = new WebSocket("ws://" + url.data + "/project");

            socket.onopen = function () {
                const header = {
                    action: "UPDATE",
                    payload: "token"
                }
                const pay = {
                    interest: projectid,
                    token: token
                }
                socket.send(JSON.stringify(header) + "\n" + JSON.stringify(pay));
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