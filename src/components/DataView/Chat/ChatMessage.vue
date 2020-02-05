<template>
    <div>
        <v-row v-if="senderid == this.$session.get('userData').uid">
            <v-spacer></v-spacer>
            <v-col cols="10" class="px-2 py-1">
                <Message v-bind:content="this.content" v-bind:sendtime="this.sendtime" v-bind:senderid="this.senderid"
                         v-bind:users="this.users"></Message>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col cols="10" class="px-2 py-1">
                <Message v-bind:content="this.content" v-bind:sendtime="this.sendtime" v-bind:senderid="this.senderid"
                         v-bind:users="this.users"></Message>
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
            sendtime: String,
            senderid: String,
            users: Array
        },
        components: {
            Message
        }
    }
</script>