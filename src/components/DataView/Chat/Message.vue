<template>
    <v-hover v-slot:default="{ hover }">
        <v-card class="grey mx-2" :class="hover ? 'darken-2': 'darken-3'">
            <v-row class="ma-0">
                <v-card-text class="px-1 py-0 my-1 body-1">{{content}}</v-card-text>
            </v-row>
            <v-row class="ma-0">
                <v-card-text class="pa-1 caption">{{getuser() + " at " + sendtime}}</v-card-text>
            </v-row>
        </v-card>
    </v-hover>
</template>

<script>
    export default {
        name: "Message",
        props: {
            content: String,
            sendtime: String,
            senderid: String,
            users: Array
        },
        methods: {
            getuser: function () {
                const x = this;
                return this.users.find(function (user) {
                    return (user.userid).toString() == x.senderid;
                }).username;
            }
        }
    }
</script>