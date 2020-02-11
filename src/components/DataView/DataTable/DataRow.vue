<template>
    <tr>
        <td :class="textColor" v-for="header in headers" :key="'row' + index + header.value">
            <input :value="item[header.value]" type="text" style="outline: transparent; min-width: 20px;"
                   :style="'width: calc(' + header.width + 'px);'">
        </td>
    </tr>
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
                textColor: "textColor",
            }),
        },
    }
</script>