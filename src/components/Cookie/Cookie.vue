<template>
    <v-overlay v-bind:value="visibleCookie" :opacity="overlayOpacity">
        <v-container fluid class="fill-height">
            <v-card :class="level2">
                <v-row align="center" justify="center">
                    <v-col cols="6">
                        <v-card-title class="ma-4 py-0" :class="textColor" style="word-break: break-word">
                            This website uses cookies to ensure you get the best experience on our
                            website.
                        </v-card-title>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="1.5" align-self="center">
                        <v-btn width="100%" :class="textColor + btnInfo" href="https://www.cookiesandyou.com/"
                               target="_blank">
                            Learn more.
                        </v-btn>
                    </v-col>
                    <v-col cols="1.5" align-self="center">
                        <v-btn width="100%" :class="textColor + btnDeny" v-on:click="cookiepopup"
                               color="#F2ECFF">
                            decline
                        </v-btn>
                    </v-col>
                    <v-col cols="1.5" align-self="center" class="mr-4">
                        <v-btn width="100%" v-on:click="accept()" :class="textColor + btnAccept">
                            accept
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-container>
    </v-overlay>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Cookie",
        computed: {
            ...mapGetters("theme", {
                overlayOpacity: "overlayOpacity",
                btnAccept: "btnAccept",
                btnDeny: "btnDeny",
                btnInfo: "btnInfo",
                textColor: "textColor",
                level2: "level2",
            })
        },
        data() {
            return {
                visibleCookie: JSON.parse(this.$cookie.get('recent')) == null
            }
        },
        methods: {
            accept: function () {
                this.$cookie.set("recent", "[]", {expires: '1M'});
                this.$cookie.set("theme", 0, {expires: '1Y'});
                this.cookiepopup();
            },
            cookiepopup: function () {
                this.visibleCookie = !this.visibleCookie;
            }
        }
    }
</script>