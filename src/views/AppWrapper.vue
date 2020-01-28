<template>
    <v-container fluid class="fill-height pa-0">
        <Cookie></Cookie>
        <v-row>
            <Navbar class="navbar"></Navbar>
        </v-row>
        <v-row>
            <v-sheet
                    height="calc(100vh - 64px)"
                    id="scrolling-techniques-7"
                    class="overflow-y-auto"
                    style="background-color: transparent;">
                <router-view></router-view>
            </v-sheet>
        </v-row>
    </v-container>
</template>

<script>
    import Cookie from "../components/Cookie";
    import Navbar from "../components/Navbar/Navbar";

    export default {
        name: "AppWrapper",
        components: {
            Cookie,
            Navbar
        }
    }
</script>