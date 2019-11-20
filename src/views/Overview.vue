<template>
    <div>
        <v-app-bar color="#5eff81">
            <v-row>
                <v-col cols="12">
                    <v-card-actions>
                        <v-col cols="1" style="min-width: 40px;">
                            <div class="center-div">
                                <v-icon>far fa-file-alt</v-icon>
                            </div>
                        </v-col>
                        <v-col cols="2" style="min-width: 185px;">
                            <v-card-title class="title-width">DataEditor</v-card-title>
                        </v-col>
                        <v-col cols="9"
                               style="display:flex;justify-content:flex-end;align-items:center; min-width: 300px;">
                            <v-btn v-on:click="search()" icon class="lr-m">
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>
                            <v-text-field background-color="white" style="height: 35px; max-width: 250px;">Search...
                            </v-text-field>
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
                            <project-card v-for="data in this.$parent.$parent.appData.recent"
                                          v-bind:key="data.projectid" v-bind:projectid="data.projectid"
                                          v-bind:content="data.content"></project-card>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card color="#5eff81" class="lr-m">
                    <v-card-actions>
                        <v-row>
                            <project-card v-for="data in this.$parent.$parent.appData.projects"
                                          v-bind:key="data.projectid"
                                          v-bind:projectid="data.projectid"
                                          v-bind:content="data.content"></project-card>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import ProjectCard from "@/views/ProjectCard";

    export default {
        name: "Overview",
        components: {ProjectCard},
        methods: {
            search: function () {
                this.$parent.$parent.appData.recent.push({projectid: "id19", content: "works"})
                window.console.log(this.$parent.$parent.appData.recent)
            }
        }
    }
</script>