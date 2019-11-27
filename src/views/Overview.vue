<template>
    <div>
        <v-app-bar color="#5eff81">
            <v-row>
                <v-col cols="12">
                    <v-card-actions>
                        <v-col cols="1" style="min-width: 40px; max-width: 60px;">
                            <div class="center-div">
                                <v-icon>far fa-file-alt</v-icon>
                            </div>
                        </v-col>
                        <v-col cols="2" style="min-width: 185px;">
                            <v-card-title>DataEditor</v-card-title>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="4"
                               style="min-width: 300px;">
                            <v-autocomplete v-on:change="redirectProject" :items="this.projects"
                                            :label="'Search'" outlined dense shaped
                                            background-color="white" style="height: 40px; max-width: 300px;">
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="3" style="max-width: 200px;">
                                <v-card-title>{{this.$session.get("jwt").displayName}}</v-card-title>
                        </v-col>
                        <v-col cols="1" style="max-width: 56px;">
                            <v-img v-on:click="logOut()" v-bind:src="this.$session.get('jwt').photoURL" max-height="32" max-width="32" style="border-radius: 32px;"></v-img>
                        </v-col>
                    </v-card-actions>
                </v-col>
            </v-row>
        </v-app-bar>
        <v-row>
            <v-col cols="12">
                <v-card color="#5eff81" class="lr-m">
                    <v-card-actions class="bcg">
                        <v-row>
                            <v-col cols="2" style="min-width: 155px; max-width: 165px;">
                                <v-card v-on:click="redirectProject(projectid)" class="lr-m justify-center"
                                        style="height: 150px;" color="#5e96ff">
                                    <div class="center-div icon-cont">
                                        <v-icon size="30">fas fa-plus</v-icon>
                                    </div>
                                    <v-card-title class="multiline-break"> Start new project</v-card-title>
                                </v-card>
                            </v-col>
                            <project-card v-for="data in JSON.parse(this.$cookie.get('recent'))"
                                          v-bind:key="data.value" v-bind:projectid="data.value"
                                          v-bind:content="data.text" v-bind:redirect="redirectProject"></project-card>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card color="#5eff81" class="lr-m">
                    <v-card-actions>
                        <v-row>
                            <project-card v-for="data in this.projects"
                                          v-bind:key="data.value" v-bind:projectid="data.value"
                                          v-bind:content="data.text" v-bind:redirect="redirectProject"></project-card>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import ProjectCard from '../components/ProjectCard';
    import ProjectService from "../services/ProjectService";
    import * as firebase from "firebase";
    import "firebase/auth";

    export default {
        name: "Overview",
        components: {ProjectCard},
        methods: {
            redirectProject: function (id) {
                this.$router.push({name: 'dataview', params: {projectid: id}});
                let cookie = JSON.parse(this.$cookie.get('recent'));
                if (cookie != null) {
                    for (let i = 0; i < cookie.length; i++) {
                        if ((new String(cookie[i].value).valueOf() == new String(id).valueOf()) || (i > 3)) {
                            cookie.splice(i, 1);
                            i--;
                        }
                    }
                    cookie.unshift(this.projects.find(x => x.value == id))
                    this.$cookie.set('recent', JSON.stringify(cookie), {expires: '1M'});
                }
            },
            logOut: function () {
                this.$session.destroy();
                firebase.auth().signOut().then(function () {
                }).catch(function (error) {
                    window.console.log(error);
                });
            }
        },
        data() {
            return {
                projects: null,
                isloaded: false
            }
        },
        created() {
            ProjectService.getProjects().then(response => {
                this.projects = response.data;
            })
                // eslint-disable-next-line no-console
                .catch(error => console.log("Oops something went wrong: " + error.response))
        }
    }
</script>