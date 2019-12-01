<template>
    <v-col cols="10" style="padding-top: 0px;">
        <v-card class="lr-m" color="purple">
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
            getusers: Function
        },
        methods: {
            getuser: function () {
                var x = this;
                return this.getusers().find(function (user) {
                    return (user.id).toString() == x.senderid;
                }).name;
            }
        }
    }
</script>