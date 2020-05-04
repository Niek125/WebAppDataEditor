<template>
    <v-sheet tile :width="header.width + 1" class="transparent">
        <div class="data-border" :class="'border-' + divider">
            <v-text-field :dark="dark" :value="value" dense hide-details full-width></v-text-field>
        </div>
    </v-sheet>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "DataValue",
        props: {
            value: String,
            header: Object,
        },
        computed: {
            ...mapGetters("theme", ["dark", "divider",]),
        }
    }
</script>

<style scoped>
    .data-border {
        border-width: 0px;
        border-style: solid;
        border-right-width: 1px;
        border-bottom-width: 1px;
        display: flex;
    }

    .border-white {
        border-color: white;
    }

    .border-black {
        border-color: black;
    }
</style>