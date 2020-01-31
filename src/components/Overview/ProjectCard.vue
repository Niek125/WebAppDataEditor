<template>
    <v-hover v-slot:default="{ hover }">
        <v-card v-on:click="redirectProject(projectid, comp)" class="grey darken-2 ml-4 mr-4 pa-2"
                height="170px" width="150px"
                :elevation="hover ? 16: 4">
            <v-row justify="center" align="center">
                <v-icon class="ma-4">mdi-xml</v-icon>
            </v-row>
            <v-divider class="white"></v-divider>
            <v-row>
                <v-card-title style="word-break: break-word">{{content}}</v-card-title>
            </v-row>
        </v-card>
    </v-hover>
</template>

<script>
    import {redirectProject} from "../../mixins/RedirectProject";

    export default {
        name: "ProjectCard",
        props: {
            content: String,
            projectid: String
        },
        data() {
            return {
                comp: this
            }
        },
        mixins: [redirectProject]
    }
</script>