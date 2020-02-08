<template>
    <div>
        <AddUser></AddUser>
        <UserCard v-for="data in userroles"
                  v-bind:key="data.user.userid"
                  v-bind:user="data.user"></UserCard>
    </div>
</template>

<script>
    import UserCard from "./UserCard";
    import AddUser from "./AddUser";
    import RoleService from "../../../services/RoleService";

    export default {
        name: "PeopleList",
        components: {
            UserCard,
            AddUser,
        },
        props: {
            userroles: Array
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
            const x = this;
            const token = this.$session.get("jwt");
            const projectid = this.$route.params.projectId;
            await RoleService.getusers(projectid, token).then((request) => {
                x.userroles = request.data;
            })
        }
    }
</script>