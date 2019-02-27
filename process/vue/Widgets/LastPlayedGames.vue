<template>
  <div class="col-lg-4">
    <div class="card card-chart">
      <div class="card-header">
        <h3 class="card-title">Recently played (minutes played)</h3>
      </div>
      <div class="card-body">
        <div class="chart-area">
          <canvas id="recentGames" ref="recentGames" width="400" height="400"></canvas>
        </div>
      </div>
    </div>
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
    dependencies: ["apikey", "userid", "loggedin"],
    watch:{
      loggedin: function(){
        $.getJSON('http://localhost:3000/GetRecentlyPlayedGames/?key='+this.apikey+'&steamid='+this.userid).done(data => {
          this.recentGames = data.response.games
        });
      },
      //make graph after JSON data is available
      recentGames: function(){
        //make chart
        var ctx = this.$refs.recentGames.getContext('2d');

        var recentGamesName = [];
        var recentGamesMinutes = [];

        for(var i = 0; i < this.recentGames.length; i++){
          recentGamesName.push( this.recentGames[i].name );
          recentGamesMinutes.push( this.recentGames[i].playtime_2weeks);
        }

        var myPieChart = new Chart(ctx,{
          type: 'pie',
          data: {
            labels: recentGamesName,
            datasets: [{
              data: recentGamesMinutes,
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 0
            }]
          },
          options: {
            cutoutPercentage: 0,
            rotation: 35
          }
        });
      }
    }
  }
</script>
