<template>
    <v-row>
        <v-card color="pink" width="80vw">
            <v-col cols="12">
                <v-row>
                    <v-spacer></v-spacer>
                    <v-autocomplete v-model="autocompuser"  v-bind:items="usrslike" label="Email" :search-input.sync="userinpt"
                                    @keyup="getuserslike"></v-autocomplete>
                    <v-spacer></v-spacer>
                </v-row>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-col cols="3">
                        <v-btn color="blue" width="100%" v-on:click="setpopup('')">Close</v-btn>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="3">
                        <v-btn color="green" width="100%" v-on:click="adduser()">Add to project</v-btn>
                    </v-col>
                    <v-spacer></v-spacer>
                </v-row>
            </v-col>
        </v-card>
    </v-row>
</template>

<script>
    import RoleService from "../services/RoleService";

    const uuidv1 = require('uuid/v1');

    export default {
        name: "AddUser",
        data() {
            return {
                userinpt: "",
                usrslike: []
            }
        },
        props: {
            projectid: String,
            setpopup: Function
        },
        methods: {
            getuserslike: function () {
                var x = this;
                RoleService.getuserslike(this.userinpt).then((req) => {
                    x.usrslike = req.data
                });
            },
            adduser: function () {
                RoleService.saverole(uuidv1(), this.projectid, this.autocompuser, "GUEST");
                this.setpopup('');
            }
        }
    }
</script>