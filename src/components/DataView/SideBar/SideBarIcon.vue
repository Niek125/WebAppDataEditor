<template>
    <v-list-item class="px-3">
        <v-hover v-slot:default="{ hover }">
            <v-btn icon :class="hover ? level1 : level0" width="48px" height="48px">
                <v-icon :class="textColor">{{icon}}</v-icon>
            </v-btn>
        </v-hover>
    </v-list-item>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "SideBarIcon",
        computed: {
            ...mapGetters("theme", {
                textColor: "textColor",
                level0: "level0",
                level1: "level1",
            })
        },
        props: {
            icon: String,
        }
    }
</script>