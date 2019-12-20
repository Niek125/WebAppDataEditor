<template>
    <v-col cols="2" style="min-width: 155px; max-width: 165px;">
        <v-hover v-slot:default="{ hover }">
            <v-card v-on:click="redirectProject(projectid, comp)" class="lr-m" style="height: 150px;" color="#707B83"
                    :elevation="hover ? 16: 8">
                <div class="center-div icon-cont">
                    <v-icon size="30">fas fa-code</v-icon>
                </div>
                <v-card-title class="multiline-break">{{content}}</v-card-title>
            </v-card>
        </v-hover>
    </v-col>
</template>

<style>
    .icon-cont {
        height: 60px;
    }

    .multiline-break {
        max-height: 80px;
        overflow: hidden;
        word-break: break-word;
    }
</style>

<script>
    import { redirectProject } from "../mixins/RedirectProject";

    export default {
        name: "ProjectCard",
        props: {
            content: String,
            projectid: String
        },
        data() {
            return{
                comp: this
            }
        },
        mixins: [redirectProject]
    }
</script>