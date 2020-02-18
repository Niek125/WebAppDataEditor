<template>
    <v-list-item>
        <v-hover v-slot:default="{hover}">
            <v-chip :class="hover ? level2 : 'transparent'">
                <v-sheet tile class="transparent" :width="'calc(' + header.width + 'px)'"
                         :class="textColor" v-for="header in headers" :key="'field' + index + header.value">
                    <v-text-field :dark="dark" :value="item[header.value]" dense hide-details></v-text-field>
                </v-sheet>
            </v-chip>
        </v-hover>
    </v-list-item>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "DataRow",
        props: {
            item: Object,
            headers: Array,
            index: Number
        },
        computed: {
            ...mapGetters("theme", {
                dark: "dark",
                textColor: "textColor",
                level2: "level2",
            }),
        },
    }
</script>