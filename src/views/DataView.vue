<template>
    <v-row class="ma-0">
        <v-sheet tile height="calc(100vh - 64px)" class="transparent overflow-x-auto" id="table"
                 :width="tab != 'closed' ? 'calc(100vw - 72px - (3.5 * (100vw /12)))' : 'calc(100vw - 72px)'">
            <v-row class="ma-0">
                <v-toolbar class="grey darken-4" flat>
                    <v-row class="ma-0">
                        <v-toolbar-title>{{project.projectName}}</v-toolbar-title>
                    </v-row>
                </v-toolbar>
            </v-row>
            <v-row class="ma-0">
                <v-toolbar flat class="grey darken-3">
                    <v-col cols="12" class="pa-0">
                        <v-row class="ma-0">
                            <v-slider v-on:input="scrollrow()" class="mx-4" dense color="white" track-color="black"
                                      v-model="scroller" min="0" :max="rowlength" :loading="sliderload"
                                      hide-details v-resize="setscrollwidth"></v-slider>
                        </v-row>
                        <v-row class="ma-0">
                            <v-hover v-slot:default="{ hover }">
                                <v-chip class="transparent transition-fast-out-slow-in"
                                        :class="hover ? 'grey darken-2' : ''">
                                    <v-flex class="flex-nowrap scrollable overflow-x-auto">
                                        <input autocomplete="off" :value="rowlength" type="text"
                                               style="outline: transparent;">
                                    </v-flex>
                                </v-chip>
                            </v-hover>
                        </v-row>
                    </v-col>
                </v-toolbar>
            </v-row>
            <v-row class="ma-0">
                <v-col cols="12" class="py-0 px-4">
                    <v-hover v-slot:default="{ hover }">
                        <v-chip :class="hover ? 'grey darken-2 my-1' : 'transparent'"
                                class="transition-fast-out-slow-in">
                            <v-flex class="flex-nowrap scrollable overflow-x-auto">
                                <input autocomplete="off" :value="rowlength" type="text" style="outline: transparent;">
                            </v-flex>
                        </v-chip>
                    </v-hover>
                </v-col>
            </v-row>
        </v-sheet>
        <v-sheet tile height="calc(100vh - 72px)" width="calc(3.5 * (100vw /12))" v-if="tab != 'closed'"
                 class="grey darken-4">
            <chat v-if="tab == 'chat'"></chat>
            <PeopleList v-else-if="tab == 'users'"></PeopleList>
        </v-sheet>
        <SideBar :set-tab="setTab" width="72px"></SideBar>
    </v-row>
</template>

<style scoped>
    #table {
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
    }
</style>

<script>
    import Chat from "../components/DataView/Chat/Chat";
    import PeopleList from "../components/DataView/UserList/PeopleList";

    import UpdateService from "../services/UpdateService";
    // import ProjectService from "../services/ProjectService";
    // import DataSetService from "../services/DataSetService";
    // import RoleService from "../services/RoleService";

    import { mapGetters } from "vuex"
    import SideBar from "../components/DataView/SideBar/SideBar";

    export default {
        name: "DataView",
        data() {
            return {
                tab: "closed",
                scroller: 0,
                rowlength: 0,
                sliderload: true,
                col1: "50px"
            }
        },
        components: {
            SideBar,
            Chat,
            PeopleList
        },
        computed: {
            ...mapGetters("project", {
                project: "project"
            })
        },
        methods: {
            setTab: function(nTab){
                this.tab == nTab ? this.tab = 'closed' : this.tab = nTab;
            },
            scrollrow: function () {
                const rows = document.getElementsByClassName("scrollable");
                for (let i = 0; i < rows.length; i++) {
                    rows[i].scrollLeft = this.scroller;
                }
            },
            setscrollwidth: function () {
                // const element = document.getElementsByClassName("scrollable").item(0);
                // this.rowlength = element.scrollWidth - element.offsetWidth;
            },
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
            this.setscrollwidth();
            this.sliderload = false;


            // const x = this;
            // const token = this.$session.get("jwt");
            // const projectid = this.$route.params.projectid;
            //
            // await ProjectService.getProject(projectid, token).then((request) => {
            //     x.project.project = request.data;
            // });
            //
            // DataSetService.getdata(projectid, token).then((req) => {
            //     x.project.data = req.data;
            //     x.loading = false;
            // })
            // RoleService.getusers(projectid, token).then((request) => {
            //     x.userroles = request.data;
            // })
            //
            // UpdateService.connect(this.project.project.projectid, token);
            // UpdateService.setadddata(this.adddata);
            // UpdateService.setupdatedata(this.editdata);
            // UpdateService.setdeletedata(this.deletedata);
        }
    }
</script>