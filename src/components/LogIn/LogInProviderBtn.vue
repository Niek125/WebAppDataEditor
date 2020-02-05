<template>
    <v-row justify="center">
        <v-col cols="8">
            <v-hover v-slot:default="{ btnHover }">
                <v-btn :class="textColor + level4" ripple v-on:click="signIn()" :elevation="btnHover ? 4:12" width="100%">
                    <v-spacer></v-spacer>
                    <v-col cols="2" class="pa-0">
                        <v-icon :class="textColor">{{icon}}</v-icon>
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
    import {mapGetters} from "vuex";

    const base64url = require("base64url");


    export default {
        name: "LogInProviderBtn",
        computed: {
            ...mapGetters("theme", {
                textColor: "textColor",
                level4: "level4",
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
                            firebase.auth().currentUser.getIdToken( true).then(function (idToken) {
                                TokenService.getToken(idToken, function (token) {
                                    x.$session.start();
                                    x.$session.set("jwt", token);
                                    x.$session.set("userData", JSON.parse(base64url.decode(token.split(".")[1])));
                                    if(first){
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
