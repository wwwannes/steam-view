<template>
  <div>
    <profile-data/>
    <dashboard/>
    <games/>
  </div>
</template>

<script>
  import ProfileData from "./profile/ProfileData.vue";
  import Dashboard from "./Widgets/Dashboard.vue";
  import Games from "./Games/Games.vue";

  export default{
    name: "App",
    components: {
      "profile-data": ProfileData,
      "dashboard": Dashboard,
      "games": Games,
    }
  }
</script>
