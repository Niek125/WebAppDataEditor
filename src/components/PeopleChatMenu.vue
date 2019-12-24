<template>
    <v-card color="#7D7F84">
        <v-row>
            <v-spacer></v-spacer>
            <v-col cols="10">
                <v-row>
                    <v-col class="lr-m" cols="5">
                        <v-btn color="#F2ECFF" width="100%" v-on:click="chatActive = true">Chat</v-btn>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="lr-m" cols="5">
                        <v-btn color="#00C896" width="100%" v-on:click="chatActive = false">People
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        <v-divider></v-divider>
        <v-row>
            <v-col cols="12" style="height: calc(100vh - 64px - 84px - 1px)">
                <Chat v-if="chatActive" v-bind:users="userroles.map(x => x.user)"></Chat>
                <PeopleList v-else v-bind:userroles="userroles"></PeopleList>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    import Chat from "./Chat";
    import PeopleList from "./PeopleList";
    import RoleService from "../services/RoleService";

    export default {
        name: "PeopleChatMenu",
        components: {
            Chat,
            PeopleList
        },
        data() {
            return {
                popup: "",
                chatActive: false,
                projectid: this.$route.params.projectid,
                input: "",
                userroles: []
            }
        },
        created() {
            const x = this;
            const token = this.$session.get("jwt");
            const projectid = this.$route.params.projectid;
            RoleService.getusers(projectid, token).then((request) => {
                x.userroles = request.data;
            })
        }
    }
</script>