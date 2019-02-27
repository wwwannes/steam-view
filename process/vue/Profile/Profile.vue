<template>
  <div :class="{hide: !showpage}" class="row">
    <profile-data/>
    <friends-list/>
  </div>
</template>

<script>

  import Friendslist from './FriendsData.vue';
  import ProfileData from './ProfileData.vue';

  export default{
    name: "Profile",
    props: ["showpage"],
    components: {
      "friends-list": Friendslist,
      "profile-data": ProfileData
    }
  }
</script>
