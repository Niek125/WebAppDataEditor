<template>
    <v-container fluid class="pa-0">
        <v-dialog v-model="dialog" overlay-opacity="0.8">
            <AddProject v-bind:dialog="closedialog"></AddProject>
        </v-dialog>
        <v-row justify="center">
            <v-container class="fill-height ma-2" fluid>
                <v-row justify="center">
                    <v-col cols="11">
                        <v-card class="grey darken-3 mr-8 ml-8 mb-4" outlined>
                            <v-row class="pa-4">
                                <v-hover v-slot:default="{ hover }">
                                    <v-card v-on:click="dialog = true" class="grey darken-2 ml-4 mr-4 pa-2"
                                            height="170px" width="150px"
                                            :elevation="hover ? 16: 4">
                                        <v-row justify="center" align="center">
                                            <v-icon class="ma-4">mdi-plus</v-icon>
                                        </v-row>
                                        <v-divider class="white"></v-divider>
                                        <v-row>
                                            <v-card-title style="word-break: break-word">Start new project
                                            </v-card-title>
                                        </v-row>
                                    </v-card>
                                </v-hover>
                                <project-card v-for="data in recent"
                                              v-bind:key="data.projectid" v-bind:projectid="data.projectid"
                                              v-bind:content="data.projectname"></project-card>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col cols="11">
                        <v-card class="grey darken-3 mr-8 ml-8 mt-4" outlined>
                            <v-card-actions>
                                <v-row class="pa-4">
                                    <project-card v-for="data in this.projects"
                                                  v-bind:key="data.projectid" v-bind:projectid="data.projectid"
                                                  v-bind:content="data.projectname"></project-card>
                                </v-row>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-row>
    </v-container>
</template>

<script>
    import ProjectCard from '../components/Overview/ProjectCard';
    import AddProject from "../components/Overview/AddProject";
    import ProjectService from "../services/ProjectService";

    export default {
        name: "Overview",
        components: {ProjectCard, AddProject},
        data() {
            return {
                projects: [],
                dialog: false,
                recent: []
            }
        },
        methods: {
            closedialog: function () {
                this.dialog = false;
            }
        },
        async created() {
            await ProjectService.getProjects(this.$session.get("jwt")).then(response => {
                this.projects = response.data;
            })
                // eslint-disable-next-line no-console
                .catch(error => console.log(error.response))
            const recs = JSON.parse(this.$cookie.get('recent'))
            this.recent = this.projects.filter(function (x) {
                try {
                    return recs.includes(x.projectid);
                } catch (e) {
                    window.console.log(e);
                    return false;
                }
            })
        }
    }
</script>