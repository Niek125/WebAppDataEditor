<template>
    <div>
        <AddUser></AddUser>
        <UserCard v-for="data in users"
                  v-bind:key="data.id"
                  v-bind:user="data"></UserCard>
    </div>
</template>

<script>
    import UserCard from "./UserCard";
    import AddUser from "./AddUser";
    // import RoleService from "../../../services/RoleService";
    import {mapGetters} from "vuex";

    export default {
        name: "PeopleList",
        components: {
            UserCard,
            AddUser,
        },
        computed: {
            ...mapGetters("project", {
                users: "users",
            }),
        },
        data() {
            return {
                adduser: false,
            }
        },
        methods: {
            closeadd: function () {
                this.adduser = false;
            }
        },
        async created() {
            // const x = this;
            // const token = this.$session.get("jwt");
            // const projectid = this.$route.params.projectId;
            // await RoleService.getusers(projectid, token).then((request) => {
            //     x.userroles = request.data;
            // })
        }
    }
</script>