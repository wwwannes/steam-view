<template>
  <div class="col-lg-4">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Total achievements</h3>
      </div>
      <div class="card-body text-center">
        <h3>{{achievements}}</h3>
        <span>Average of ... per game</span>
      </div>
    </div>
  </div>
</template>

<script>

  import _ from "lodash";

  export default{
    name: "TotalAchievements",
    data(){
      return{
        achievements: 0,
        totalGames: 0
      }
    },
    dependencies: ["apikey", "userid"],
    created: function(){
      var allGames = []
      $.getJSON('http://localhost:3000/GetOwnedGames/?key='+this.apikey+'&steamid='+this.userid).done(data => {
        for(var i = 0; i < data.response.games.length; i++){
          this.totalGames ++;
          $.getJSON('http://localhost:3000/GetPlayerAchievements/?key='+this.apikey+'&steamid='+this.userid+'&appid='+data.response.games[i].appid).done(achievement => {
            if(achievement.playerstats.achievements !== undefined){
              for(var j = 0; j < achievement.playerstats.achievements.length; j++){
                //if(achievement.playerstats.achievements[j].achieved){
                  this.achievements ++;
                //}
              }
            }
          });
        }
      });
    }
  }
</script>
