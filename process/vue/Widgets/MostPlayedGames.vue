<template>
  <div>
    <h3>Most Played Globaly</h3>
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
    name: "LastPlayedGames",
    data(){
      return{
        recentGames: []
      }
    },
    dependencies: ["apikey", "userid"],
    created: function(){
      $.getJSON('http://localhost:3000/GetRecentlyPlayedGames/?key='+this.apikey+'&steamid='+this.userid).done(data => {
        this.recentGames = data.response.games;
      });
    }
  }
</script>
