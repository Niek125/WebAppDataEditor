import EurekaServer from "./EurekaServer";

let socket = null;

let addmessage = null;

let adddata = null;
let deletedata = null;
let editdata = null;

// let addrole = null;
// let deleterole = null;
// let editrole = null;

export default {
    setaddmessage(amessage) {
        addmessage = amessage;
    },
    setadddata(adata) {
        adddata = adata;
    },
    setupdatedata(udata) {
        editdata = udata;
    },
    setdeletedata(ddata) {
        deletedata = ddata;
    },
    // setaddrole(arole) {
    //     addrole = arole;
    // },
    // setupdaterole(urole) {
    //     editrole = urole;
    // },
    // setdeleterole(drole) {
    //     deleterole = drole;
    // },
    connect(projectid, token) {
        if (socket != null) {
            socket.close();
            socket = null;
        }
        EurekaServer.getInstance("update-service").then((url) => {
            socket = new WebSocket("wss://" + url.data + "/project");

            socket.onopen = function () {
                const pay = {
                    interest: projectid,
                    token: token
                }
                socket.send(JSON.stringify(pay));
                window.console.log('opened');
            }

            socket.onmessage = function (event) {
                const split = event.data.split("\n");
                const header = JSON.parse(split[0]);
                const payload = JSON.parse(split[1])
                window.console.log(header);
                window.console.log(payload);
                try {
                    switch (header.payload) {
                        case "message":
                            switch (header.action) {
                                case "CREATE":
                                    addmessage(payload);
                                    break;
                            }
                            break;
                        case "data":
                            switch (header.action) {
                                case "CREATE":
                                    adddata(payload);
                                    break;
                                case "UPDATE":
                                    editdata(payload);
                                    break;
                                case "DELETE":
                                    deletedata(payload);
                                    break;
                            }
                            break;
                        // case "role":
                        //     switch (header.action) {
                        //         case "CREATE":
                        //             addrole(payload);
                        //             break;
                        //         case "UPDATE":
                        //             editrole(payload);
                        //             break;
                        //         case "DELETE":
                        //             deleterole(payload);
                        //             break;
                        //     }
                        //     break;
                    }
                } catch (e) {
                    window.console.log(e);
                }
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