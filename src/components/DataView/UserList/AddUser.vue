<template>
    <v-dialog v-model="dialog" :overlay-opacity="overlayOpacity" width="50%">
        <template v-slot:activator="{on}">
            <v-hover v-slot:default="{ hover }">
                <v-card class="ma-2 pa-2" :class="hover ? level3 : level2" v-on="on" height="64px">
                    <v-row class="ma-0" align="center">
                        <v-col cols="2" class="pa-0">
                            <v-row class="ma-0" justify="center">
                                <v-icon :class="textColor">mdi-plus</v-icon>
                            </v-row>
                        </v-col>
                        <v-col cols="10" class="pa-0">
                            <v-card-text class="py-3" :class="textColor">Add user</v-card-text>
                        </v-col>
                    </v-row>
                </v-card>
            </v-hover>
        </template>
        <v-card :class="level2">
            <v-row align="center" justify="center" class="ma-0">
                <v-col cols="12" class="pa-0">
                    <v-row class="ma-0" justify="center" align="center">
                        <v-col cols="10">
                            <v-autocomplete v-model="autocompuser" v-bind:items="usrslike" item-text="email"
                                            item-value="userid" :dark="dark"
                                            label="Email" :search-input.sync="userinpt"
                                            @keyup="getuserslike">
                                <template v-slot:item="data">
                                    <v-list-item-content v-text="data.item.email" class="black--text">HI
                                    </v-list-item-content>
                                </template>
                                <template v-slot:no-data>
                                    <v-card-text class="black--text">Start searching</v-card-text>
                                </template>
                            </v-autocomplete>
                        </v-col>
                    </v-row>
                    <v-row class="ma-0">
                        <v-spacer></v-spacer>
                        <v-col cols="5">
                            <v-btn :class="textColor + btnDeny" width="100%" v-on:click="dialog = false">
                                Close
                            </v-btn>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="5">
                            <v-btn :class="textColor + btnAccept" width="100%" v-on:click="adduser()">Add to
                                project
                            </v-btn>
                        </v-col>
                        <v-spacer></v-spacer>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
</template>

<script>
    import RoleService from "../../../services/RoleService";
    import UpdateService from "../../../services/UpdateService";
    import {mapGetters} from "vuex";

    const uuidv1 = require('uuid/v1');

    export default {
        name: "AddUser",
        computed: {
            ...mapGetters("theme", {
                overlayOpacity: "overlayOpacity",
                dark: "dark",
                textColor: "textColor",
                btnDeny: "btnDeny",
                btnAccept: "btnAccept",
                level2: "level2",
                level3: "level3",
            }),
        },
        data() {
            return {
                dialog: false,
                userinpt: "",
                usrslike: [],
                autocompuser: {}
            }
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