<template>
    <v-hover v-slot:default="{hover}">
        <v-sheet tile :class="hover ? level3 : 'transparent'" style="display: flex;">
            <DataValue v-for="(header, index) in headers" :key="'field' + index + header.value" :value="item[index]"
                       :header="header"></DataValue>
        </v-sheet>
    </v-hover>
</template>

<script>
    import {mapGetters} from "vuex";
    import DataValue from "./DataValue";

    export default {
        name: "DataRow",
        components: {DataValue},
        props: {
            item: Array,
            headers: Array,
            index: Number
        },
        computed: {
            ...mapGetters("theme", ["level3",]),
        },
    }
</script>