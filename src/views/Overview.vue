<template>
    <v-container fluid class="pa-0">
        <v-row justify="center" no-gutters>
            <v-container class="fill-height pa-0 ma-0" fluid>
                <v-row justify="center" no-gutters>
                    <v-col cols="11" class="pa-0">
                        <v-card class="mr-8 ml-8 mt-8" :class="level2" outlined>
                            <v-row no-gutters>
                                <AddProject></AddProject>
                                <project-card v-for="data in recent" v-bind:key="data.id"
                                              v-bind:content="data.projectName" icon="mdi-xml"
                                              v-on:click.native="redirectProject(data.id)"></project-card>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row justify="center" no-gutters>
                    <v-col cols="11" class="pa-0">
                        <v-card class="mr-8 ml-8 mt-8" :class="level2" outlined>
                            <v-row no-gutters>
                                <project-card v-for="data in projects" :key="data.id"
                                              :content="data.projectName" icon="mdi-xml"
                                              v-on:click.native="redirectProject(data.id)"></project-card>
                            </v-row>
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
    import {mapGetters} from "vuex";
    import {redirectProject} from "../mixins/RedirectProject"

    export default {
        name: "Overview",
        components: {ProjectCard, AddProject},
        mixins: [redirectProject],
        computed: {
            ...mapGetters("theme", {
                level2: "level2",
            }),
            ...mapGetters("projects", {
                projects: "projects",
            }),
        },
        data() {
            return {
                recent: [],
            }
        },
        async created() {
            // await ProjectService.getProjects(this.$session.get("jwt")).then(response => {
            //     this.projects = response.data;
            // }).catch(error => window.console.log(error.response))
            // const recs = JSON.parse(this.$cookie.get("recent"))
            // this.recent = this.projects.filter(function (x) {
            //     try {
            //         return recs.includes(x.projectid);
            //     } catch (e) {
            //         window.console.log(e);
            //         return false;
            //     }
            // })
        }
    }
</script>