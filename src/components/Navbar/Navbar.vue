<template>
    <v-app-bar class="black" elevate-on-scroll scroll-target="#app-scroll">
        <v-row align="center" justify="center">
            <v-col cols="2" class="pa-0">
                <v-card-title class="ml-4" v-on:click="toOverview()">
                    <v-icon class="mr-4">mdi-file-document-edit-outline</v-icon>
                    DataEditor
                </v-card-title>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="4">
                <v-autocomplete :items="this.projects" item-text="projectname" label="Search" outlined dense shaped
                                :hide-details="true" class="grey darken-4 white--text">
                    <template v-slot:item="data">
                        <v-list-item-content v-text="data.item.projectname" class="black--text"
                                             v-on:click="redirectProject(data.item.projectid, comp)"></v-list-item-content>
                    </template>
                </v-autocomplete>
            </v-col>
            <v-col cols="3" class="pa-0">
                <v-row justify="end">
                    <v-card-title v-on:click="logOut()" class="mr-4 pb-0 pt-0">
                        {{comp.$session.get("userdata").unm}}
                        <v-avatar class="mr-4 ml-4">
                            <v-img v-bind:src="comp.$session.get('userdata').pfp"></v-img>
                        </v-avatar>
                    </v-card-title>
                </v-row>
            </v-col>
        </v-row>
    </v-app-bar>
</template>

<style>
    .v-tooltip__content {
        background-color: #9e9e9e !important;
    }
</style>

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
            },
            toOverview: function () {
                if (this.$route.name === 'overview') {
                    location.reload();
                } else {
                    this.$router.push('/overview')
                }
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
                setTimeout(loadProject, (1000 * 60 * 60));
            }
        }
    }
</script>