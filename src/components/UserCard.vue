<template>
    <v-card color="pink" class="lr-m tb-m">
        <v-col cols="12">
            <v-row>
                <v-col cols="3">
                    <div class="center-div">
                        <v-img max-height="32" max-width="32" style="border-radius: 32px;"
                               v-bind:src="profilepicture"></v-img>
                    </div>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="8">
                    <v-card-text style="padding: 0px;">{{username}}</v-card-text>
                </v-col>
            </v-row>
        </v-col>
    </v-card>
</template>

<script>
    export default {
        name: 'UserCard',
        props: {
            userid: String,
            profilepicture: String,
            username: String
        }
    }
</script>