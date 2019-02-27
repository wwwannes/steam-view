<template>
  <div class="content">
    <dashboard :showpage="showdashboard"/>
    <games :showpage="showgames"/>
    <profile-data :showpage="showprofile"/>
  </div>
</template>

<script>
  import ProfileData from "../Profile/Profile.vue";
  import Dashboard from "../Widgets/Dashboard.vue";
  import Games from "../Games/Games.vue";

  export default{
    name: "Content",
    data(){
      return{
        showdashboard: true,
        showgames: false,
        showprofile: false
      }
    },
    props: ["pagetoshow"],
    components: {
      "profile-data": ProfileData,
      "dashboard": Dashboard,
      "games": Games,
    },
    watch:{ //check if the value of the props change
      pagetoshow: function(page){
        if(page == "dashboard"){
          this.showdashboard = true;
          this.showgames = this.showprofile = false;
        } else if(page == "games"){
          this.showgames = true;
          this.showdashboard = this.showprofile = false;
        } else if(page == "profile"){
          this.showprofile = true;
          this.showdashboard = this.showgames = false;
        }
      }
    }
  }
</script>
