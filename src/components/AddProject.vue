<template>
    <v-card color="#62787E">
        <v-card-actions>
            <v-col cols="12">
                <v-row>
                    <v-spacer></v-spacer>
                    <v-col cols="11">
                        <v-text-field v-model="name" placeholder="Projectname"></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                </v-row>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-col cols="11">
                        <v-file-input v-model="file" accept="application/json"></v-file-input>
                    </v-col>
                    <v-spacer></v-spacer>
                </v-row>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-col cols="5">
                        <v-btn class="grey--text text--darken-1" color="#F2ECFF" width="100%" v-on:click="dialog()">cancel</v-btn>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="5">
                        <v-btn color="#00C896" class="text--darken-1" width="100%" v-on:click="addproject()">save</v-btn>
                    </v-col>
                    <v-spacer></v-spacer>
                </v-row>
            </v-col>
        </v-card-actions>
    </v-card>
</template>

<script>
    import ProjectService from "../services/ProjectService";

    const uuidv1 = require('uuid/v1');

    export default {
        name: "AddUser",
        props:{
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
                ProjectService.addProject({projectid: uuidv1(), projectname: this.name}, this.file, this.$session.get("jwt"));
                this.dialog();
            }
        }
    }
</script>