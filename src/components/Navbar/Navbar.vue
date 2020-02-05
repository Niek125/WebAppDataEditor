<template>
    <v-app-bar :class="level0" elevate-on-scroll scroll-target="#app-scroll">
        <v-row align="center" justify="center">
            <v-col cols="2" class="pa-0">
                <v-card-title :class="textColor" v-on:click="toOverview()">
                    <v-icon class="mr-4" :class="textColor">mdi-file-document-edit-outline</v-icon>
                    DataEditor
                </v-card-title>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="4">
                <v-autocomplete :items="projects" item-text="projectname" outlined dense shaped label="search"
                                :hide-details="true" :class="level1">
                    <template v-slot:label>
                        <span :class="textColor">Search</span>
                    </template>
                    <template v-slot:item="data">
                        <v-list-item-content v-text="data.item.projectname" class="black--text"
                                             v-on:click="redirectProject(data.item.projectid, comp)"></v-list-item-content>
                    </template>
                    <template v-slot:no-data>
                        <v-list-item>
                            <v-list-item-content>No datasets found</v-list-item-content>
                        </v-list-item>
                    </template>
                </v-autocomplete>
            </v-col>
            <v-col cols="3" class="pa-0">
                <v-row justify="end">
                    <v-card-title v-on:click="logOut()" class="pa-0 mx-1" :class="textColor">
                        {{uName}}
                        <v-avatar class="mx-4">
                            <v-img v-bind:src="pfp"></v-img>
                        </v-avatar>
                    </v-card-title>
                </v-row>
            </v-col>
            <Settings></Settings>
        </v-row>
    </v-app-bar>
</template>

<script>
    import * as firebase from "firebase";
    import "firebase/auth";
    import {redirectProject} from "../../mixins/RedirectProject";
    import {mapGetters} from "vuex";
    import Settings from "../../views/Settings";

    export default {
        name: "Navbar",
        components: {Settings},
        computed: {
            ...mapGetters("theme", {
                textColor: "textColor",
                level0: "level0",
                level1: "level1",
            })
        },
        data() {
            return {
                projects: [],
                comp: this,
                searchProject: "",
                uName: "Not Found",
                pfp: "https://pbs.twimg.com/profile_images/1008735104070381570/WbceqBkX_400x400.jpg"
            }
        },
        mixins: [redirectProject],
        methods: {
            logOut: function () {
                this.$session.destroy();
                firebase.auth().signOut().then(function () {
                }).catch(function (error) {
                    window.console.log(error);
                });
                location.reload();
            },
            toOverview: function () {
                if (this.$route.name === 'overview') {
                    // location.reload();
                    this.$router.push('/login');
                } else {
                    this.$router.push('/overview');
                }
            }
        },
        created() {
            try {
                this.uName = this.$session.get("userData").unm;
                this.pfp = this.$session.get('userData').pfp;
            } catch (e) {
                // alert("You are not logged in")
            }
        }
    }
</script>