<template>
    <v-dialog v-model="dialog" :overlay-opacity="overlayOpacity" width="60%">
        <template v-slot:activator="{on}">
            <div v-on="on">
                <ProjectCard icon="mdi-plus" content="Start new project"></ProjectCard>
            </div>
        </template>
        <v-card :class="level2">
            <v-col cols="12">
                <v-row align="center" justify="center">
                    <v-col cols="11">
                        <v-row align="center" justify="center" :class="textColor">
                            Projectname:
                            <v-text-field v-model="name" :dark="dark" class="ml-4"></v-text-field>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row align="center" justify="center">
                    <v-col cols="11">
                        <v-row align="center" justify="center" :class="textColor">
                            File:
                            <v-file-input v-model="file" :dark="dark" accept="application/json"></v-file-input>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row align="center" justify="center">
                    <v-spacer></v-spacer>
                    <v-col cols="5">
                        <v-btn :class="btnDeny" width="100%" v-on:click="dialog = false">
                            cancel
                        </v-btn>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="5">
                        <v-btn :class="btnAccept" width="100%" v-on:click="addProject()">save
                        </v-btn>
                    </v-col>
                    <v-spacer></v-spacer>
                </v-row>
            </v-col>
        </v-card>
    </v-dialog>
</template>

<script>
    import ProjectService from "../../services/ProjectService";
    import {mapGetters} from "vuex";
    import ProjectCard from "./ProjectCard";

    const uuidv1 = require("uuid/v1");

    export default {
        name: "AddProject",
        components: {ProjectCard},
        computed: {
            ...mapGetters("theme", {
                overlayOpacity: "overlayOpacity",
                btnAccept: "btnAccept",
                btnDeny: "btnDeny",
                textColor: "textColor",
                dark: "dark",
                divider: "divider",
                level0: "level0",
                level1: "level1",
                level2: "level2",
                level3: "level3",
            })
        },
        data() {
            return {
                file: null,
                name: "",
                dialog: false
            }
        },
        methods: {
            addProject: function () {
                ProjectService.addProject(
                    {
                    projectid: uuidv1(),
                    projectname: this.name
                }
                , this.file, this.$session.get("jwt"));
                this.dialog = false;
            }
        }
    }
</script>