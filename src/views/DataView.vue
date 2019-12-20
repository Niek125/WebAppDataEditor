<template>
    <div>
        <v-row>
            <v-col cols="8" class="pa-0">
                <v-card class="lr-m" color="#7D7F84">
                    <v-card-title>{{project.project.projectname}}
                        <v-spacer></v-spacer>
                        <v-text-field
                                v-model="search"
                                append-icon="fas fa-search"
                                label="Search"
                                single-line
                                hide-details
                        ></v-text-field>
                    </v-card-title>
                    <v-data-table style="background-color: transparent;" hide-default-footer
                                  height="calc(100vh - 64px - 80px)" class="lr-m" :headers="project.data.headers"
                                  :items="project.data.items"></v-data-table>
                </v-card>
            </v-col>
            <v-col cols="4" style="padding-top: 0px;" class="pa-0">
                <PeopleChatMenu v-bind:userroles="project.userroles" v-bind:chat="project.chat"></PeopleChatMenu>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import PeopleChatMenu from "../components/PeopleChatMenu";

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
                    userroles: [],
                    data: {
                        headers: [],
                        items: []
                    }
                },
                edituser: {},
                messagedelta: Infinity,
                search: null
            }
        },
        components: {
            PeopleChatMenu
        },
        methods: {
            updateScroll: function () {
                var element = document.getElementById("scroll");
                element.scrollTop = element.scrollHeight;
            },
            send: function () {
                if (this.input.length > 0) {
                    const message = {
                        content: this.input,
                        messageid: uuidv1()
                    };
                    const options = {
                        object: "message",
                        action: "CREATE"
                    };
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
            RoleService.getusers(projectid, token).then((request) => {
                this.project.userroles = request.data;
            })

            this.project.data.headers = [
                {text: 'Dessert (100g serving)', value: 'name'},
                {text: 'Calories', value: 'calories'},
                {text: 'Fat (g)', value: 'fat'},
                {text: 'Carbs (g)', value: 'carbs'},
                {text: 'Protein (g)', value: 'protein'},
                {text: 'Iron (%)', value: 'iron'}]

            this.project.data.items = [
                {
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    iron: '1%',
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    iron: '1%',
                },
                {
                    name: 'Eclair',
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                    iron: '7%',
                },
                {
                    name: 'Cupcake',
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                    iron: '8%',
                },
                {
                    name: 'Gingerbread',
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                    iron: '16%',
                },
                {
                    name: 'Jelly bean',
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                    iron: '0%',
                },
                {
                    name: 'Lollipop',
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                    iron: '2%',
                },
                {
                    name: 'Honeycomb',
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                    iron: '45%',
                },
                {
                    name: 'Donut',
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                    iron: '22%',
                },
                {
                    name: 'KitKat',
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                    iron: '6%',
                },
            ]

            //var element = document.getElementById("scroll");
            //this.updateScroll();
            //this.messagedelta = element.scrollTop - element.scrollHeight + 1;

            UpdateService.connect(this.project.project.projectid, this.addmessage, token);
        }
    }


</script>