<template>
    <v-col cols="10" style="padding-top: 0px;">
        <v-card class="lr-m message" color="#707B83">
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

<style scoped>
    .message:hover{
        background-color: #62787E !important;
    }
</style>

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
                    return (user.userid).toString() == x.senderid;
                }).username;
            }
        }
    }
</script>