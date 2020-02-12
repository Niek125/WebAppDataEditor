<template>
    <v-app-bar elevate-on-scroll scroll-target="#data-table" tile class="table-header" :height="headerHeight">
        <v-hover v-slot:default="{hover}" v-for="header in headers" :key="'header' + header.name + header.value">
            <v-sheet tile v-on:mouseup="mouseDown = false" class="transparent">
                <v-row class="ma-0" justify="center">
                    <v-sheet :width="header.width" tile class="transparent">
                        <v-row class="ma-0" align="center">
                            <v-btn v-if="hover" icon
                                   v-on:mousedown="() => {mouseDown = true; setHeaderWidth(header, -scrollPace);}"
                                   :width="buttonWidth" :height="buttonWidth">
                                <v-icon>mdi-chevron-left</v-icon>
                            </v-btn>
                            <v-sheet tile :width="hover ? header.width - (2 * buttonWidth) : header.width">
                                <v-row class="ma-0" justify="center">
                                    <v-toolbar-title class="text-no-wrap overflow-hidden">{{header.text}}
                                    </v-toolbar-title>
                                </v-row>
                            </v-sheet>
                            <v-btn v-if="hover" icon
                                   v-on:mousedown="() => {mouseDown = true; setHeaderWidth(header, scrollPace);}"
                                   :width="buttonWidth" :height="buttonWidth">
                                <v-icon>mdi-chevron-right</v-icon>
                            </v-btn>
                        </v-row>
                    </v-sheet>
                </v-row>
            </v-sheet>
        </v-hover>
    </v-app-bar>
</template>

<style>
    .table-header div {
        padding: 0px !important;
    }
</style>

<style scoped>

</style>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "TableHeader",
        computed: {
            ...mapGetters("theme", {
                level0: "level0",
                level1: "level1",
            }),
            ...mapGetters("dataView", {
                headerHeight: "headerHeight",
            }),
        },
        props: {
            headers: Array,
        },
        data() {
            return {
                mouseDown: false,
                buttonWidth: 32,
                scrollPace: 4,
            }
        },
        methods: {
            setHeaderWidth: function (header, value) {
                if (value < 0 && header.width <= (this.buttonWidth * 2)) {
                    return;
                }
                header.width += value;
                setTimeout(() => {
                    if (this.mouseDown) {
                        this.setHeaderWidth(header, value);
                    }
                }, 20);
            }
        }
    }
</script>