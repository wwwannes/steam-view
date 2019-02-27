<template>
  <div class="wrapper">
    <api-calls @allAPIloaded="allAPIloaded"/>
    <component :is="pageComponent"/>
  </div>
</template>

<script>
  import APIcalls from "../General/APIcalls.vue";
  import Page from "../General/Page.vue";

  export default{
    name: "Loggedin",
    data(){
      return{
        page: "dashboard",
        doneLoading: false,
        pageComponent: ""
      }
    },
    components: {
      "api-calls": APIcalls,
      "page": Page
    },
    methods:{
      allAPIloaded: function(page){
        this.doneLoading = true;
        this.pageComponent = "page";
      }
    }
  }
</script>
