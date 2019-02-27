<template>
  <div class="row gameContainer" :class="{hide: !showpage}">
    <div class="row" :class="{hide: !hidedetail}">
      <games-list v-for="(item, i) in games" :key="i" :games="item" @showGameDetail="showGameDetail" @closeDetails="closeDetails"/>
    </div>
    <div :class="{hide: hidedetail}" ref="detailContainer">
      <game-detail :game="game" @closeDetails="closeDetails"/>
    </div>
  </div>
</template>

<script>
  import _ from "lodash";
  import GamesList from "./GamesList.vue";
  import GameDetail from "./GameDetail.vue";

  export default{
    name: "Games",
    props: ["showpage"],
    data(){
      return{
        games: [],
        game: [],
        hidedetail: true
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
        console.log(info);
        this.game = info;
      },
      closeDetails: function(bool){
        this.hidedetail = bool;
      }
    },
    components: {
      "games-list": GamesList,
      "game-detail": GameDetail
    }
  }
</script>

<style>
  .gameContainer{
    position: relative;
  }
  .hide{
    display: none;
  }
</style>
