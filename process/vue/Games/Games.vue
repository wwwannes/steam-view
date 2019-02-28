<template>
  <div class="row gameContainer" :class="{hide: !showpage}">
    <component :is="loadingScreen"/>

    <div class="alert alert-danger" :class="{hide: !error}">
      <button type="button" aria-hidden="true" class="close" @click="closeError">
        <b>x</b>
      </button>
      <span>No data found for <b>{{gameName}}</b></span>
    </div>

    <div class="game-list row" :class="{hide: !hidedetail, opacity: opacity, noClick: error}">
      <games-list v-for="(item, i) in games" :key="i" :games="item" @showLoadingscreen="showLoadingscreen" @showGameDetail="showGameDetail"/>
    </div>
    <div :class="{hide: hidedetail}" ref="detailContainer">
      <game-detail :game="game" :gamePlaytime="gamePlaytime" @closeDetails="closeDetails"/>
    </div>
  </div>
</template>

<script>
  import GamesList from "./GamesList.vue";
  import GameDetail from "./GameDetail.vue";

  export default{
    name: "Games",
    props: ["showpage"],
    data(){
      return{
        gameName: "",
        game: [],
        gamePlaytime: 0,
        hidedetail: true,
        loadingScreen: "",
        loading: false,
        error: false,
        opacity: false
      }
    },
    dependencies: ["games"],
    methods:{
      showLoadingscreen: function(name){
        this.gameName = name;
        this.loading = true;
        this.opacity = true;
        this.loadingScreen = "loading-screen"; // loading-screen is declared globally
      },
      showGameDetail: function(info, playtime){
        if(info !== undefined){
          this.gamePlaytime = playtime;
          this.game = info;
          this.loadingScreen = "";
          this.loading = false;
          this.hidedetail = false;
          this.error = false;
          this.opacity = false;
          $('html, body').animate({scrollTop:0}, 500, 'swing');
        } else {
          this.loadingScreen = "";
          this.loading = false;
          this.error = true;
          this.opacity = true;
        }
      },
      closeDetails: function(bool){
        this.hidedetail = bool;
      },
      closeError: function(){
        this.error = false;
        this.opacity = false;
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
  .opacity{
    opacity: 0.3;
  }
  .error{
    opacity: 0.3;
  }

  .noClick{
    pointer-events: none;
  }

  .alert-danger{
    z-index: 999;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }
</style>
