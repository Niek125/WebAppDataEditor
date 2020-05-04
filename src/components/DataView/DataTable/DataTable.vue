<template>
    <v-sheet tile class="transparent overflow-hidden" :height="'calc(' + height + ')'"
             :width="tab != 'closed' ? 'calc(100vw - ' + sideBarWidthExpanded +  ')' : 'calc(100vw - ' + sideBarWidth + ')'">
        <TableHeader :headers="header"></TableHeader>
        <v-sheet tile class="data-table transparent" :height="'calc(' + height + ' - ' + headerHeight + ')'"
                 :class="gradient + ' ' + scrollStyle" id="data-table" v-on:scroll="syncScroll">
            <DataRow v-for="(item, index) in rows" :key="'row' + item + index" :index="index" :item="item"
                     :headers="header"></DataRow>
        </v-sheet>
    </v-sheet>
</template>

<script>
    import {mapGetters} from "vuex";
    import DataRow from "./DataRow";
    import TableHeader from "./TableHeader";

    export default {
        name: "DataTable",
        components: {TableHeader, DataRow},
        computed: {
            ...mapGetters("dataView", {
                tab: "tab",
                sideBarWidth: "sideBarWidth",
                sideBarWidthExpanded: "sideBarWidthExpanded",
                height: "height",
                headerHeight: "headerHeight",
            }),
            ...mapGetters("theme", {
                gradient: "gradient",
                scrollStyle: "scrollStyle",
            }),
            ...mapGetters("data", {
                header: "header",
                rows: "rows",
            }),
        },
        methods: {
            syncScroll: function () {
                document.getElementById("table-header").children[0].scrollLeft = document.getElementById("data-table").scrollLeft;
            }
        },
        data() {
            return {
                // headers: [
                //     {text: 'Dessert (100g serving)', value: 'name', width: 1000},
                //     {text: 'Calories', value: 'calories', width: 100},
                //     {text: 'Fat (g)', value: 'fat', width: 100},
                //     {text: 'Carbs (g)', value: 'carbs', width: 100},
                //     {text: 'Protein (g)', value: 'protein', width: 100},
                //     {text: 'Iron (%)', value: 'iron', width: 100},
                // ],
                // desserts: [
                //     {
                //         name: 'Frozen Yogurt',
                //         calories: 159,
                //         fat: 6.0,
                //         carbs: 24,
                //         protein: 4.0,
                //         iron: '1%',
                //     },
                //     {
                //         name: 'Ice cream sandwich',
                //         calories: 237,
                //         fat: 9.0,
                //         carbs: 37,
                //         protein: 4.3,
                //         iron: '1%',
                //     },
                //     {
                //         name: 'Eclair',
                //         calories: 262,
                //         fat: 16.0,
                //         carbs: 23,
                //         protein: 6.0,
                //         iron: '7%',
                //     },
                //     {
                //         name: 'Cupcake',
                //         calories: 305,
                //         fat: 3.7,
                //         carbs: 67,
                //         protein: 4.3,
                //         iron: '8%',
                //     },
                //     {
                //         name: 'Gingerbread',
                //         calories: 356,
                //         fat: 16.0,
                //         carbs: 49,
                //         protein: 3.9,
                //         iron: '16%',
                //     },
                //     {
                //         name: 'Jelly bean',
                //         calories: 375,
                //         fat: 0.0,
                //         carbs: 94,
                //         protein: 0.0,
                //         iron: '0%',
                //     },
                //     {
                //         name: 'Lollipop',
                //         calories: 392,
                //         fat: 0.2,
                //         carbs: 98,
                //         protein: 0,
                //         iron: '2%',
                //     },
                //     {
                //         name: 'Honeycomb',
                //         calories: 408,
                //         fat: 3.2,
                //         carbs: 87,
                //         protein: 6.5,
                //         iron: '45%',
                //     },
                //     {
                //         name: 'Donut',
                //         calories: 452,
                //         fat: 25.0,
                //         carbs: 51,
                //         protein: 4.9,
                //         iron: '22%',
                //     },
                //     {
                //         name: 'KitKat',
                //         calories: 518,
                //         fat: 26.0,
                //         carbs: 65,
                //         protein: 7,
                //         iron: '6%',
                //     },
                //     {
                //         name: 'Frozen Yogurt',
                //         calories: 159,
                //         fat: 6.0,
                //         carbs: 24,
                //         protein: 4.0,
                //         iron: '1%',
                //     },
                //     {
                //         name: 'Ice cream sandwich',
                //         calories: 237,
                //         fat: 9.0,
                //         carbs: 37,
                //         protein: 4.3,
                //         iron: '1%',
                //     },
                //     {
                //         name: 'Eclair',
                //         calories: 262,
                //         fat: 16.0,
                //         carbs: 23,
                //         protein: 6.0,
                //         iron: '7%',
                //     },
                //     {
                //         name: 'Cupcake',
                //         calories: 305,
                //         fat: 3.7,
                //         carbs: 67,
                //         protein: 4.3,
                //         iron: '8%',
                //     },
                //     {
                //         name: 'Gingerbread',
                //         calories: 356,
                //         fat: 16.0,
                //         carbs: 49,
                //         protein: 3.9,
                //         iron: '16%',
                //     },
                //     {
                //         name: 'Jelly bean',
                //         calories: 375,
                //         fat: 0.0,
                //         carbs: 94,
                //         protein: 0.0,
                //         iron: '0%',
                //     },
                //     {
                //         name: 'Lollipop',
                //         calories: 392,
                //         fat: 0.2,
                //         carbs: 98,
                //         protein: 0,
                //         iron: '2%',
                //     },
                //     {
                //         name: 'Honeycomb',
                //         calories: 408,
                //         fat: 3.2,
                //         carbs: 87,
                //         protein: 6.5,
                //         iron: '45%',
                //     },
                //     {
                //         name: 'Donut',
                //         calories: 452,
                //         fat: 25.0,
                //         carbs: 51,
                //         protein: 4.9,
                //         iron: '22%',
                //     },
                //     {
                //         name: 'KitKat',
                //         calories: 518,
                //         fat: 26.0,
                //         carbs: 65,
                //         protein: 7,
                //         iron: '6%',
                //     },
                // ],
            }
        },
    }
</script>

<style scoped>
    .data-table {
        display: grid;
        overflow: auto;
    }

    .data-table::-webkit-scrollbar {
        height: 16px;
        width: 16px;
        background-color: transparent;
    }

    .data-table::-webkit-scrollbar-corner {
        display: none;
    }

    .data-table::-webkit-scrollbar-track {
        display: none;
    }

    .grey-white-grey::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: white;
        background-image: -webkit-linear-gradient(right,
        grey 0%,
        white 25%,
        white 75%,
        grey 100%);
    }

    .grey-black-grey::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: black;
        background-image: -webkit-linear-gradient(right,
        grey 0%,
        black 25%,
        black 75%,
        grey 100%);
    }
</style>