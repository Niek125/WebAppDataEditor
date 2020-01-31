<template>
    <v-hover v-slot:default="{ hover }">
        <v-card class="grey ma-2 pa-2" :class="hover ? 'darken-2' : 'darken-3'" v-on:click="adduser = true">
            <v-row class="ma-0">
                <v-col cols="2" class="pa-0">
                    <v-row justify="center" align="center" class="ma-0">
                        <v-avatar>
                            <v-img v-bind:src="user.profilepicture"></v-img>
                        </v-avatar>
                    </v-row>
                </v-col>
                <v-col cols="10" class="pa-0">
                    <v-row class="ma-0 ml-2">
                        <v-card-text style="padding: 0px;">{{user.username}}</v-card-text>
                    </v-row>
                    <v-row class="ma-0 ml-2">
                        <v-card-text style="padding: 0px;">{{user.email}}</v-card-text>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
    </v-hover>
</template>

<script>
    export default {
        name: 'UserCard',
        props: {
            user: {}
        }
    }
</script>