<template>
    <v-row justify="center" align="center">
        <v-col cols="8">
            <v-card class="grey darken-3">
                <v-col cols="12">
                    <v-row align="center" justify="center">
                        <v-col cols="11">
                            <v-row align="center" justify="center">
                                Projectname:
                                <v-text-field v-model="name" dark class="ml-4"></v-text-field>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row align="center" justify="center">
                        <v-col cols="11">
                            <v-row align="center" justify="center">
                                File:
                                <v-file-input v-model="file" accept="application/json"></v-file-input>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row align="center" justify="center">
                        <v-spacer></v-spacer>
                        <v-col cols="5">
                            <v-btn class="red darken-4" width="100%" v-on:click="dialog()">
                                cancel
                            </v-btn>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="5">
                            <v-btn class="green darken-4" width="100%" v-on:click="addproject()">save
                            </v-btn>
                        </v-col>
                        <v-spacer></v-spacer>
                    </v-row>
                </v-col>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import ProjectService from "../../services/ProjectService";

    const uuidv1 = require('uuid/v1');

    export default {
        name: "AddUser",
        props: {
            dialog: Function
        },
        data() {
            return {
                file: null,
                name: ""
            }
        },
        methods: {
            addproject: function () {
                window.console.log(this.file);
                ProjectService.addProject({
                    projectid: uuidv1(),
                    projectname: this.name
                }, this.file, this.$session.get("jwt"));
                this.dialog();
            }
        }
    }
</script>