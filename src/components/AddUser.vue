<template>
    <v-row class="ma-0">
        <v-card color="#62787E" width="100%">
            <v-col cols="12">
                <v-row>
                    <v-spacer></v-spacer>
                    <v-autocomplete v-model="autocompuser" v-bind:items="usrslike" item-text="email" item-value="userid" label="Email" :search-input.sync="userinpt"
                                    @keyup="getuserslike"></v-autocomplete>
                    <v-spacer></v-spacer>
                </v-row>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-col cols="3">
                        <v-btn class="grey--text text--darken-1" color="#F2ECFF" width="100%" v-on:click="dialog()">Close</v-btn>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="3">
                        <v-btn color="#00C896" class="text--darken-1" width="100%" v-on:click="adduser()">Add to project</v-btn>
                    </v-col>
                    <v-spacer></v-spacer>
                </v-row>
            </v-col>
        </v-card>
    </v-row>
</template>

<script>
    import RoleService from "../services/RoleService";
    import UpdateService from "../services/UpdateService";

    const uuidv1 = require('uuid/v1');

    export default {
        name: "AddUser",
        data() {
            return {
                userinpt: "",
                usrslike: [],
                autocompuser: {}
            }
        },
        props: {
            dialog: Function
        },
        methods: {
            getuserslike: function () {
                var x = this;
                RoleService.getuserslike(this.userinpt).then((req) => {
                    x.usrslike = req.data;
                });
            },
            adduser: function () {
                const header = {
                    payload: "role",
                    action: "CREATE"
                }
                const payload = {
                    roleid: uuidv1(),
                    userid: this.autocompuser,
                    role: "GUEST"
                }
                UpdateService.sendMessage(JSON.stringify(header) + "\n" + JSON.stringify(payload))
                this.dialog();
            }
        }
    }
</script>