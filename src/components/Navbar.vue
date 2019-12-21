<template>
    <v-app-bar color="#A993A6" elevate-on-scroll scroll-target="#scrolling-techniques-7">
        <v-container fluid>
            <v-row align="center" justify="center">
                <v-col cols="12">
                    <v-card-actions>
                        <v-col cols="3">
                            <v-row>
                                <v-icon>far fa-file-alt</v-icon>
                                <v-card-title>DataEditor</v-card-title>
                            </v-row>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="4">
                            <v-autocomplete v-model="searchProject" v-on:change="redirectProject(searchProject, comp)"
                                            :items="this.projects" item-text="projectname" item-value="projectid"
                                            :label="'Search'" outlined dense shaped
                                            background-color="#A993A6" :hide-details="true">
                            </v-autocomplete>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="3">
                            <v-row align="center">
                                <v-card-title>{{this.$session.get("userdata").unm}}</v-card-title>
                                <v-spacer></v-spacer>
                                <v-img v-on:click="logOut()" v-bind:src="this.$session.get('userdata').pfp"
                                       max-height="32"
                                       max-width="32" style="border-radius: 32px;"></v-img>
                            </v-row>
                        </v-col>
                    </v-card-actions>
                </v-col>
            </v-row>
        </v-container>

    </v-app-bar>
</template>

<script>
    import * as firebase from "firebase";
    import "firebase/auth";
    import ProjectService from "../services/ProjectService";
    import {redirectProject} from "../mixins/RedirectProject";

    export default {
        name: "Navbar",
        methods: {
            logOut: function () {
                this.$session.destroy();
                firebase.auth().signOut().then(function () {
                }).catch(function (error) {
                    window.console.log(error);
                });
                location.reload();
            }
        },
        mixins: [redirectProject],
        data() {
            return {
                projects: [],
                comp: this,
                searchProject: ""
            }
        },
        created() {
            const x = this;

            loadProject();

            function loadProject () {
                ProjectService.getProjects(x.$session.get("jwt")).then(response => {
                    x.projects = response.data;
                });
                setTimeout(loadProject, (1000 * 60 * 5));
            }
        }
    }
</script>