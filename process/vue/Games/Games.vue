<template>
  <div>
    <h4>Games</h4>
    <ul>
      <games-list v-for="item in games" :games="item" @showGameDetail="showGameDetail"/>
    </ul>
    <game-detail :game="game"/>
  </div>
</template>

<script>

  import _ from "lodash";
  import GamesList from "./GamesList.vue";
  import GameDetail from "./GameDetail.vue";

  export default{
    name: "Games",
    data(){
      return{
        games: [],
        game: []
      }
    },
    dependencies: ["apikey", "userid"],
    created: function(){
      $.getJSON('http://localhost:3000/GetOwnedGames/?key='+this.apikey+'&steamid='+this.userid).done(data => {
        this.games = _.orderBy(data.response.games, function(item){ // Lodash ordering by name
          return item["name"].toLowerCase();
        });
      });
    },
    methods:{
      showGameDetail: function(info){
        this.game = info;
      }
    },
    components: {
      "games-list": GamesList,
      "game-detail": GameDetail
    }
  }
</script>
