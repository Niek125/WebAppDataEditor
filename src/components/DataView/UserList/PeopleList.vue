<template>
    <div>
        <v-dialog v-model="adduser" overlay-opacity="0.8" width="60%">
            <AddUser v-bind:dialog="closeadd"></AddUser>
        </v-dialog>
        <v-dialog v-model="edituser" overlay-opacity="0.8" width="60%">
            <EditUser v-bind:userrole="user" v-bind:dialog="closeedit"></EditUser>
        </v-dialog>
        <v-hover v-slot:default="{ hover }">
            <v-card class="grey ma-2 pa-2" :class="hover ? 'darken-2' : 'darken-3'" v-on:click="adduser = true">
                <v-row class="ma-0">
                    <v-col cols="2" class="pa-0">
                        <v-row justify="center" align="center" class="ma-0">
                            <v-icon class="ma-3">mdi-plus</v-icon>
                        </v-row>
                    </v-col>
                    <v-col cols="10" class="pa-0">
                        <v-card-text class="mx-3">Add user</v-card-text>
                    </v-col>
                </v-row>
            </v-card>
        </v-hover>
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
    import RoleService from "../../../services/RoleService";

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
        },
        async created() {
            const x = this;
            const token = this.$session.get("jwt");
            const projectid = this.$route.params.projectid;
            await RoleService.getusers(projectid, token).then((request) => {
                x.userroles = request.data;
            })
        }
    }
</script>