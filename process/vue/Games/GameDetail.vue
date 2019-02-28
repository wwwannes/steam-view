<template>
  <div class="col-md-12 gameDetail">
    <div class="card">
      <button @click="closeDetails" class="close"><i class="fa fa-window-close"></i></button>
      <div class="card-header text-center" v-if="game.background" :style="{'backgroundImage' : 'url('+game.background+')'}">
        <h2 class="title" v-if="game.name">{{game.name}}</h2>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-3 info">
            <div class="mb">
              <b class="">Total hours played</b><br/>
              <span>{{gamePlaytime}} hours</span><br/>
            </div>
            <div class="mb">
              <b class="">Achievements progress</b><br/>
              <span><b>{{achievementsUnlocked}}</b> out of {{totalAchievements}}</span><br/>
            </div>
            <div class="mb" v-if="game.developers">
              <b class="">Developers</b><br/>
              <ul>
                <li v-for='item in game.developers'>{{item}}</li>
              </ul>
            </div>
            <div class="mb" v-if="game.genres">
              <b class="">Genres</b><br/>
              <ul class="genres">
                <li v-for="item in game.genres" class="col-md-6">{{item.description}}</li>
              </ul>
            </div>
            <div v-if="game.metacritic" class="score mb">
              <b class="scoreTitle">Score</b>
              <a :href="game.metacritic.url" target="_blank">{{game.metacritic.score}}</a>
            </div>
            <div class="mb" v-if="game.release_data">
              <b>Release data</b>
              <p>{{game.release_data.date}}</p>
            </div>
          </div>
          <div class="col-md-9">
            <p v-html="game.about_the_game" v-if="game.about_the_game"></p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="row categories">
              <b class="col-md-12">Tags</b>
              <div class="col-md-2" v-for="item in game.categories" v-if="game.categories">
                <span>{{item.description}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: "GameDetail",
    data(){
      return{
        totalAchievements: 0,
        achievementsUnlocked: 0
      }
    },
    props: ["game", "gamePlaytime"],
    dependencies: ["apikey", "userid"],
    watch: {
      gamePlaytime: function(){
        $.getJSON('http://localhost:3000/GetPlayerAchievements/?key='+this.apikey+'&steamid='+this.userid+'&appid='+this.game.steam_appid).done(data => {
          this.totalAchievements = data.playerstats.achievements.length;
          this.achievementsUnlocked = 0;
          for(var i = 0; i < data.playerstats.achievements.length; i++){
            if( data.playerstats.achievements[i].achieved === 1 ){
              this.achievementsUnlocked++;
            }
          }
        });
      }
    },
    mounted: function(){

    },
    methods:{
      closeDetails: function(){
        this.$emit('closeDetails', true);
      }
    }
  }
</script>

<style scoped>
  .gameDetail{
    position: absolute;
    width: 100%;
  }

  .mb{
    margin-bottom: 20px;
  }

  .close{
    position: absolute;
    right: 30px;
    top: 30px;
    z-index: 99;
    color: white;
  }

  .card-header{
    height: 350px;
    position: relative;
  }

  .card-header .title{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .genres{
    padding: 0;
  }
  .genres li{
    padding-left: 0;
    list-style: none;
    display: inline-block;
  }

  .score{
    position:relative;
    margin-top: 60px;
  }
  .scoreTitle{
    position:relative;
    margin-bottom: 10px;
    display: block;
  }
  .score a{
    font-size: 2rem;
    color: white;
    border: 2px solid #525f7f;
    border-radius: 50%;
    padding: 10px;
    width: 70px;
    height: 70px;
    display: block;
    text-align: center;
  }

  .score a:hover{
    background: #525f7f;
  }

  span{
    color: white;
  }

  .categories span{
    font-size: 12px;
    color: #525f7f;
    font-style: italic;
  }
</style>
