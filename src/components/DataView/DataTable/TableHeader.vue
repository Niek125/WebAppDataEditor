<template>
    <v-app-bar elevate-on-scroll scroll-target="#data-table" tile :class="level1"
               :height="headerHeight">
        <v-hover v-slot:default="{hover}" v-for="header in headers" :key="'header' + header.name + header.value">
            <v-sheet tile v-on:mouseup="mouseDown = false" class="transparent">
                <v-row class="ma-0" justify="center">
                    <v-sheet :width="header.width" tile class="transparent">
                        <v-row class="ma-0" align="center">
                            <ColumnResizeButton :active="hover" :length="buttonWidth" icon="mdi-chevron-left"
                                                v-on:mousedown.native="() => {mouseDown = true; setHeaderWidth(header, -scrollPace);}"></ColumnResizeButton>
                            <v-sheet tile :width="hover ? header.width - (2 * buttonWidth) : header.width"
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
        </v-hover>
    </v-app-bar>
</template>

<style scoped>

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
                textColor: "textColor",
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
                }, 20);
            }
        }
    }
</script>