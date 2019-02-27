<template>
    <div class="col-md-3 text-center" @click="showDetails(games.appid)">
      <div class="card">
        <div class="card-body">
          <div class="author">
            <h5 class="title">{{games.name}}</h5>
            <img :src="'http://media.steampowered.com/steamcommunity/public/images/apps/'+games.appid+'/'+games.img_logo_url+'.jpg'"/>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default{
    name: "GamesList",
    props: ["games"],
    methods:{
      showDetails: function(appid){
        $.getJSON('http://localhost:3000/GetDetailsOfGame/?appid='+appid).done(data => {
          this.$emit("showGameDetail", data[appid.toString()].data);
          this.$emit('closeDetails', false);
        });
      }
    }
  }
</script>

<style scoped>
  .card{
    cursor: pointer;
  }
  .card:hover{
    background: linear-gradient(0deg,#ba54f5,#e14eca);
  }
</style>
