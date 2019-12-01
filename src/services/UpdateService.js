var socket = null;

export default {
    connect(projectid, addMessage) {
        if(socket != null){
            socket.close();
            socket = null;
        }
        socket = new WebSocket("ws://localhost:8099/project");

        socket.onopen = function() {
            socket.send(projectid);
            window.console.log('opened');
        }

        socket.onmessage = function(event) {
            addMessage(JSON.parse(event.data));
        };

        socket.onclose = function () {
            socket = null;
        }

        socket.onerror = function (e) {
            window.console.log(e);
        }
    },
    disconnect() {
        socket.close();
    },
    sendMessage(object) {
        socket.send(object);
    }
}