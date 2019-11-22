<template>
    <v-col cols="2" style="min-width: 155px; max-width: 165px;">
        <v-card v-on:click="redirect(projectid)" class="lr-m" style="height: 150px;" color="#5e96ff">
            <div class="center-div icon-cont">
                <v-icon size="30">fas fa-code</v-icon>
            </div>
            <v-card-title class="multiline-break">{{content}}</v-card-title>
        </v-card>
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
    export default {
        name: "ProjectCard",
        props: {
            content: String,
            projectid: String,
            redirect: Function
        }
    }
</script>