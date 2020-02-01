<template>
    <v-container fluid class="fill-height pa-0">
        <Cookie></Cookie>
        <v-row class="ma-0">
            <Navbar class="navbar"></Navbar>
        </v-row>
        <v-row class="ma-0">
            <v-sheet
                    height="calc(100vh - 64px)"
                    width="100%"
                    id="app-scroll"
                    class="pa-0 transparent overflow-y-auto">
                <router-view></router-view>
            </v-sheet>
        </v-row>
    </v-container>
</template>

<script>
    import Cookie from "../components/Cookie/Cookie";
    import Navbar from "../components/Navbar/Navbar";

    export default {
        name: "AppWrapper",
        components: {
            Cookie,
            Navbar
        }
    }
</script>