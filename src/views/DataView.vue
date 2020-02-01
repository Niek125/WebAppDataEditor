<template>
    <v-row class="ma-0">
        <v-sheet tile height="calc(100vh - 64px)" class="transparent"
                 :width="tab != 'closed' ? 'calc(100vw - 64px - (3.5 * (100vw /12)))' : 'calc(100vw - 64px)'">
            <v-data-table
                    id="table"
                    :dense="dense"
                    :loading="loading"
                    loading-text="Loading... Please wait"
                    :search="search"
                    hide-default-footer
                    multi-sort
                    class="transparent"
                    height="calc(100vh - 64px - 64px)"
                    :headers="project.data.headers"
                    :items="project.data.items"
                    :items-per-page="Infinity">
                <template v-slot:top>
                    <v-toolbar class="grey darken-4" flat>
                        <v-col> <v-toolbar-title>{{project.project.projectname}}</v-toolbar-title></v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="5">
                            <v-text-field hide-details v-model="search" append-icon="mdi-magnify" label="Search"
                                          single-line class="grey darken-3 px-3"></v-text-field>
                        </v-col>
                    </v-toolbar>
                </template>
            </v-data-table>
        </v-sheet>
        <v-sheet tile height="calc(100vh - 64px)" width="calc(3.5 * (100vw /12))" v-if="tab != 'closed'"
                 class="grey darken-4">
            <chat v-if="tab == 'chat'"></chat>
            <PeopleList v-else-if="tab == 'users'"></PeopleList>
        </v-sheet>
        <v-sheet class="black" width="64px" height="calc(100vh - 64px)" tile>
            <v-list class="black">
                <v-list-item class="px-3">
                    <v-hover v-slot:default="{ hover }">
                        <v-list-item-avatar v-on:click="tab == 'chat' ? tab = 'closed' : tab = 'chat'"
                                            :class="hover ? 'grey darken-3' : 'black'">
                            <v-icon>mdi-message</v-icon>
                        </v-list-item-avatar>
                    </v-hover>
                </v-list-item>
                <v-list-item class="px-3">
                    <v-hover v-slot:default="{ hover }">
                        <v-list-item-avatar v-on:click="tab == 'users' ? tab = 'closed' : tab = 'users'"
                                            :class="hover ? 'grey darken-3' : 'black'">
                            <v-icon>mdi-account-group</v-icon>
                        </v-list-item-avatar>
                    </v-hover>
                </v-list-item>
            </v-list>
        </v-sheet>
    </v-row>
</template>

<style>
    #table {
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
    }

    th {
        background-color: #424242 !important;
    }

    tr:hover {
        background-color: #616161 !important;
    }
</style>

<script>
    // import PeopleChatMenu from "../components/PeopleChatMenu";
    // import EditRow from "../components/EditRow";

    import Chat from "../components/DataView/Chat/Chat";
    import PeopleList from "../components/DataView/UserList/PeopleList";

    import UpdateService from "../services/UpdateService";
    import ProjectService from "../services/ProjectService";
    import DataSetService from "../services/DataSetService";
    import RoleService from "../services/RoleService";

    export default {
        name: "DataView",
        data() {
            return {
                tab: "closed",
                x: 0,
                project: {
                    project: {},
                    data: {
                        headers: [],
                        items: []
                    }
                },
                dialog: false,
                userroles: [],
                edituser: {},
                search: "",
                loading: true,
                dense: false,
                editedItem: {
                    name: '',
                    calories: 0,
                    fat: 0,
                    carbs: 0,
                    protein: 0,
                },
                defaultItem: {
                    name: '',
                    calories: 0,
                    fat: 0,
                    carbs: 0,
                    protein: 0,
                },
                editedIndex: -1
            }
        },
        components: {
            // EditRow,
            // PeopleChatMenu,
            Chat,
            PeopleList
        },
        methods: {
            close: function () {
                this.dialog = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },
            editdata: function (data) {
                Object.assign(this.project.data.items[data.rownumber], data.row)
            },
            adddata: function (row) {
                this.project.data.items.push(row.row)
            },
            deletedata: function (rownumber) {
                this.project.data.items.splice(rownumber.rownumber, 1)
            },
            save() {
                if (this.editedIndex > -1) {
                    const header = {
                        payload: "data",
                        action: "UPDATE"
                    }
                    const payload = {
                        rownumber: this.editedIndex,
                        row: this.editedItem
                    }
                    UpdateService.sendMessage(JSON.stringify(header) + "\n" + JSON.stringify(payload))
                } else {
                    const header = {
                        payload: "data",
                        action: "CREATE"
                    }
                    const payload = {
                        row: this.editedItem
                    }
                    UpdateService.sendMessage(JSON.stringify(header) + "\n" + JSON.stringify(payload));
                }
                this.close()
            },
            editItem(item) {
                this.editedIndex = this.project.data.items.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true;
            },
            deleteItem(item) {
                const index = this.project.data.items.indexOf(item)
                const header = {
                    payload: "data",
                    action: "DELETE"
                }
                const payload = {
                    rownumber: index,
                }
                UpdateService.sendMessage(JSON.stringify(header) + "\n" + JSON.stringify(payload));
            },
        },
        async mounted() {
            const x = this;
            const token = this.$session.get("jwt");
            const projectid = this.$route.params.projectid;

            await ProjectService.getProject(projectid, token).then((request) => {
                x.project.project = request.data;
            });

            DataSetService.getdata(projectid, token).then((req) => {
                x.project.data = req.data;
                x.loading = false;
            })
            RoleService.getusers(projectid, token).then((request) => {
                x.userroles = request.data;
            })

            UpdateService.connect(this.project.project.projectid, token);
            UpdateService.setadddata(this.adddata);
            UpdateService.setupdatedata(this.editdata);
            UpdateService.setdeletedata(this.deletedata);
        }
    }
</script>