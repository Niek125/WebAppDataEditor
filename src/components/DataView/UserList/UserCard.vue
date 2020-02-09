<template>
    <v-dialog v-model="dialog" :overlay-opacity="overlayOpacity" width="50%">
        <template v-slot:activator="{on}">
            <v-hover v-slot:default="{ hover }">
                <v-card class="ma-2 pa-2" :class="hover ? level3 : level2" v-on="on">
                    <v-row class="ma-0">
                        <v-col cols="2" class="pa-0">
                            <v-row justify="center" align="center" class="ma-0">
                                <v-avatar>
                                    <v-img v-bind:src="user.profilePicture"></v-img>
                                </v-avatar>
                            </v-row>
                        </v-col>
                        <v-col cols="10" class="pa-0">
                            <v-row class="ma-0 ml-2">
                                <v-card-text style="padding: 0px;" :class="textColor">{{user.username}}</v-card-text>
                            </v-row>
                            <v-row class="ma-0 ml-2">
                                <v-card-text style="padding: 0px;" :class="textColor">{{user.email}}</v-card-text>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>
            </v-hover>
        </template>
        <v-card :class="level2">
            <v-col cols="12">
                <v-row align="center" justify="center">
                    <v-card-text class="px-0 mx-4" :class="textColor">{{user.userName}}</v-card-text>
                </v-row>
                <v-row align="center" justify="center">
                    <v-card-text class="px-0 mx-4" :class="textColor">{{user.email}}</v-card-text>
                </v-row>
                <v-row align="center" justify="center">
                    <v-select v-model="currentRole" :items="roles" :dark="dark" class="mx-4 my-2" :rules="[(value) => value != null || 'The owner of a dataset cannot change or have multiple']">
                        <template v-slot:item="data">
                            <v-list-item-content v-text="data.item.text" class="black--text">HI</v-list-item-content>
                        </template>
                    </v-select>
                </v-row>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-col cols="3" class="pa-0">
                        <v-btn :class="btnDeny" width="100%" v-on:click="dialog = false">Close</v-btn>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="3" class="pa-0">
                        <v-btn :class="btnAccept" width="100%" v-on:click="editUser">Edit role</v-btn>
                    </v-col>
                    <v-spacer></v-spacer>
                </v-row>
            </v-col>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: 'UserCard',
        props: {
            user: {
                userName: String,
                userId: String,
                email: String,
                profilePicture: String,

            },
            role: {
                roleId: String,
                role: String,
                userId: String,
                projectId: String,
            }
        },
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
                currentRole: {text: "Owner", value: null},
                roles: [
                    {text: "Guest", value: "GUEST"},
                    {text: "Member", value: "MEMBER"},
                    {text: "Admin", value: "ADMIN"},
                    {text: "Owner", value: null}
                ],
            }
        },
        methods: {
            editUser: function () {

            }
        },
    }
</script>