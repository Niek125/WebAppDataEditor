<template>
    <v-overlay v-bind:value="visibleCookie" opacity="0">
        <v-card color="#DE9DAD" width="80vw" height="20vw">
            <v-container fill-height>
                <v-row align="center" justify="center">
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="6">
                                <v-card-title style="padding: 6px;">
                                    This website uses cookies to ensure you get the best experience on our website.
                                </v-card-title>
                            </v-col>
                            <v-col cols="1.5" align-self="center">
                                <v-btn color="#BABABA" href="https://www.cookiesandyou.com/"
                                       target="_blank">
                                    Learn more.
                                </v-btn>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="1.5" align-self="center">
                                <div class="center-div">
                                    <v-btn class="grey--text text--darken-1" v-on:click="cookiepopup" color="#F2ECFF">
                                        decline
                                    </v-btn>
                                </div>
                            </v-col>
                            <v-col cols="1.5" align-self="center">
                                <div class="center-div">
                                    <v-btn v-on:click="accept()" color="#00C896">
                                        accept
                                    </v-btn>
                                </div>
                            </v-col>
                            <v-spacer></v-spacer>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
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