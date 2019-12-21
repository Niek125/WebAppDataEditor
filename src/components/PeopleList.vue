<template>
    <div style="overflow-y: scroll; height: 100%">
        <v-overlay v-if="popup == 'adduser'" opacity="0">
            <AddUser v-bind:projectid="projectid" :setpopup="setpopup"></AddUser>
        </v-overlay>
        <v-overlay v-else-if="popup == 'edituser'" opacity="0">
            <EditUser v-bind:userrole="edituser" :setpopup="setpopup"></EditUser>
        </v-overlay>
        <v-card color="#707B83" class="lr-m tb-m usercard" v-on:click="setpopup('adduser')">
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
                  v-on:click.native="function () {edituser = data; setpopup('edituser');}"></UserCard>
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
                popup: ""
            }
        },
        methods: {
            setpopup: function (state) {
                this.popup = state;
            }
        }
    }
</script>