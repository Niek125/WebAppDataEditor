<template>
    <div style="display: table-row">
        <div style="display: table-cell" :class="textColor" v-for="header in headers" :key="'field' + index + header.value">
            <v-hover v-slot:default="{hover}">
                <v-sheet tile :class="hover ? level1: 'transparent'" :width="header.width">
<!--                    <input :value="item[header.value]" type="text"-->
<!--                            style="outline: transparent; min-width: 20px;"-->
<!--                            :style="'width: calc(' + header.width + 'px);'">-->
                    <v-text-field :dark="dark" :value="item[header.value]" dense hide-details full-width></v-text-field>
                    <v-divider vertical :dark="dark"></v-divider>
                </v-sheet>
            </v-hover>
        </div>
    </div>
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