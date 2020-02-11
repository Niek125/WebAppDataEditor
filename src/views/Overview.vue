<template>
    <v-container fluid class="pa-0">
        <v-row justify="center" class="ma-0">
            <v-container class="fill-height ma-2" fluid>
                <v-row justify="center" class="ma-0">
                    <v-col cols="11">
                        <v-card class="mr-8 ml-8 mb-4" :class="level2" outlined>
                            <v-row class="pa-4 ma-0">
                                <AddProject></AddProject>
                                <project-card v-for="data in recent" v-bind:key="data.projectid"
                                              v-bind:content="data.projectname" icon="mdi-xml"
                                              v-on:click.native="redirectProject(data.projectid)"></project-card>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col cols="11">
                        <v-card class="mr-8 ml-8 mt-4" :class="level2" outlined v-if="projects.length > 0">
                            <v-card-actions>
                                <v-row class="pa-4">
                                    <project-card v-for="data in projects" :key="data.projectid"
                                                  :content="data.projectname" icon="mdi-xml"
                                                  v-on:click.native="redirectProject(data.projectid)"></project-card>
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
    import {redirectProject} from "../mixins/RedirectProject"

    export default {
        name: "Overview",
        components: {ProjectCard, AddProject},
        mixins: [redirectProject],
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
            }).catch(error => window.console.log(error.response))
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