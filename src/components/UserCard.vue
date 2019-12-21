<template>
    <v-card color="#707B83" class="lr-m tb-m usercard">
        <v-col cols="12">
            <v-row>
                <v-container fill-height>
                    <v-col cols="2" align-self="center">
                        <v-img max-height="32" max-width="32" align="center" justify="center"
                               style="border-radius: 32px;"
                               v-bind:src="user.profilepicture"></v-img>
                    </v-col>
                    <v-col cols="10">
                        <v-row>
                            <v-card-text style="padding: 0px;">{{user.username}}</v-card-text>
                        </v-row>
                        <v-row>
                            <v-card-text style="padding: 0px;">{{user.email}}</v-card-text>
                        </v-row>
                    </v-col>
                </v-container>
            </v-row>
        </v-col>
    </v-card>
</template>

<style>
    .usercard:hover{
        background-color: #62787E !important;
    }
</style>

<script>
    export default {
        name: 'UserCard',
        props: {
            user: {}
        }
    }
</script>