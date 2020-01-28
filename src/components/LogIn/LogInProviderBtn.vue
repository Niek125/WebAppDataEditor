<template>
    <v-row justify="center">
        <v-col cols="8">
            <v-hover v-slot:default="{ btnhover }">
                <v-btn class="grey darken-1" ripple v-on:click="signin()" :elevation="btnhover ? 4:12" width="100%">
                    <v-spacer></v-spacer>
                    <v-col cols="2" class="pa-0"><v-icon>{{icon}}</v-icon></v-col>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    {{text}}
                    <v-spacer></v-spacer>
                </v-btn>
            </v-hover>
        </v-col>
    </v-row>
</template>

<script>
    import TokenService from "../../services/TokenService";
    import * as firebase from "firebase/app";

    const base64url = require('base64url');

    export default {
        name: "LogInProviderBtn",
        props: {
            text: String,
            icon: String,
            provider: Object
        },
        methods: {
            signin: function () {
                var x = this;
                firebase.auth().signInWithPopup(x.provider).then(result => {
                    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
                        x.$session.start();
                        x.$session.set("gtoken", result);
                        TokenService.getToken(idToken, function (token) {
                            x.$session.set("jwt", token);
                            x.$session.set("userdata", JSON.parse(base64url.decode(token.split(".")[1])));
                            x.$router.back();
                        });
                    });
                }).catch(function (error) {
                    window.console.error(error);
                });
            }
        },
    }
</script>
