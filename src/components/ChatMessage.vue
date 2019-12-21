<template>
    <div>
        <v-row v-if="senderid == this.$session.get('userdata').uid">
            <v-spacer></v-spacer>
            <Message v-bind:content="this.content" v-bind:sendtime="this.sendtime" v-bind:senderid="this.senderid"
                     v-bind:users="this.users"></Message>
        </v-row>
        <v-row v-else>
            <Message v-bind:content="this.content" v-bind:sendtime="this.sendtime" v-bind:senderid="this.senderid"
                     v-bind:users="this.users"></Message>
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
            sendtime: String,
            senderid: String,
            users: Array
        },
        components: {
            Message
        }
    }
</script>