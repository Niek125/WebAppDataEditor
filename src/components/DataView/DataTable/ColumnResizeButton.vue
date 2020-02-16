<template>
    <v-hover v-slot:default="{hover}">
        <v-btn v-if="active" icon :class="hover ? level2 : level1"
               :width="length" :height="length">
            <v-icon :class="textColor">{{icon}}</v-icon>
        </v-btn>
    </v-hover>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "ColumnResizeButton",
        props: {
            active: Boolean,
            length: Number,
            icon: String,
        },
        computed: {
            ...mapGetters("theme", {
                textColor: "textColor",
                level1: "level1",
                level2: "level2",
            }),
        },
    }
</script>

<style scoped>

</style>