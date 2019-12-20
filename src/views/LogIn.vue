<template>
    <div class="center-div" style="width: 100%; height: 100%;">
        <v-card height="300" width="300" color="#A993A6">
            <v-card-actions>
                <v-col>
                    <v-row>
                        <v-spacer></v-spacer>
                        <v-card-title class="grey--text text--darken-3">Log in</v-card-title>
                        <v-spacer></v-spacer>
                    </v-row>
                    <v-row>
                        <v-spacer></v-spacer>
                        <v-btn color="#FFAE9A" class="grey--text text--darken-3" v-on:click="signin()">Google</v-btn>
                        <v-spacer></v-spacer>
                    </v-row>
                </v-col>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import TokenService from "../services/TokenService";
    import * as firebase from "firebase/app";
    import "firebase/auth";

    const base64url = require('base64url');

    var firebaseConfig = {
        apiKey: "AIzaSyBKKFYSS81Jmnk2NHsHn46hLidx66PUbKc",
        authDomain: "dataeditor.firebaseapp.com",
        databaseURL: "https://dataeditor.firebaseio.com",
        projectId: "dataeditor",
        storageBucket: "dataeditor.appspot.com",
        messagingSenderId: "783318788893",
        appId: "1:783318788893:web:0ec8e8bd99d3320903cff4",
        measurementId: "G-1JMJBDSRLJ"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    export default {
        name: "LogIn",
        props:{
            sessionSet: Function
        },
        methods:{
            signin: function () {
                var x = this;
                var provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(provider).then(result => {
                    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
                        x.$session.start();
                        x.$session.set("gtoken", result);
                        TokenService.getToken(idToken, function (token) {
                            x.$session.set("jwt", token);
                            x.$session.set("userdata", JSON.parse(base64url.decode(token.split(".")[1])));
                            x.sessionSet();
                        });
                    }).catch(function(error) {
                        window.console.log(error);
                    });
                }).catch(function(error) {
                    var errorCode = error.code;
                    window.console.log(errorCode);
                    var errorMessage = error.message;
                    window.console.log(errorMessage);
                    var email = error.email;
                    window.console.log(email);
                    var credential = error.credential;
                    window.console.log(credential);
                });
            }
        }
    }
</script>