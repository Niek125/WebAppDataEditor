<template>
    <div class="center-div" style="width: 100%; height: 100%;">
        <v-card height="300" width="300" color="#5eff81">
            <v-card-actions>
                <v-col>
                    <v-row>
                        <v-spacer></v-spacer>
                        <v-card-title>Log in</v-card-title>
                        <v-spacer></v-spacer>
                    </v-row>
                    <v-row>
                        <v-spacer></v-spacer>
                        <v-btn v-on:click="signin()">Google</v-btn>
                        <v-spacer></v-spacer>
                    </v-row>
                </v-col>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import * as firebase from "firebase/app";
    import "firebase/auth";

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
                var provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(provider).then(result => {
                    this.$session.start();
                    this.$session.set("jwt", result.user.providerData[0]);
                    this.sessionSet();
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