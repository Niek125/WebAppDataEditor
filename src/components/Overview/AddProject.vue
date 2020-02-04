<template>
    <v-dialog v-model="dialog" :overlay-opacity="overlayOpacity" width="60%">
        <template v-slot:activator="{on}">
            <v-hover v-slot:default="{ hover }">
                <v-card v-on="on" class="ml-4 mr-4 pa-2" :class="level3"
                        height="170px" width="150px" :elevation="hover ? 16: 4">
                    <v-row justify="center" align="center">
                        <v-icon class="ma-4" :class="textColor">mdi-plus</v-icon>
                    </v-row>
                    <v-divider :class="divider"></v-divider>
                    <v-row>
                        <v-card-title style="word-break: break-word" :class="textColor">
                            Start new project
                        </v-card-title>
                    </v-row>
                </v-card>
            </v-hover>
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

    const uuidv1 = require('uuid/v1');

    export default {
        name: "AddUser",
        computed: {
            ...mapGetters("theme", {
                overlayOpacity: "overlayOpacity",
                btnAccept: "btnAccept",
                btnDeny: "btnDeny",
                textColor: "textColor",
                dark: "dark",
                divider: 'divider',
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
                ProjectService.addProject({
                    projectid: uuidv1(),
                    projectname: this.name
                }, this.file, this.$session.get("jwt"));
                this.dialog = false;
            }
        }
    }
</script>