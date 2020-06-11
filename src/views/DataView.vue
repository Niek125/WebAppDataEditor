<template>
    <v-sheet :class="gradient" tile class="transparent">
        <v-row class="ma-0">
            <DataTable></DataTable>
            <SideBar></SideBar>
        </v-row>
    </v-sheet>
</template>

<style scoped>
    .black-gradient {
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
    }

    .white-gradient {
        background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.65));
    }
</style>

<script>
  import UpdateService from "../services/UpdateService";
  import SideBar from "../components/DataView/SideBar/SideBar";
  import DataTable from "../components/DataView/DataTable/DataTable";
  import {mapGetters, mapActions} from "vuex";

  export default {
    name: "DataView",
    computed: {
      ...mapGetters("theme", {
        gradient: "gradient",
      })
    },
    components: {
      DataTable,
      SideBar,
    },
    methods: {
      ...mapActions("project", ["load"]),
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
      let params = {id: this.$route.params.projectId,};
      // store.dispatch("project/load", params);
      // store.dispatch("data/load", params);
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
      this.load(params);
      UpdateService.connect("", "");
      // UpdateService.setadddata(this.adddata);
      // UpdateService.setupdatedata(this.editdata);
      // UpdateService.setdeletedata(this.deletedata);
    }
  }
</script>