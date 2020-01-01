<template>
    <div>
        <v-row>
            <v-col cols="8" class="pa-0">
                <v-card class="lr-m" color="#7D7F84">
                    <v-data-table
                            :dense="dense"
                            :loading="loading"
                            loading-text="Loading... Please wait"
                            :search="search"
                            hide-default-footer
                            multi-sort style="background-color: transparent;"
                            height="calc(100vh - 64px - 64px)"
                            class="lr-m"
                            :headers="project.data.headers.concat([{text: 'Actions', value: 'action', sortable: false}])"
                            :items="project.data.items"
                            :items-per-page="Infinity"
                            fixed-header>
                        <template v-slot:top>
                            <v-toolbar flat color="#7D7F84">
                                <v-toolbar-title>{{project.project.projectname}}</v-toolbar-title>
                                <v-divider vertical style="margin-left: 16px; margin-right: 16px;"></v-divider>
                                <v-spacer></v-spacer>
                                <v-text-field hide-details v-model="search" append-icon="fas fa-search" label="Search"
                                              single-line></v-text-field>
                                <v-divider vertical style="margin-left: 16px; margin-right: 16px;"></v-divider>
                                <v-switch hide-details v-model="dense" label="Dense"></v-switch>
                                <v-divider vertical style="margin-left: 16px; margin-right: 16px;"></v-divider>
                                <v-dialog v-model="dialog" max-width="80vw" overlay-opacity="0">
                                    <template v-slot:activator="{ on }">
                                        <v-btn color="#00C896" class="mb-2" v-on="on">New Item</v-btn>
                                    </template>
                                    <EditRow v-bind:edited-item="editedItem" v-bind:headers="project.data.headers"
                                             v-bind:close="close" v-bind:save="save"></EditRow>
                                </v-dialog>
                            </v-toolbar>
                        </template>
                        <template v-slot:item.action="{ item }">
                            <v-icon small class="mr-2" @click="editItem(item)">fas fa-pencil-alt</v-icon>
                            <v-icon small @click="deleteItem(item)">fas fa-trash</v-icon>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
            <v-col cols="4" style="padding-top: 0px;" class="pa-0">
                <PeopleChatMenu></PeopleChatMenu>
            </v-col>
        </v-row>
    </div>
</template>

<style>

    th{
        background-color: #7D7F84 !important;
    }

    tr:hover {
        background-color: #707B83 !important;
    }
</style>

<script>
    import PeopleChatMenu from "../components/PeopleChatMenu";
    import EditRow from "../components/EditRow";

    import UpdateService from "../services/UpdateService";
    import ProjectService from "../services/ProjectService";
    import DataSetService from "../services/DataSetService";

    export default {
        name: "DataView",
        data() {
            return {
                project: {
                    project: {},
                    data: {
                        headers: [],
                        items: []
                    }
                },
                dialog: false,
                edituser: {},
                messagedelta: Infinity,
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
            EditRow,
            PeopleChatMenu,
        },
        methods: {
            close: function () {
                this.dialog = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },
            save() {
                if (this.editedIndex > -1) {
                    Object.assign(this.project.data.items[this.editedIndex], this.editedItem)
                } else {
                    this.project.data.items.push(this.editedItem)
                }
                this.close()
            },
            updateScroll: function () {
                var element = document.getElementById("scroll");
                element.scrollTop = element.scrollHeight;
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
            },
            editItem(item) {
                this.editedIndex = this.project.data.items.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                const index = this.project.data.items.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.project.data.items.splice(index, 1)
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

            //var element = document.getElementById("scroll");
            //this.updateScroll();
            //this.messagedelta = element.scrollTop - element.scrollHeight + 1;

            UpdateService.connect(this.project.project.projectid, this.addmessage, token);
        }
    }
</script>