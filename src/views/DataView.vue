<template>
    <div>
        <v-row>
            <v-app-bar color="#5eff81">
                <v-row>
                    <v-col cols="12">
                        <v-card-title>{{project.project.projectname}}</v-card-title>
                    </v-col>
                </v-row>
            </v-app-bar>
        </v-row>
        <v-row>
            <v-col cols="8">
                <v-card class="lr-m" color="red">
                    <v-text-field label="Message" value="..." color="white" style="width: 80%"
                                  append-icon="fas fa-paper-plane"></v-text-field>
                </v-card>
            </v-col>
            <v-col cols="4" style="padding-top: 0px;">
                <v-card color="orange">
                    <v-row>
                        <v-col class="lr-m" cols="5">
                            <v-btn width="100%" v-on:click="chatActive = true">Chat</v-btn>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col class="lr-m" cols="5">
                            <v-btn width="100%" v-on:click="chatActive = false">People</v-btn>
                        </v-col>
                    </v-row>
                    <v-row v-if="chatActive">
                        <v-col cols="12">
                            <v-row id="scroll" style="max-height: 64vh; min-height: 64vh; overflow-y: scroll;">
                                <v-col cols="12">
                                    <ChatMessage v-for="data in project.chat" v-bind:key="data.messageid"
                                                 v-bind:content="data.content" v-bind:sendtime="data.sendtime"
                                                 v-bind:senderid="data.senderid"
                                                 v-bind:getusers="getusers"></ChatMessage>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <div class="center-div">
                                        <v-spacer></v-spacer>
                                        <v-text-field v-model="input" @keyup.enter.native="send(input)" color="white"
                                                      @click:append="send()" counter maxlength="256"
                                                      placeholder="Message..." outlined filled dense rounded
                                                      append-icon="fas fa-paper-plane"></v-text-field>
                                        <v-spacer></v-spacer>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row v-else>
                        <v-col cols="12" style="min-height: 80vh; max-height: 80vh;">
                            <UserCard v-for="data in project.users" v-bind:key="data.userid" v-bind:userid="data.userid"
                                      v-bind:username="data.username"
                                      v-bind:profilepicture="data.profilepicture"></UserCard>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import ChatMessage from "../components/ChatMessage";
    import UserCard from "../components/UserCard";

    import UpdateService from "../services/UpdateService";
    import ProjectService from "../services/ProjectService";
    import RoleService from "../services/RoleService";

    const uuidv1 = require('uuid/v1');

    export default {
        name: "DataView",
        data() {
            return {
                project: {
                    project: {},
                    chat: [],
                    users: {}
                },
                chatActive: true,
                input: "",
                messagedelta: Infinity
            }
        },
        components: {
            ChatMessage,
            UserCard
        },
        methods: {
            getusers: function () {
                return this.project.users;
            },
            updateScroll: function () {
                var element = document.getElementById("scroll");
                element.scrollTop = element.scrollHeight;
            },
            send: function () {
                if (this.input.length > 0) {
                    var message = {
                        content: this.input,
                        messageid: uuidv1()
                    }
                    var options = {
                        object: "message",
                        action: "CREATE"
                    }
                    UpdateService.sendMessage(JSON.stringify(options) + "\n" + JSON.stringify(message));
                    this.input = "";
                }
            },
            addmessage: function (message) {
                try {
                    window.console.log(message);
                    var x = this;
                    var element = document.getElementById("scroll");
                    var scroll = (element.scrollTop - element.scrollHeight) >= this.messagedelta;
                    this.messagedelta = element.scrollTop - element.scrollHeight - 1;
                    this.project.chat.push(message);
                    window.console.log()
                    if (scroll) {
                        setTimeout(function () {
                            x.updateScroll()
                        }, 50);
                    }
                } catch (e) {
                    window.console.log(e);
                }

            }
        },
        async mounted() {
            var token = this.$session.get("jwt");
            var projectid = this.$route.params.projectid;
            await ProjectService.getProject(projectid, token).then((request) => {
                this.project.project = request.data;
            });
            RoleService.getUsers(projectid, token).then((request) => {
                this.project.users = request.data;
            })

            //var element = document.getElementById("scroll");
            //this.updateScroll();
            //this.messagedelta = element.scrollTop - element.scrollHeight + 1;

            UpdateService.connect(this.project.project.projectid, this.addmessage, token);
        }
    }


</script>