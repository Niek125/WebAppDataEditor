<template>
    <thead>
    <tr>
        <th v-for="header in props.headers" :key="'header' + header.name + header.value"
            v-on:mouseup="mouseDown = false">
            <v-sheet :width="header.width - 72">
                <v-row class="ma-0" align="center" justify="center">
                    <v-col class="pa-0">
                        <v-btn icon v-on:mousedown="() => {mouseDown = true; setHeaderWidth(header, -1);}">
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col class="pa-0 overflow-hidden">
                        <v-sheet tile :width="header.width"><span>{{header.text}}</span></v-sheet>
                    </v-col>
                    <v-col class="pa-0">
                        <v-btn icon v-on:mousedown="() => {mouseDown = true; setHeaderWidth(header, 1);}">
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-sheet>
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
            }
        },
        methods: {
            setHeaderWidth: function (header, value) {
                if (value < 0 && header.width <= 0) {
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