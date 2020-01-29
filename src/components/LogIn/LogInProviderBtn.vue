<template>
    <v-row justify="center">
        <v-col cols="8">
            <v-hover v-slot:default="{ btnhover }">
                <v-btn class="grey darken-1" ripple v-on:click="signin()" :elevation="btnhover ? 4:12" width="100%">
                    <v-spacer></v-spacer>
                    <v-col cols="2" class="pa-0">
                        <v-icon>{{icon}}</v-icon>
                    </v-col>
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
                const x = this;

                firebase.auth().signInWithPopup(x.provider).catch(function (error) {
                    window.console.error(error);
                });

                firebase.auth().onIdTokenChanged(
                    function () {
                        if (firebase.auth().currentUser !== null) {
                            firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
                                TokenService.getToken(idToken, function (token) {
                                    x.$session.start();
                                    x.$session.set("jwt", token);
                                    x.$session.set("userdata", JSON.parse(base64url.decode(token.split(".")[1])));
                                    x.$router.back();
                                });
                            })
                        }
                    }
                );

            }
        },
    }
</script>
