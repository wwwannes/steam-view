<template>
  <div>
    <h3>Total money spend</h3>
    <span>€{{moneySpend}}</span>
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
