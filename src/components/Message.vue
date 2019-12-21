<template>
    <v-col cols="10" style="padding-top: 0px;">
        <v-card class="lr-m" color="#707B83">
            <v-row style="margin: 0px;">
                <v-card-title class="lr-m tb-m" style="padding: 0px;">{{content}}</v-card-title>
            </v-row>
            <v-row style="margin: 0px;">
                <v-card-subtitle class="lr-m" style="padding: 0px;">{{this.getuser() + ' at ' + sendtime}}
                </v-card-subtitle>
            </v-row>
        </v-card>
    </v-col>
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
                var x = this;
                return this.users.find(function (user) {
                    window.console.log((user.userid).toString() == x.senderid)
                    window.console.log((user.userid).toString() )
                    window.console.log(x.senderid)
                    return (user.userid).toString() == x.senderid;
                }).username;
            }
        }
    }
</script>