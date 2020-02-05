<template>
    <v-container class="pa-0">
        <v-sheet id="scroll" tile height="calc(100vh - 64px - 66px)" class="transparent">
            <v-col cols="12" class="pa-0">
                <ChatMessage v-for="data in chat" :key="data.messageid" :content="data.content" :this-user="data.senderid == uid"
                             :send-time="data.sendtime" :sender-name="getUserName(data.senderid)" :users="users"></ChatMessage>
            </v-col>
        </v-sheet>
        <v-row justify="center">
            <v-col cols="10" class="pa-0">
                <v-text-field v-model="input" @keyup.enter.native="send(input)" full-width
                              @click:append="send()" counter maxlength="256" :dark="dark"
                              label="Message..." outlined filled dense rounded
                              append-icon="fas fa-paper-plane"></v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import ChatMessage from "./ChatMessage";
    import UpdateService from "../../../services/UpdateService";
    import MessageService from "../../../services/MessageService";
    import RoleService from "../../../services/RoleService";
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
            })
        },
        components: {
            ChatMessage
        },
        props: {
            users: Array
        },
        data() {
            return {
                uid: this.$session.get('userData').uid,
                input: "",
                chat: [],
                messagedelta: Infinity
            }
        },
        methods: {
            getUserName: function (senderid) {
                return this.users.find(function (user) {
                    return (user.userid).toString() == senderid;
                }).username;
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
                x.messagedelta = element.scrollTop - element.scrollHeight - 1;
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
        async created() {
            const x = this;
            const token = this.$session.get("jwt");
            const projectId = this.$route.params.projectId;
            await RoleService.getusers(projectId, token).then((request) => {
                x.users = request.data.map(x => x.user);
            })
            await MessageService.getmessages(projectId, token).then((res) => {
                x.chat = res.data;
            })

            const element = document.getElementById("scroll");
            x.updateScroll();
            x.messagedelta = element.scrollTop - element.scrollHeight - 1;

            UpdateService.setaddmessage(x.addmessage);
        }
    }
</script>