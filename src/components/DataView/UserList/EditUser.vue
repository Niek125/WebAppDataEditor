<template>
    <v-card class="grey darken-3">
        <v-row align="center" justify="center">
            <v-col cols="8">
                <v-card-text class="px-0">{{userrole.user.username}}</v-card-text>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="8">
                <v-card-text class="px-0">{{userrole.user.email}}</v-card-text>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="8">
                <v-select v-model="startrole" :items="roles">
                    <template v-slot:item="data">
                        <v-list-item-content v-text="data.item.text" class="black--text">HI</v-list-item-content>
                    </template>
                </v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-spacer></v-spacer>
            <v-col cols="3">
                <v-btn class="red darken-4" width="100%" v-on:click="dialog()">Close
                </v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="3">
                <v-btn class="green darken-4" width="100%" v-on:click="edituser">Edit role</v-btn>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
    </v-card>
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
                    {text: 'Owner', value: null}
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