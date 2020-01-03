<template>
    <v-container style="padding-bottom: 0px; padding-top: 0px;">
        <v-row id="scroll" class="pa-0" style="overflow-y: scroll; height: calc(100vh - 64px - 84px - 90px - 1px)">
            <v-col cols="12" class="pa-0">
                <ChatMessage v-for="data in chat" v-bind:key="data.messageid"
                             v-bind:content="data.content" v-bind:sendtime="data.sendtime"
                             v-bind:senderid="data.senderid"
                             v-bind:users="users"></ChatMessage>
            </v-col>
        </v-row>
        <v-row>
            <v-spacer></v-spacer>
            <v-col cols="10" class="pa-0">
                <v-text-field v-model="input" @keyup.enter.native="send(input)"
                              color="white" full-width
                              @click:append="send()" counter maxlength="256"
                              placeholder="Message..." outlined filled dense rounded
                              append-icon="fas fa-paper-plane"></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
    </v-container>
</template>

<script>
    import ChatMessage from "../components/ChatMessage";
    import UpdateService from "../services/UpdateService";
    import MessageService from "../services/MessageService";

    const uuidv1 = require('uuid/v1');

    export default {
        name: "Chat",
        components: {
            ChatMessage
        },
        props: {
            users: Array
        },
        data() {
            return {
                input: "",
                chat: [],
                messagedelta: Infinity
            }
        },
        methods: {
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
            const projectid = this.$route.params.projectid;
            await MessageService.getmessages(projectid, token).then((res) => {
                x.chat = res.data;
            })

            const element = document.getElementById("scroll");
            x.updateScroll();
            x.messagedelta = element.scrollTop - element.scrollHeight + 1;

            UpdateService.setaddmessage(x.addmessage);
        }
    }
</script>