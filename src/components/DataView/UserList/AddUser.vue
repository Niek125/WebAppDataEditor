<template>
    <v-card class="grey darken-3">
        <v-row align="center" justify="center" class="ma-0">
            <v-col cols="12" class="pa-0">
                <v-row class="ma-0" justify="center" align="center">
                    <v-col cols="10">
                        <v-autocomplete v-model="autocompuser" v-bind:items="usrslike" item-text="email"
                                        item-value="userid"
                                        label="Email" :search-input.sync="userinpt"
                                        @keyup="getuserslike">
                            <template v-slot:item="data">
                                <v-list-item-content v-text="data.item.email" class="black--text">HI</v-list-item-content>
                            </template>
                            <template v-slot:no-data>
                                <v-card-text class="black--text">Start searching</v-card-text>
                            </template>
                        </v-autocomplete>
                    </v-col>
                </v-row>
                <v-row class="ma-0">
                    <v-spacer></v-spacer>
                    <v-col cols="3">
                        <v-btn class="red darken-4" width="100%" v-on:click="dialog()">
                            Close
                        </v-btn>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="3">
                        <v-btn class="green darken-4" width="100%" v-on:click="adduser()">Add to
                            project
                        </v-btn>
                    </v-col>
                    <v-spacer></v-spacer>
                </v-row>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    import RoleService from "../../../services/RoleService";
    import UpdateService from "../../../services/UpdateService";

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
                RoleService.getuserslike(this.userinpt, this.$session.get("jwt")).then((req) => {
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