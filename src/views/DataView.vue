<template>
    <div>
        <TextTest  :key="'0909'" v-bind:myvalue="this.$parent.$parent.appData.test2"></TextTest>
    </div>
</template>

<script>
    import TextTest from './TextTest.vue'
    export default {
        name: "Test",
        components: {TextTest}
    }
</script>