<template>
    <div>
        <v-row v-if="thisUser">
            <v-spacer></v-spacer>
            <v-col cols="10" class="px-2 py-1">
                <Message v-bind:content="this.content" v-bind:send-time="sendTime" v-bind:sender-name="senderName"></Message>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col cols="10" class="px-2 py-1">
                <Message v-bind:content="this.content" v-bind:send-time="sendTime" v-bind:sender-name="senderName"></Message>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
    </div>
</template>

<script>
    import Message from "./Message";

    export default {
        name: "ChatMessage",
        props: {
            content: String,
            sendTime: String,
            senderName: String,
            thisUser: Boolean
        },
        components: {
            Message
        }
    }
</script>