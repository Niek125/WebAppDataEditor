<template>
    <v-app>
        <v-container class="fill-height pa-0" fluid id="gradient">
            <router-view></router-view>
        </v-container>
    </v-app>
</template>

<script>

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
        }
    };
</script>

<style>
    #app {
        background-image: url("../public/DataEditor_BackGround.jpg");
        background-size: cover;
        background-position: bottom;
    }

    * {
        color: white !important;
    }
</style>

<style scoped>
    #gradient {
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.6));
    }
</style>
