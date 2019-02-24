<template>
    <li @click="showDetails(games.appid)">
      <h4>{{games.name}}</h4>
      <img :src="'http://media.steampowered.com/steamcommunity/public/images/apps/'+games.appid+'/'+games.img_logo_url+'.jpg'"/>
    </li>
</template>

<script>
  export default{
    name: "GamesList",
    props: ["games"],
    methods:{
      showDetails: function(appid){
        $.getJSON('http://localhost:3000/GetDetailsOfGame/?appid='+appid).done(data => {
          this.$emit("showGameDetail", data[appid.toString()].data);
        });
      }
    }
  }
</script>

<style scoped>
  .hide{
    display: none;
  }
</style>
