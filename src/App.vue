<template>
  <v-app>
    <core-filter v-show="query!=='/login'"/>

    <core-toolbar v-show="query!=='/login'"/>

    <core-drawer v-show="query!=='/login'"/>

    <core-view />
  </v-app>
</template>
<script>
export default {
  data () {
    return {
      query: ''
    }
  },
  watch: {
    '$route' (val) {
      this.query = val.path
    }
  }
}
</script>
<style lang="scss">
@import 'styles/index';
#app{
  height: 100%;
  width: 100%;
  /*background: url("https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-4.3b7e38ed.jpg")100% 100% ;*/
}
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>
