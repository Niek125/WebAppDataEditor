<template>
    <v-app class="background">
        <v-container class="fill-height pa-0" :class="gradient" fluid>
            <router-view></router-view>
        </v-container>
    </v-app>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        computed: {
            ...mapGetters("theme", {
                gradient: "gradient",
            })
        },
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

<style scoped>
    .background {
        background-image: url("../public/DataEditor_BackGround.jpg") !important;
        background-size: cover !important;
        background-position: bottom !important;
    }

    .black-gradient {
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.6));
    }

    .white-gradient {
        background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8));
    }
</style>
