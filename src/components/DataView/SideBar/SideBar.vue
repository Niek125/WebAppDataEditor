<template>
    <v-sheet :class="level0" :width="width" tile>
        <v-list :class="level0">
            <SideBarIcon v-for="data in icons" :key="data.tab" :icon="data.icon" v-on:click.native="setTab(data.tab)"></SideBarIcon>
        </v-list>
    </v-sheet>
</template>

<script>
    import {mapGetters} from "vuex";
    import SideBarIcon from "./SideBarIcon";

    export default {
        name: "SideBar",
        components: {SideBarIcon},
        computed: {
            ...mapGetters("theme", {
                level0: "level0",
            })
        },
        data() {
            return {
                icons: [
                    {
                        icon: "mdi-message",
                        tab: "chat"
                    },
                    {
                        icon: "mdi-account-group",
                        tab: "users"
                    }
                ]
            }
        },
        props: {
            setTab: Function,
            width: String,
        }
    }
</script>