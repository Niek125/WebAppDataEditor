<template>
    <v-card color="#62787E">
        <v-col cols="12">
            <v-row>
                <v-col cols="6" v-for="data in this.headers" v-bind:key="data.name">
                    <v-row>
                        <v-spacer></v-spacer>
                        <v-text-field v-if="data.type == 'STRING'" dark
                                      :label="data.text" v-model="editedItem[data.value]"></v-text-field>
                        <v-text-field v-else-if="data.type == 'NUMBER'" dark type="number"
                                      :label="data.text" v-model="editedItem[data.value]"></v-text-field>
                        <v-spacer></v-spacer>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-row>
                        <v-spacer></v-spacer>
                        <v-btn width="59%" color="#F2ECFF" class="grey--text text--darken-1" v-on:click="close()">Cancel
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-row>
                </v-col>
                <v-col cols="6">
                    <v-row>
                        <v-spacer></v-spacer>
                        <v-btn width="59%" color="#00C896" v-on:click="save()">Save</v-btn>
                        <v-spacer></v-spacer>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
    </v-card>
</template>

<script>
    export default {
        name: "EditRow",
        props: {
            editedItem: Object,
            headers: Array,
            close: Function,
            save: Function
        }
    }
</script>