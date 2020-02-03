<template>
    <v-app-bar class="black" elevate-on-scroll scroll-target="#app-scroll">
        <v-row align="center" justify="center">
            <v-col cols="2" class="pa-0">
                <v-card-title v-on:click="toOverview()">
                    <v-icon class="mr-4">mdi-file-document-edit-outline</v-icon>
                    DataEditor
                </v-card-title>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="4">
                <v-autocomplete :items="projects" item-text="projectname" label="Search" outlined dense shaped
                                :hide-details="true" class="grey darken-4 white--text">
                    <template v-slot:item="data">
                        <v-list-item-content v-text="data.item.projectname" class="black--text"
                                             v-on:click="redirectProject(data.item.projectid, comp)"></v-list-item-content>
                    </template>
                    <template v-slot:no-data>
                        <v-card-text class="black--text">Start searching</v-card-text>
                    </template>
                </v-autocomplete>
            </v-col>
            <v-col cols="3" class="pa-0">
                <v-row justify="end">
                    <v-card-title v-on:click="logOut()" class="py-0">
                        {{uname}}
                        <v-avatar class="mr-4 ml-4">
                            <v-img v-bind:src="pfp"></v-img>
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
    // import ProjectService from "../../services/ProjectService";
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
                searchProject: "",
                uname: "Not Found",
                pfp: "https://pbs.twimg.com/profile_images/1008735104070381570/WbceqBkX_400x400.jpg"
            }
        },
        created() {
            // const x = this;
            //
            // loadProject();
            //
            // function loadProject() {
            //     ProjectService.getProjects(x.$session.get("jwt")).then(response => {
            //         x.projects = response.data;
            //     });
            //     setTimeout(loadProject, (1000 * 60 * 60));
            // }

            this.uname = this.$session.get("userdata").unm;
            this.pfp = this.$session.get('userdata').pfp;
        }
    }
</script>