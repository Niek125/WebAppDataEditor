<template>
    <v-sheet style="display: table-row; position: sticky;" min-width="">
        <div style="display: table-cell;" v-for="header in headers" :key="'header' + header.name + header.value"
            v-on:mouseup="mouseDown = false" class="pr-0">
            <v-row class="ma-0">
                <v-sheet :width="header.width" tile>
                    <v-row class="ma-0" align="center" justify="center">
                        <v-btn icon v-on:mousedown="() => {mouseDown = true; setHeaderWidth(header, -scrollPace);}">
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-sheet tile :width="header.width - (2 * buttonWidth)">
                            <div class="text-no-wrap overflow-x-hidden">{{header.text}}</div>
                        </v-sheet>
                        <v-btn icon v-on:mousedown="() => {mouseDown = true; setHeaderWidth(header, scrollPace);}" :width="buttonWidth">
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-row>
                </v-sheet>
            </v-row>
        </div>
    </v-sheet>
</template>

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
                tab: "tab",
                height: "height",
                sideTabWidth: "sideTabWidth",
                sideBarWidth: "sideBarWidth",
            }),
        },
        props: {
            headers: Array,
        },
        data() {
            return {
                mouseDown: false,
                buttonWidth: 36,
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

<style scoped>

</style>