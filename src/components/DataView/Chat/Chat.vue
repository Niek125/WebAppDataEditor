<template>
    <v-container class="pa-0">
        <v-sheet tile :height="'calc(' + height + ' - 66px)'" class="transparent chat pl-1">
            <ChatMessage v-for="data in messages" :key="data.id" :content="data.content"
                         :this-user="data.senderid == uid"
                         :send-time="data.sendtime" :sender-name="getUserName(data.userid)"
                         :users="users"></ChatMessage>
        </v-sheet>
        <v-row justify="center" align="center">
            <v-col cols="10" class="pa-0">
                <v-text-field v-model="input" @keyup.enter.native="send" full-width class="my-3"
                              @click:append="send" counter maxlength="256" :dark="dark"
                              label="Message..." outlined dense rounded hide-details
                              append-icon="mdi-send"></v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
    .chat {
        overflow-y: auto;
        overflow-x: hidden;
    }

    .chat::-webkit-scrollbar {
        width: 16px;
        background-color: transparent;
    }

    .chat::-webkit-scrollbar-corner {
        display: none;
    }

    .chat::-webkit-scrollbar-track {
        display: none;
    }

    .chat::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: grey;
    }
</style>

<script>
    import ChatMessage from "./ChatMessage";
    import UpdateService from "../../../services/UpdateService";
    import {mapGetters} from "vuex";

    const uuidv1 = require("uuid/v1");

    export default {
        name: "Chat",
        computed: {
            ...mapGetters("theme", {
                textColor: "textColor",
                dark: "dark",
                level0: "level0",
                level1: "level1",
            }),
            ...mapGetters("dataView", {
                height: "height",
                sideTabWidth: "sideTabWidth",
            }),
            ...mapGetters("project", {
                messages: "messages",
                users: "users",
            }),
        },
        components: {
            ChatMessage
        },
        data() {
            return {
                uid: "XXX",
                input: "",
                messageDelta: Infinity
            }
        },
        methods: {
            getUserName: function (senderId) {
                try {
                    return this.users.find(function (user) {
                        return (user.userid).toString() == senderId;
                    }).username;
                } catch (e) {
                    return "removed user";
                }
            },
            send: function () {
                if (this.input.length > 0) {
                    const message = {
                        content: this.input,
                        messageid: uuidv1()
                    };
                    const options = {
                        payload: "message",
                        action: "CREATE"
                    };
                    UpdateService.sendMessage(JSON.stringify(options) + "\n" + JSON.stringify(message));
                    this.input = "";
                }
            },
            addmessage: function (message) {
                const x = this;
                const element = document.getElementById("scroll");
                const scroll = (element.scrollTop - element.scrollHeight) >= this.messagedelta;
                x.messageDelta = element.scrollTop - element.scrollHeight - 1;
                x.chat.push(message);
                if (scroll) {
                    setTimeout(function () {
                        x.updateScroll()
                    }, 50);
                }
            },
            updateScroll: function () {
                const element = document.getElementById("scroll");
                element.scrollTop = element.scrollHeight;
            }
        },
        created() {
            try {
                this.uid = this.$session.get('userData').uid;
            } catch (e) {
                alert("There is no session");
            }
            // const x = this;
            // const token = x.$session.get("jwt");
            // const projectId = x.$route.params.projectId;
            // await RoleService.getusers(projectId, token).then((request) => {
            //     x.users = request.data.map(x => x.user);
            // })
            // await MessageService.getmessages(projectId, token).then((res) => {
            //     x.chat = res.data;
            // })
            //
            // const element = document.getElementById("scroll");
            // x.updateScroll();
            // x.messageDelta = element.scrollTop - element.scrollHeight - 1;
            //
            // UpdateService.setaddmessage(x.addmessage);
        }
    }
</script>