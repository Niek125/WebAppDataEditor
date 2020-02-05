<template>
    <v-container fluid class="pa-0">
        <v-row justify="center">
            <v-container class="fill-height ma-2" fluid>
                <v-row justify="center">
                    <v-col cols="11">
                        <v-card class="mr-8 ml-8 mb-4" :class="level2" outlined>
                            <v-row class="pa-4">
                                <AddProject></AddProject>
                                <project-card v-for="data in recent" v-bind:key="data.projectid"
                                              v-bind:projectid="data.projectid"
                                              v-bind:content="data.projectname"></project-card>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col cols="11">
                        <v-card class="mr-8 ml-8 mt-4" :class="level2" outlined v-if="projects.length > 0">
                            <v-card-actions>
                                <v-row class="pa-4">
                                    <project-card v-for="data in projects" v-bind:key="data.projectid"
                                                  v-bind:projectid="data.projectid"
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
    import ProjectCard from "../components/Overview/ProjectCard";
    import AddProject from "../components/Overview/AddProject";
    import ProjectService from "../services/ProjectService";
    import {mapGetters} from "vuex";

    export default {
        name: "Overview",
        components: {ProjectCard, AddProject},
        computed: {
            ...mapGetters("theme", {
                level2: "level2",
            })
        },
        data() {
            return {
                projects: [],
                recent: []
            }
        },
        async created() {
            await ProjectService.getProjects(this.$session.get("jwt")).then(response => {
                this.projects = response.data;
            })
                // eslint-disable-next-line no-console
                .catch(error => console.log(error.response))
            const recs = JSON.parse(this.$cookie.get("recent"))
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