<template>
    <v-app-bar elevate-on-scroll scroll-target="#data-table" tile :class="level2" :height="headerHeight"
               id="table-header">
        <v-hover v-slot:default="{hover}" v-for="header in headers" :key="'header' + header.name + header.value">
            <div class="data-border fill-height" :class="'border-' + divider">
                <v-row class="ma-0" align="center">
                    <v-sheet tile v-on:mouseup="mouseDown = false" class="transparent">
                        <v-row class="ma-0" justify="center">
                            <v-sheet :width="header.width" tile class="transparent">
                                <v-row class="ma-0" align="center">
                                    <ColumnResizeButton :active="hover" :length="buttonWidth" icon="mdi-chevron-left"
                                                        v-on:mousedown.native="() => {mouseDown = true; setHeaderWidth(header, -scrollPace);}"></ColumnResizeButton>
                                    <v-sheet tile :width="hover ? header.width - (2 * buttonWidth) - 16 : header.width"
                                             class="transparent">
                                        <v-row class="ma-0" justify="center">
                                            <v-text-field :dark="dark" hide-details dense
                                                          :value.sync="header.text" full-width></v-text-field>
                                        </v-row>
                                    </v-sheet>
                                    <ColumnResizeButton :active="hover" :length="buttonWidth" icon="mdi-chevron-right"
                                                        v-on:mousedown.native="() => {mouseDown = true; setHeaderWidth(header, scrollPace);}"></ColumnResizeButton>
                                </v-row>
                            </v-sheet>
                        </v-row>
                    </v-sheet>
                </v-row>
            </div>
        </v-hover>
    </v-app-bar>
</template>

<style scoped>
    .data-border {
        border-width: 0px;
        border-style: solid;
        border-right-width: 1px;
        display: flex;
    }

    .border-white {
        border-color: white;
    }

    .border-black {
        border-color: black;
    }
</style>

<style>
    #table-header .v-toolbar__content {
        padding: 0px !important;
        overflow: auto !important;
        margin-right: 16px;
    }

    #table-header .v-toolbar__content::-webkit-scrollbar{
        display: none;
    }
</style>

<script>
    import {mapGetters} from "vuex";
    import ColumnResizeButton from "./ColumnResizeButton";

    export default {
        name: "TableHeader",
        components: {ColumnResizeButton},
        computed: {
            ...mapGetters("theme", {
                dark: "dark",
                divider: "divider",
                textColor: "textColor",
                level2: "level2",
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
                buttonWidth: 28,
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
                }, 15);
            }
        }
    }
</script>