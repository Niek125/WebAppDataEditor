<template>
    <v-dialog fullscreen hide-overlay v-model="dialog" transition="dialog-bottom-transition">
        <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
                <v-icon :class="textColor">mdi-settings</v-icon>
            </v-btn>
        </template>
        <v-card :class="level1">
            <v-toolbar :class="level0" flat>
                <v-btn icon @click="dialog = false">
                    <v-icon :class="textColor">mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title :class="textColor">Settings</v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
            <v-list three-line subheader :class="level2">
                <v-subheader :class="textColor">Site</v-subheader>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title :class="textColor">Theme</v-list-item-title>
                        <v-list-item-subtitle :class="textColor">Select the theme for this website
                        </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-select :items="themes" item-text="themeName" item-value="themeId" v-on:change="setTheme"
                                  :dark="dark" placeholder="Theme"></v-select>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
        </v-card>
    </v-dialog>
</template>

<script>
    import {setTheme} from "../mixins/SetTheme";
    import {mapGetters} from "vuex";

    export default {
        name: "Settings",
        computed: {
            ...mapGetters("theme", {
                dark: "dark",
                textColor: "textColor",
                level0: "level0",
                level1: "level1",
                level2: "level2",
            })
        },
        data() {
            return {
                dialog: false,
                themes: [{themeName: "Dark", themeId: 0}, {themeName: "White", themeId: 1}]
            }
        },
        mixins: [setTheme]
    }
</script>