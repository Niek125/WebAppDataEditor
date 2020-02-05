<template>
    <v-hover v-slot:default="{ hover }">
        <v-card class="mx-2" :class="hover ? level3: level2">
            <v-row class="ma-0">
                <v-card-text class="px-1 py-0 my-1 body-1" :class="textColor">{{content}}</v-card-text>
            </v-row>
            <v-row class="ma-0">
                <v-card-text class="pa-1 caption" :class="textColor">{{senderName + " at " + sendTime}}</v-card-text>
            </v-row>
        </v-card>
    </v-hover>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Message",
        computed: {
            ...mapGetters("theme", {
                textColor: "textColor",
                level2: "level2",
                level3: "level3",
            })
        },
        props: {
            content: String,
            sendTime: String,
            senderName: String,
        }
    }
</script>