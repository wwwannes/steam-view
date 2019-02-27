<template>
  <div>
    <h3>Most Played</h3>
    <ul>
      <li v-for="item in recentGames">
        <b>{{item.name}}: </b>
        <span>{{item.playtime_2weeks}} minutes</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default{
    name: "MostPlayedGames",
    data(){
      return{
        mostPlayedGames: []
      }
    },
    dependencies: ["apikey", "userid"],
    created: function(){
      $.getJSON('http://localhost:3000/GetPlayerAchievements/?key='+this.apikey+'&steamid='+this.userid+'&appid=550').done(data => {
        this.mostPlayedGames = data;
      });
    }
  }
</script>
