<template>
    <v-list-item>
        <div style="display: table-cell" :class="textColor" v-for="header in headers" :key="'field' + index + header.value">
            <v-hover v-slot:default="{hover}">
                <v-sheet tile :class="hover ? level1: 'transparent'" :width="header.width">
                    <v-text-field :dark="dark" :value="item[header.value]" dense hide-details full-width></v-text-field>
                    <v-divider vertical :dark="dark"></v-divider>
                </v-sheet>
            </v-hover>
        </div>
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
                level1: "level1",
            }),
        },
    }
</script>