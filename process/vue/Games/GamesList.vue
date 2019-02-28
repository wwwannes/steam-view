<template>
    <div class="col-md-3 col-sm-4 text-center" @click="showDetails(games.appid, games.name, games.playtime_forever)">
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
      showDetails: function(appid, name, playtime){
        var hoursPlayed = Math.round(playtime/60);
        this.$emit('showLoadingscreen', name);
        
        $.getJSON('http://localhost:3000/GetDetailsOfGame/?appid='+appid).done(data => {
          this.$emit("showGameDetail", data[appid.toString()].data, hoursPlayed);
          this.$emit('closeDetails', false);
        });
      }
    }
  }
</script>
