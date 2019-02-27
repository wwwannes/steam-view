<template>
  <div class="col-lg-4">
    <div class="card card-chart">
      <div class="card-header">
        <h3 class="card-title">Recently played</h3>
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
    dependencies: ["recentGames"],
    mounted: function(){
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
            cutoutPercentage: 0,
            rotation: 35
          }
        });
    }
  }
</script>
