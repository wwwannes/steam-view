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
            <div  v-if="game.developers">
              <b class="">Developers</b><br/>
              <ul>
                <li v-for='item in game.developers'>{{item}}</li>
              </ul>
            </div>
            <div v-if="game.genres">
              <b class="">Genres</b><br/>
              <ul>
                <li v-for="item in game.genres" class="col-md-6">{{item.description}}</li>
              </ul>
            </div>
            <div v-if="game.metacritic">
              <b class="">Score</b><br/>
              <a :href="game.metacritic.url" target="_blank">{{game.metacritic.score}}/100</a>
            </div>
            <!--<div>
              <b>Release data</b>
              <p>{{game.release_data.date}}</p>
            </div>-->
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
    props: ["game"],
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

  .categories span{
    font-size: 12px;
  }
</style>
