<template>
  <div class="wrapper">
    <side-menu @showpage="showpage"/>
    <div class="main-panel">
      <topbar :pagetoshow="page"/>
      <content-container :pagetoshow="page"/>
    </div>
  </div>
</template>

<script>
  import Topbar from "../Topbar.vue";
  import Menu from "../Menu.vue";
  import Content from "../Content.vue";

  export default{
    name: "Loggedin",
    data(){
      return{
        page: "dashboard"
      }
    },
    components: {
      "topbar": Topbar,
      "side-menu": Menu,
      "content-container": Content,
    },
    methods:{
      showpage: function(page){
        this.page = page;
      }
    }
  }
</script>
