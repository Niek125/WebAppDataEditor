<template>
    <v-app-bar :class="level0" elevate-on-scroll scroll-target="#app-scroll" class="navigationBarDataEditor" tile>
        <v-row align="center" justify="center" class="ma-0">
            <v-col cols="2" class="pa-0">
                <v-card-title :class="textColor" v-on:click="toOverview()">
                    <v-icon class="mx-4" :class="textColor">mdi-file-document-edit-outline</v-icon>
                    DataEditor
                </v-card-title>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="4">
                <v-autocomplete :items="projects" item-text="projectName" dense shaped outlined
                                :hide-details="true" :class="level1" :dark="dark"
                                style="outline: transparent !important;">
                    <template v-slot:label>
                        <div :class="textColor" class="mx-2">Search</div>
                    </template>
                    <template v-slot:item="data">
                        <v-list-item-content v-text="data.item.projectName" class="black--text"
                                             v-on:click="redirectProject(data.item.projectId)"></v-list-item-content>
                    </template>
                    <template v-slot:no-data>
                        <v-list-item>
                            <v-list-item-title class="black--text">No projects found</v-list-item-title>
                        </v-list-item>
                    </template>
                </v-autocomplete>
            </v-col>
            <v-col cols="3" class="pa-0">
                <v-row justify="end" class="ma-0">
                    <v-card-title v-on:click="logOut()" class="pa-0 mx-1" :class="textColor" v-if="user != null">
                        {{user.username}}
                        <v-avatar class="mx-4">
                            <v-img v-bind:src="user.pfp"></v-img>
                        </v-avatar>
                    </v-card-title>
                    <v-btn v-else :class="textColor + level2" v-on:click="$router.push('login')">Log In</v-btn>
                </v-row>
            </v-col>
            <Settings></Settings>
        </v-row>
    </v-app-bar>
</template>

<style>
    .navigationBarDataEditor div {
        padding: 0px !important;
    }
</style>

<script>
    import * as firebase from "firebase";
    import "firebase/auth";
    import {redirectProject} from "../../mixins/RedirectProject";
    import {mapGetters, mapActions} from "vuex";
    import Settings from "./Settings";

    export default {
        name: "Navbar",
        components: {Settings},
        computed: {
            ...mapGetters("theme", {
                textColor: "textColor",
                dark: "dark",
                level0: "level0",
                level1: "level1",
                level2: "level2",
            }),
            ...mapGetters("projects", {
                projects: "projects",
            }),
        },
        data() {
            return {
                searchProject: "",
                user: null,
            }
        },
        mixins: [redirectProject],
        methods: {
            ...mapActions("projects", ["load"]),
            logOut: function () {
                this.$session.destroy();
                firebase.auth().signOut().then(function () {
                }).catch(function (error) {
                    window.console.log(error);
                });
                this.$router.push("login")
            },
            toOverview: function () {
                if (this.$route.name === "overview") {
                    location.reload();
                } else {
                    this.$router.push("/overview");
                }
            }
        },
        created() {
            this.load({token: this.$session.get("jwt")});
            // store.dispatch("projects/load", {this.$session.get("jwt")});
            try {
                this.uName = this.$session.get("userData").unm;
                this.pfp = this.$session.get("userData").pfp;

                this.user = {
                    username: this.$session.get("userData").unm,
                    pfp: this.$session.get("userData").pfp,
                }
            } catch (e) {
                // alert("You are not logged in")
            }
        }
    }
</script>