<template>
    <v-row class="ma-0">
        <v-card color="#62787E" width="100%">
            <v-col cols="12">
                <v-row>
                    <v-spacer></v-spacer>
                    <v-col cols="8">
                        <v-card-text>{{userrole.user.username}}</v-card-text>
                    </v-col>
                    <v-spacer></v-spacer>
                </v-row>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-col cols="8">
                        <v-card-text>{{userrole.user.email}}</v-card-text>
                    </v-col>
                    <v-spacer></v-spacer>
                </v-row>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-col cols="8">
                        <v-select
                                v-model="startrole"
                                :items="roles"></v-select>
                    </v-col>
                    <v-spacer></v-spacer>
                </v-row>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-col cols="3">
                        <v-btn class="grey--text text--darken-1" color="#F2ECFF" width="100%" v-on:click="dialog()">Close</v-btn>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="3">
                        <v-btn color="#00C896" width="100%" v-on:click="edituser">Edit role</v-btn>
                    </v-col>
                    <v-spacer></v-spacer>
                </v-row>
            </v-col>
        </v-card>
    </v-row>
</template>

<script>
    import UpdateService from "../../../services/UpdateService";

    export default {
        name: "EditUser",
        props: {
            userrole: Object,
            dialog: Function
        },
        data() {
            return {
                roles: [
                    {text: 'Guest', value: 'GUEST'},
                    {text: 'Member', value: 'MEMBER'},
                    {text: 'Admin', value: 'ADMIN'},
                    {text: 'Owner', value: 'OWNER'}
                ],
                startrole: {}
            }
        },
        methods: {
            edituser: function () {
                this.userrole.role.role = this.startrole;
                const header = {
                    payload: "role",
                    action: "UPDATE"
                }
                const payload = {
                    roleid: this.userrole.role.roleid,
                    userid: this.userrole.user.userid,
                    role: this.startrole.value
                }
                UpdateService.sendMessage(JSON.stringify(header) + "\n" + JSON.stringify(payload))
                this.dialog();
            }
        },
        updated() {
            const x = this;
            this.startrole = this.roles.find(function (role) {
                return role.value == x.userrole.role.role;
            })
        },
        created() {
            const x = this;
            this.startrole = this.roles.find(function (role) {
                return role.value == x.userrole.role.role;
            })
        }
    }
</script>