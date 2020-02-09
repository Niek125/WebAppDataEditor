<template>
    <v-sheet tile height="calc(100vh - 64px)" class="transparent overflow-x-auto" :class="gradient"
             :width="tab != 'closed' ? 'calc(100vw - ' + sideBarWidthExpanded +  ')' : 'calc(100vw - ' + sideBarWidth + ')'">
        <v-data-table :headers="headers" :items="desserts" fixed-header hide-default-footer class="transparent data-table"
                      :height="'calc(' + height + ')'" :class="scrollStyle">
            <template v-slot:item="{item, select, isSelected, expand, isExpanded, headers, index}">
                <tr>
                    <td>
                        <v-edit-dialog>
                            <v-card-text>{{item.name}}</v-card-text>
                            <template v-slot:input>
                                <v-text-field :value="item.name"></v-text-field>
                            </template>
                        </v-edit-dialog>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </v-sheet>
</template>

<style>
    .data-table div::-webkit-scrollbar-track {
        border-radius: 8px;
        background-color: transparent;
    }

    .data-table div::-webkit-scrollbar {
        height: 18px;
        background-color: transparent;
    }

    .grey-white-grey div::-webkit-scrollbar-thumb {
        border-radius: 9px;
        background-color: white;
        background-image: -webkit-linear-gradient(right,
        grey 0%,
        white 25%,
        white 75%,
        grey 100%);
    }

    .grey-black-grey div::-webkit-scrollbar-thumb {
        border-radius: 9px;
        background-color: white;
        background-image: -webkit-linear-gradient(right,
        grey 0%,
        black 25%,
        black 75%,
        grey 100%);
    }
</style>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "DataTable",
        computed: {
            ...mapGetters("dataView", {
                tab: "tab",
                sideBarWidth: "sideBarWidth",
                sideBarWidthExpanded: "sideBarWidthExpanded",
                height: "height",
            }),
            ...mapGetters("theme", {
                gradient: "gradient",
                scrollStyle: "scrollStyle",
            }),
        },
        data() {
            return {
                headers: [
                    {text: 'Dessert (100g serving)', value: 'name'},
                    {text: 'Calories', value: 'calories'},
                    {text: 'Fat (g)', value: 'fat'},
                    {text: 'Carbs (g)', value: 'carbs'},
                    {text: 'Protein (g)', value: 'protein'},
                    {text: 'Iron (%)', value: 'iron'},
                    {text: 'Dessert (100g serving)', value: 'name'},
                    {text: 'Calories', value: 'calories'},
                    {text: 'Fat (g)', value: 'fat'},
                    {text: 'Carbs (g)', value: 'carbs'},
                    {text: 'Protein (g)', value: 'protein'},
                    {text: 'Iron (%)', value: 'iron'},
                    {text: 'Dessert (100g serving)', value: 'name'},
                    {text: 'Calories', value: 'calories'},
                    {text: 'Fat (g)', value: 'fat'},
                    {text: 'Carbs (g)', value: 'carbs'},
                    {text: 'Protein (g)', value: 'protein'},
                    {text: 'Iron (%)', value: 'iron'},
                ],
                desserts: [
                    {
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0,
                        iron: '1%',
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                        fat: 9.0,
                        carbs: 37,
                        protein: 4.3,
                        iron: '1%',
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                        fat: 16.0,
                        carbs: 23,
                        protein: 6.0,
                        iron: '7%',
                    },
                    {
                        name: 'Cupcake',
                        calories: 305,
                        fat: 3.7,
                        carbs: 67,
                        protein: 4.3,
                        iron: '8%',
                    },
                    {
                        name: 'Gingerbread',
                        calories: 356,
                        fat: 16.0,
                        carbs: 49,
                        protein: 3.9,
                        iron: '16%',
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                        fat: 0.0,
                        carbs: 94,
                        protein: 0.0,
                        iron: '0%',
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                        fat: 0.2,
                        carbs: 98,
                        protein: 0,
                        iron: '2%',
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                        fat: 3.2,
                        carbs: 87,
                        protein: 6.5,
                        iron: '45%',
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                        fat: 25.0,
                        carbs: 51,
                        protein: 4.9,
                        iron: '22%',
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                        fat: 26.0,
                        carbs: 65,
                        protein: 7,
                        iron: '6%',
                    },
                ],
            }
        }
    }
</script>