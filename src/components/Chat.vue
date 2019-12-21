<template>
    <v-container>
        <v-row id="scroll" style="overflow-y: scroll;">
            <v-col cols="12">
                <ChatMessage v-for="data in chat" v-bind:key="data.messageid"
                             v-bind:content="data.content" v-bind:sendtime="data.sendtime"
                             v-bind:senderid="data.senderid"
                             v-bind:users="users"></ChatMessage>
            </v-col>
        </v-row>
        <v-row>
            <v-spacer></v-spacer>
            <v-col cols="10">
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
    import apptest from "../apptest"

    export default {
        name: "Chat",
        components:{
            ChatMessage
        },
        props:{
            users: Array,
            chat: Array
        },
        data() {
            return {
                input: "",
            }
        },
        created() {
            this.chat = apptest;
        }
    }
</script>