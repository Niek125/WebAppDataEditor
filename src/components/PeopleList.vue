<template>
    <div style="overflow-y: scroll; height: 100%">
        <v-dialog v-model="adduser" overlay-opacity="0">
            <AddUser v-bind:dialog="closeadd"></AddUser>
        </v-dialog>
        <v-dialog v-model="edituser" overlay-opacity="0">
            <EditUser v-bind:userrole="user" v-bind:dialog="closeedit"></EditUser>
        </v-dialog>
        <v-card color="#707B83" class="lr-m tb-m usercard" v-on:click="adduser = true">
            <v-col cols="12">
                <v-row>
                    <v-container fill-height>
                        <v-col cols="2" align-self="center">
                            <v-icon max-height="32" max-width="32" style="border-radius: 32px;">
                                fas fa-plus
                            </v-icon>
                        </v-col>
                        <v-col cols="10">
                            <v-card-text style="padding: 0px;">Add user</v-card-text>
                        </v-col>
                    </v-container>
                </v-row>
            </v-col>
        </v-card>
        <UserCard v-for="data in userroles"
                  v-bind:key="data.user.userid"
                  v-bind:user="data.user"
                  v-on:click.native="function () {user = data; edituser = true;}"></UserCard>
    </div>
</template>

<script>
    import UserCard from "../components/UserCard";
    import AddUser from "../components/AddUser";
    import EditUser from "../components/EditUser";

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
            closeedit: function()  {
                this.edituser = false;
            },
            closeadd: function()  {
                this.adduser = false;
            }
        }
    }
</script>