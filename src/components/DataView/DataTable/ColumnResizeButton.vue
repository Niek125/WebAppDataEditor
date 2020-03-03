<template>
    <v-hover v-slot:default="{hover}">
        <div>
            <v-btn v-if="active" icon :class="hover ? level3 : level2"
                   :width="length" :height="length" class="mx-1">
                <v-icon :class="textColor">{{icon}}</v-icon>
            </v-btn>
        </div>
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
                level2: "level2",
                level3: "level3",
            }),
        },
    }
</script>

<style scoped>

</style>