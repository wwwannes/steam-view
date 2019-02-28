<template>
  <div class="wrapper">
    <api-calls @allAPIloaded="allAPIloaded"/>
    <component :is="loadingScreen"/>
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
        pageComponent: "",
        loadingScreen: "loading-screen" // loading-screen is declared globally
      }
    },
    components: {
      "api-calls": APIcalls,
      "page": Page
    },
    methods:{
      allAPIloaded: function(page){
        this.doneLoading = true;
        this.loadingScreen = "";
        this.pageComponent = "page";
      }
    }
  }
</script>
