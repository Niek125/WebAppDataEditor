<template>
    <v-row justify="center">
        <v-col cols="8">
            <v-hover v-slot:default="{ hover }">
                <v-card class="py-2 transition-fast-out-slow-in" :class="hover ? textColor + level5 : textColor + level4" v-on:click="signIn()"
                        :elevation="hover ? 12 : 4" width="100%">
                    <v-row class="ma-0" justify="center" align="center">
                        <v-spacer></v-spacer>
                        <v-icon :class="textColor">{{icon}}</v-icon>
                        <v-spacer></v-spacer>
                        {{text}}
                        <v-spacer></v-spacer>
                    </v-row>
                </v-card>
            </v-hover>
        </v-col>
    </v-row>
</template>

<script>
    import TokenService from "../../services/TokenService";
    import * as firebase from "firebase/app";
    import {mapGetters} from "vuex";

    const base64url = require("base64url");


    export default {
        name: "LogInProviderBtn",
        computed: {
            ...mapGetters("theme", {
                textColor: "textColor",
                level4: "level4",
                level5: "level5",
            })
        },
        props: {
            text: String,
            icon: String,
            provider: Object
        },
        methods: {
            signIn: function () {
                const x = this;
                let first = false;

                firebase.auth().signOut().catch();

                firebase.auth().signInWithPopup(x.provider).then(function () {
                    first = true;
                }).catch(function (error) {
                    window.console.error(error);
                });

                firebase.auth().onIdTokenChanged(
                    function () {
                        if (firebase.auth().currentUser !== null) {
                            firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
                                TokenService.getToken(idToken, function (token) {
                                    x.$session.start();
                                    x.$session.set("jwt", token);
                                    x.$session.set("userData", JSON.parse(base64url.decode(token.split(".")[1])));
                                    if (first) {
                                        first = false;
                                        x.$router.back();
                                    }
                                });
                            })
                        }
                    }
                );
            }
        },
    }
</script>
