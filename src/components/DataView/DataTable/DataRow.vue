<template>
    <v-hover v-slot:default="{hover}">
        <div style="display: flex;">
            <v-sheet tile :width="header.width + 1" :class="hover ? level3 : 'transparent'" v-for="header in headers"
                     :key="'field' + index + header.value">
                <div class="data-border" :class="'border-' + divider">
                    <v-text-field :dark="dark" :value="item[header.value]" dense hide-details full-width></v-text-field>
                </div>
            </v-sheet>
        </div>
    </v-hover>
</template>

<style scoped>
    .data-border{
        border-width: 0px;
        border-style: solid;
        border-right-width: 1px;
        border-bottom-width: 1px;
        display: flex;
    }

    .border-white{
        border-color: white;
    }

    .border-black{
        border-color: black;
    }
</style>

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
                divider: "divider",
                textColor: "textColor",
                level3: "level3",
            }),
        },
    }
</script>