<template>
  <div class="card card-chart">
    <div class="card-header">
      <h3 class="card-title">Global most popular games <sup>average playtime in days</sup></h3>
    </div>
    <div class="card-body">
      <div class="chart-area">
        <canvas id="popularGames" ref="popularGames" width="400" height="400"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: "MostPopularGames",
    dependencies: ["topGames"],
    mounted: function(){
      //make chart
      var ctx = this.$refs.popularGames.getContext('2d');

      var topGamesName = [];
      var topGamesPlayers = [];

      for(var i = 0; i < 10; i++){
        topGamesName.push( this.topGames[i].name );
        topGamesPlayers.push( (this.topGames[i].average_playtime/24).toFixed(2));
      }

      var myPieChart = new Chart(ctx,{
        type: 'bar',
        data: {
          labels: topGamesName,
          datasets: [{
            data: topGamesPlayers,
            backgroundColor: [
              '#1b2838',
              '#24374e',
              '#2d4461',
              '#334f72',
              '#375982',
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
          maintainAspectRatio: false,
          legend: {
            display: false
          }
        }
      });
    }
  }
</script>
