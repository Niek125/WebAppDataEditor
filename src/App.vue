<template>
    <v-app>
        <v-card color="#808080" v-if="visibleCookie">
            <v-row>
                <v-col cols="12">
                    <v-row>
                        <v-col cols="6">
                            <v-card-title style="padding: 6px;">
                                This website uses cookies to ensure you get the best experience on our website.
                            </v-card-title>
                        </v-col>
                        <v-col cols="1">
                            <div class="center-div">
                                <v-btn color="blue" href="https://www.cookiesandyou.com/" target="_blank">
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
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
        <router-view></router-view>
    </v-app>
</template>

<script>
    import data from './apptest'

    export default {
        data() {
            return {
                appData: data,
                visibleCookie: JSON.parse(this.$cookie.get('recent')) == null
            }
        },
        methods: {
            accept: function () {
                this.$cookie.set('recent', JSON.stringify(new Array()), {expires: '1M'});
                this.decline();
            },
            decline: function () {
              this.visibleCookie = false;
            }
        }
    };
</script>
