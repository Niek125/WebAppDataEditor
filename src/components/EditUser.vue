<template>
    <v-row>
        <v-card color="cyan" width="80vw">
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
                        <v-btn color="blue" width="100%" v-on:click="setpopup('')">Close</v-btn>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="3">
                        <v-btn color="green" width="100%" v-on:click="edituser">Edit role</v-btn>
                    </v-col>
                    <v-spacer></v-spacer>
                </v-row>
            </v-col>
        </v-card>
    </v-row>
</template>

<script>
    import RoleService from "../services/RoleService";

    export default {
        name: "EditUser",
        props: {
            userrole: Object,
            setpopup: Function
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
                RoleService.updaterole(this.userrole.role);
                this.setpopup('');
            }
        },
        created() {
            const x = this;
            this.startrole = this.roles.find(function (role) {
                return role.value == x.userrole.role.role;
            })
        }
    }
</script>