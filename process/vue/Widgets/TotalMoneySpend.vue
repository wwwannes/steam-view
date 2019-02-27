<template>
  <div class="col-lg-4">
    <div class="card card-chart">
      <div class="card-header">
        <h3 class="card-title">Total money spend</h3>
      </div>
      <div class="card-body">
        <div class="chart-area text-center">
          <h2>€{{moneySpend}}</h2>
          <span>For ... games</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: "MoneySpend",
    data(){
      return{
        moneySpend: 0
      }
    },
    dependencies: ["apikey", "userid"],
    created: function(){
      $.getJSON('http://localhost:3000/GetOwnedGames/?key='+this.apikey+'&steamid='+this.userid).done(data => {

        var allIDs = [];
        $.each(data.response.games, function(id){
          allIDs.push(data.response.games[id].appid);
        });
        $.getJSON('http://localhost:3000/GetPriceOfGame/?appid='+allIDs.join(',')).done(data => {

          var totalSpend = 0;

          $.each(data, function(id){
            if(data[id.toString()].success && data[id.toString()].data.price_overview !== undefined){
              totalSpend += parseInt(data[id.toString()].data.price_overview.final);
            }
          });
          this.moneySpend = totalSpend/100;
        });
      });
    }
  }
</script>
