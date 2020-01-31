<template>
    <v-container fluid class="pa-0 fill-height">
        <v-row justify="center" align="center">
            <v-col cols="3">
                <v-hover v-slot:default="{ hover }">
                    <v-card :elevation="hover ? 16: 4" class="grey darken-3">
                        <v-toolbar flat class="black">
                            <v-toolbar-title>Log in</v-toolbar-title>
                        </v-toolbar>
                        <v-card-actions>
                            <v-col class="pa-0">
                                <log-in-provider-btn v-for="provider in providers" v-bind:text="provider.text"
                                                     v-bind:icon="provider.icon" v-bind:key="provider.text"
                                                     v-bind:provider="provider.provider"></log-in-provider-btn>
                            </v-col>
                        </v-card-actions>
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import LogInProviderBtn from "../components/LogIn/LogInProviderBtn";
    import * as firebase from "firebase/app";
    import "firebase/auth";

    const firebaseConfig = {
        apiKey: "AIzaSyBKKFYSS81Jmnk2NHsHn46hLidx66PUbKc",
        authDomain: "dataeditor.firebaseapp.com",
        databaseURL: "https://dataeditor.firebaseio.com",
        projectId: "dataeditor",
        storageBucket: "dataeditor.appspot.com",
        messagingSenderId: "783318788893",
        appId: "1:783318788893:web:0ec8e8bd99d3320903cff4",
        measurementId: "G-1JMJBDSRLJ"
    };
    firebase.initializeApp(firebaseConfig);

    export default {
        name: "LogIn",
        components: {LogInProviderBtn},
        props: {
            sessionSet: Function
        },
        data() {
            return {
                providers: []
            }
        },
        created() {
            this.providers = [{text: "Google", icon: "fab fa-google", provider: new firebase.auth.GoogleAuthProvider()}]
        }
    }
</script>