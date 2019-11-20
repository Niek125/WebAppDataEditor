<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import data from './apptest'

export default {
  data(){
    return{
      appData: data
    }
  }
};
</script>
