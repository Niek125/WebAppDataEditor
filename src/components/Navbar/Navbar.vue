<template>
    <v-app-bar class="black" elevate-on-scroll scroll-target="#scrolling-techniques-7">
        <v-row align="center" justify="center">
            <v-col cols="2" class="pa-0">
                <v-card-title class="ml-4">
                    <v-icon class="mr-4">far fa-file-alt</v-icon>
                    DataEditor
                </v-card-title>
            </v-col>
            <v-spacer></v-spacer>
<!--            <v-col cols="4">-->
<!--                <v-autocomplete id="autocomplete" v-model="searchProject"-->
<!--                                v-on:change="redirectProject(searchProject, comp)"-->
<!--                                :items="this.projects" item-text="projectname" item-value="projectid"-->
<!--                                label="Search" outlined dense shaped :hide-details="true" class="grey darken-4 white&#45;&#45;text">-->
<!--                </v-autocomplete>-->
<!--            </v-col>-->
            <v-col cols="3" class="pa-0">
                <v-row justify="end">
                    <v-card-title class="mr-4 pb-0 pt-0">
                        {{this.$session.get("userdata").unm}}
                        <v-avatar class="mr-4 ml-4">
                            <v-img v-on:click="logOut()" v-bind:src="this.$session.get('userdata').pfp"></v-img>
                        </v-avatar>
                    </v-card-title>
                </v-row>
            </v-col>
        </v-row>
    </v-app-bar>
</template>

<script>
    import * as firebase from "firebase";
    import "firebase/auth";
    import ProjectService from "../../services/ProjectService";
    import {redirectProject} from "../../mixins/RedirectProject";

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

            function loadProject() {
                ProjectService.getProjects(x.$session.get("jwt")).then(response => {
                    x.projects = response.data;
                });
                setTimeout(loadProject, (1000 * 60 * 5));
            }
        }
    }
</script>