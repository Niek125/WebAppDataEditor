<template>
    <h1>{{myvalue}}</h1>
</template>


<script>
    export default {
        name: "TextTest",
        props: {
            myvalue: String
        }
    }
</script>