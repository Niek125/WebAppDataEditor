<template>
    <v-card class="grey darken-3">
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
                    <v-btn class="red darken-4" width="100%" v-on:click="dialog()">
                        cancel
                    </v-btn>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="5">
                    <v-btn class="green darken-4" width="100%" v-on:click="addProject()">save
                    </v-btn>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>
        </v-col>
    </v-card>
</template>

<script>
    import ProjectService from "../../services/ProjectService";
    import {mapGetters} from "vuex";

    const uuidv1 = require('uuid/v1');

    export default {
        name: "AddUser",
        computed: {
            ...mapGetters("theme", {
                textColor: 'textColor',
                dark: 'dark',
                level0: 'level0',
                level1: 'level1',
            })
        },
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
            addProject: function () {
                ProjectService.addProject({
                    projectid: uuidv1(),
                    projectname: this.name
                }, this.file, this.$session.get("jwt"));
                this.dialog();
            }
        }
    }
</script>