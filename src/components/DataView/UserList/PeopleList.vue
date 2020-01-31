<template>
    <div>
        <v-dialog v-model="adduser" overlay-opacity="0.8" width="60%">
            <AddUser v-bind:dialog="closeadd"></AddUser>
        </v-dialog>
        <v-dialog v-model="edituser" overlay-opacity="0">
            <EditUser v-bind:userrole="user" v-bind:dialog="closeedit"></EditUser>
        </v-dialog>
            <v-card class="grey darken-3 ma-2" v-on:click="adduser = true">
                <v-row>
                    <v-col cols="2" class="pa-0">
                        <v-row justify="center" align="center">
                            <v-icon class="ma-4">mdi-plus</v-icon>
                        </v-row>
                    </v-col>
                    <v-col cols="10" class="pa-0">
                        <v-card-text>Add user</v-card-text>
                    </v-col>
                </v-row>
            </v-card>
        <UserCard v-for="data in userroles"
                  v-bind:key="data.user.userid"
                  v-bind:user="data.user"
                  v-on:click.native="function () {user = data; edituser = true;}"></UserCard>
    </div>
</template>

<script>
    import UserCard from "./UserCard";
    import AddUser from "./AddUser";
    import EditUser from "./EditUser";

    export default {
        name: "PeopleList",
        components: {
            UserCard,
            AddUser,
            EditUser
        },
        props: {
            userroles: Array
        },
        data() {
            return {
                adduser: false,
                edituser: false,
                user: {}
            }
        },
        methods: {
            closeedit: function () {
                this.edituser = false;
            },
            closeadd: function () {
                this.adduser = false;
            }
        }
    }
</script>