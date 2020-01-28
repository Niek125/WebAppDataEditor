<template>
    <v-overlay v-bind:value="visibleCookie" opacity="0.8">
        <v-container fluid class="fill-height">
            <v-card class="grey darken-3">
                <v-row align="center" justify="center">
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="6">
                                <v-card-title class="ma-4" style="word-break: break-word">
                                    This website uses cookies to ensure you get the best experience on our
                                    website.
                                </v-card-title>
                            </v-col>
                            <v-col cols="1.5" align-self="center">
                                <v-btn class="blue darken-4" href="https://www.cookiesandyou.com/"
                                       target="_blank">
                                    Learn more.
                                </v-btn>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="1.5" align-self="center">
                                <v-btn class="red darken-4" v-on:click="cookiepopup"
                                       color="#F2ECFF">
                                    decline
                                </v-btn>
                            </v-col>
                            <v-col cols="1.5" align-self="center">
                                <v-btn v-on:click="accept()" class="green darken-4">
                                    accept
                                </v-btn>
                            </v-col>
                            <v-spacer></v-spacer>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card>
        </v-container>
    </v-overlay>
</template>

<script>
    export default {
        name: "Cookie",
        data() {
            return {
                visibleCookie: JSON.parse(this.$cookie.get('recent')) == null
            }
        },
        methods: {
            accept: function () {
                this.$cookie.set('recent', "[]", {expires: '1M'});
                this.cookiepopup();
            },
            cookiepopup: function () {
                this.visibleCookie = !this.visibleCookie;
            }
        }
    }
</script>