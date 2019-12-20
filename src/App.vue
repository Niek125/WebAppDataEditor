<template>
    <v-app>
        <div v-if="signedIn">
            <Cookie></Cookie>
            <Navbar class="navbar"></Navbar>
            <v-sheet
                    height="calc(100vh - 64px)"
                    id="scrolling-techniques-7"
                    class="overflow-y-auto"
                    style="background-color: transparent;">
                <router-view></router-view>
            </v-sheet>
        </div>
        <LogIn v-bind:session-set="sessionSet" v-else></LogIn>
    </v-app>
</template>

<script>
    import LogIn from './views/LogIn'
    import Cookie from "./components/Cookie";
    import Navbar from "./components/Navbar";

    export default {
        data() {
            return {
                signedIn: this.sessionSet()
            }
        },
        methods: {
            sessionSet: function () {
                this.signedIn = this.$session.exists();
            }
        },
        components: {
            LogIn,
            Cookie,
            Navbar
        }
    };
</script>
