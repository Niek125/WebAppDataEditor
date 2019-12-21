<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card color="#7D7F84" style="margin: 10px; margin-bottom: 0px;" outlined>
                    <v-card-actions class="bcg">
                        <v-row>
                            <v-col cols="2" style="min-width: 155px; max-width: 165px;">
                                <v-hover v-slot:default="{ hover }">
                                    <v-card v-on:click="redirectProject(projectid)" class="lr-m justify-center"
                                            style="height: 150px;" color="#707B83" :elevation="hover ? 16: 8">
                                        <div class="center-div icon-cont">
                                            <v-icon size="30">fas fa-plus</v-icon>
                                        </div>
                                        <v-card-title class="multiline-break"> Start new project</v-card-title>
                                    </v-card>
                                </v-hover>
                            </v-col>
<!--                            <project-card v-for="data in JSON.parse(this.$cookie.get('recent'))"-->
<!--                                          v-bind:key="data.value" v-bind:projectid="data.value"-->
<!--                                          v-bind:content="data.text"></project-card>-->
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card color="#7D7F84" style="margin: 10px;" outlined>
                    <v-card-actions>
                        <v-row>
                            <project-card v-for="data in this.projects"
                                          v-bind:key="data.projectid" v-bind:projectid="data.projectid"
                                          v-bind:content="data.projectname"></project-card>
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

    export default {
        name: "Overview",
        components: {ProjectCard},
        data() {
            return {
                projects: [],
                isloaded: false
            }
        },
        created() {
            ProjectService.getProjects(this.$session.get("jwt")).then(response => {
                this.projects = response.data;
            })
                // eslint-disable-next-line no-console
                .catch(error => console.log(error.response))
        }
    }
</script>