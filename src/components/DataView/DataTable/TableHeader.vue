<template>
    <thead>
    <tr>
        <th v-for="header in props.headers" :key="'header' + header.name + header.value"
            v-on:mouseup="mouseDown = false" class="pr-0">
            <v-row class="ma-0">
                <v-sheet :width="header.width" tile>
                    <v-row class="ma-0" align="center" justify="center">
                        <v-btn icon v-on:mousedown="() => {mouseDown = true; setHeaderWidth(header, -1);}">
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-sheet tile :width="header.width - (2 * buttonWidth)">
                            <div class="text-no-wrap overflow-x-hidden">{{header.text}}</div>
                        </v-sheet>
                        <v-btn icon v-on:mousedown="() => {mouseDown = true; setHeaderWidth(header, 1);}">
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-row>
                </v-sheet>
                <v-divider vertical></v-divider>
            </v-row>
        </th>
    </tr>
    </thead>
</template>

<script>
    export default {
        name: "TableHeader",
        props: {
            props: Object,
            on: Object,
        },
        data() {
            return {
                mouseDown: false,
                buttonWidth: 36,
            }
        },
        methods: {
            setHeaderWidth: function (header, value) {
                if (value < 0 && header.width <= 72) {
                    return;
                }
                header.width += value;
                setTimeout(() => {
                    if (this.mouseDown) {
                        this.setHeaderWidth(header, value);
                    }
                }, 5);
            }
        }
    }
</script>

<style scoped>

</style>