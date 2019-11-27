<template>
    <v-app>
        <div v-if="signedIn">
            <v-overlay v-bind:value="visibleCookie" opacity="0.9">
                <v-card color="#808080">
                    <v-row>
                        <v-col cols="12">
                            <v-row>
                                <v-col cols="8">
                                    <v-card-title style="padding: 6px;">
                                        This website uses cookies to ensure you get the best experience on our website.
                                    </v-card-title>
                                </v-col>
                                <v-col cols="1">
                                    <div class="center-div">
                                        <v-btn color="blue" min-width="105" href="https://www.cookiesandyou.com/"
                                               target="_blank">
                                            Learn more.
                                        </v-btn>
                                    </div>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col cols="1">
                                    <div class="center-div">
                                        <v-btn v-on:click="accept()" color="green">
                                            accept
                                        </v-btn>
                                    </div>
                                </v-col>
                                <v-col cols="1">
                                    <div class="center-div">
                                        <v-btn v-on:click="decline" color="red">
                                            decline
                                        </v-btn>
                                    </div>
                                </v-col>
                                <v-spacer></v-spacer>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>
            </v-overlay>
            <router-view></router-view>
        </div>
        <LogIn v-bind:session-set="sessionSet" v-else>hi</LogIn>
    </v-app>
</template>

<script>
    import LogIn from './views/LogIn'

    export default {
        data() {
            return {
                visibleCookie: JSON.parse(this.$cookie.get('recent')) == null,
                signedIn: this.sessionSet()
            }
        },
        methods: {
            accept: function () {
                this.$cookie.set('recent', JSON.stringify(new Array()), {expires: '1M'});
                this.decline();
            },
            decline: function () {
                this.visibleCookie = false;
            },
            sessionSet: function () {
                this.signedIn = this.$session.exists();
            }
        },
        components: {
            LogIn
        }
    };
</script>
