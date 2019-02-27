<template>
  <div class="col-lg-6">
    <div class="card card-chart">
      <div class="card-header">
        <h3 class="card-title">Most played <sup>in days</sup></h3>
      </div>
      <div class="card-body">
        <div class="chart-area">
          <canvas id="mostPlayed" ref="mostPlayed" width="400" height="400"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from "lodash";

  export default{
    name: "MostPlayedGames",
    data(){
      return{
        mostPlayedGames: []
      }
    },
    dependencies: ["games"],
    mounted: function(){
      //make chart
      var ctx = this.$refs.mostPlayed.getContext('2d');

      var recentGamesName = [];
      var recentGamesMinutes = [];

      var orderedGames = _.orderBy(this.games, function(item){ // Lodash ordering by name
        return item["playtime_forever"];
      }, "desc");

      for(var i = 0; i < 5; i++){
        recentGamesName.push( orderedGames[i].name );
        recentGamesMinutes.push( (orderedGames[i].playtime_forever/60/24).toFixed(2));
      }

      var myPieChart = new Chart(ctx,{
        type: 'bar',
        data: {
          labels: recentGamesName,
          datasets: [{
            data: recentGamesMinutes,
            backgroundColor: [
              '#1b2838',
              '#24374e',
              '#2d4461',
              '#334f72',
              '#375982'
            ],
            borderWidth: 0
          }]
        },
        options: {
          maintainAspectRatio: false
        }
      });
    }
  }
</script>
