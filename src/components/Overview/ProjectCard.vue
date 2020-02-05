<template>
    <v-hover v-slot:default="{ hover }">
        <v-card class="ml-4 mr-4 pa-2" :class="level3"
                height="170px" width="150px" :elevation="hover ? 16: 4">
            <v-row justify="center" align="center">
                <v-icon class="ma-4" :class="textColor">{{icon}}</v-icon>
            </v-row>
            <v-divider :class="divider"></v-divider>
            <v-row>
                <v-card-title style="word-break: break-word" :class="textColor">{{content}}</v-card-title>
            </v-row>
        </v-card>
    </v-hover>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "ProjectCard",
        computed: {
            ...mapGetters("theme", {
                textColor: "textColor",
                divider: "divider",
                level3: "level3",
            })
        },
        props: {
            icon: String,
            content: String
        },
        data() {
            return {
                comp: this
            }
        },
    }
</script>