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
                            <v-card-title>DataEditor</v-card-title>
                        </v-col>
                        <v-col cols="9"
                               style="display:flex;justify-content:flex-end;align-items:center; min-width: 300px;">
                            <v-autocomplete v-on:change="redirectProject" :items="this.$parent.$parent.appData.projects"
                                            :label="'Search'" clear-icon="" outlined dense shaped
                                            background-color="white" style="height: 40px; max-width: 300px;">
                            </v-autocomplete>
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
                            <project-card v-for="data in this.$parent.$parent.appData.projects"
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
    import ProjectCard from "@/views/ProjectCard";

    export default {
        name: "Overview",
        components: {ProjectCard},
        methods: {
            redirectProject: function (id) {
                this.$router.push({name: 'dataview', params: {projectid: id}})
            }
        }
    }
</script>