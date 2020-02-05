<template>
    <v-row class="ma-0">
        <v-sheet tile :width="'calc(' + sideTabWidth + ')'" v-if="tab != 'closed'" :class="level1">
            <chat v-if="tab == 'chat'"></chat>
            <PeopleList v-else-if="tab == 'users'"></PeopleList>
        </v-sheet>
        <v-sheet :class="level0" :height="'calc(' + height + ')'" :width="sideBarWidth" tile>
            <v-list :class="level0">
                <SideBarIcon v-for="data in icons" :key="data.tab" :icon="data.icon"
                             v-on:click.native="openTab(data.tab)"></SideBarIcon>
            </v-list>
        </v-sheet>
    </v-row>
</template>

<script>
    import {mapGetters, mapActions} from "vuex";
    import SideBarIcon from "./SideBarIcon";
    import Chat from "../Chat/Chat";
    import PeopleList from "../UserList/PeopleList";

    export default {
        name: "SideBar",
        components: {
            SideBarIcon,
            Chat,
            PeopleList
        },
        computed: {
            ...mapGetters("theme", {
                level0: "level0",
                level1: "level1",
            }),
            ...mapGetters("dataView", {
                tab: "tab",
                height: "height",
                sideTabWidth: "sideTabWidth",
                sideBarWidth: "sideBarWidth",
            }),
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
        methods: {
            ...mapActions("dataView", {
                setTab: "setTab"
            }),
            openTab: function (nTab) {
                let dTab;
                this.tab == nTab ? dTab = 'closed' : dTab = nTab;
                this.setTab(dTab);
            }
        },
    }
</script>