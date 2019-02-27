<template><div></div></template>

<script>
  import injector from 'vue-inject';
  import _ from "lodash";

  export default{
    name:"APIcalls",
    data(){
      return{
        topGames: [],
        doneLoading: false,
        dataToLoad: [
          "allGames",
          "profileData",
          "recentlyPlayed",
          "totalMoneySpend",
          "mostPopularGame"
        ]
      }
    },
    dependencies: ["apikey", "userid"],
    created: function(){
      // GET ALL GAMES
      $.getJSON('http://localhost:3000/GetOwnedGames/?key='+this.apikey+'&steamid='+this.userid).done(data => {
        var games = _.orderBy(data.response.games, function(item){ // Lodash ordering by name
          return item["name"].toLowerCase();
        });
        injector.constant('games', games); //make globally
        injector.constant('totalGames', games.length); //make globally
        this.dataToLoad = $.grep(this.dataToLoad, function(value){ // remove from dataToLoad array
          return value != "allGames";
        });

        // GET TOTAL PRICES
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
          injector.constant('moneySpend', totalSpend/100); //make globally
          this.dataToLoad = $.grep(this.dataToLoad, function(value){ // remove from dataToLoad array
            return value != "totalMoneySpend";
          });
        });
      });

      // GET PROFILE DATA
      $.getJSON('http://localhost:3000/GetProfile/?key='+this.apikey+'&steamids='+this.userid)
      .done( data => {
        var joinDate = new Date(data.response.players[0].timecreated * 1000);
        var day = joinDate.getDate();
        var month = joinDate.getMonth();
        var year = joinDate.getFullYear();

        var lastOnline;
        var onlineDate = data.response.players[0].lastlogoff * 1000; //unix timestamp
        var thisMoment = new Date().getTime(); //unix timestamp
        var days = new Date(thisMoment - onlineDate);

        var difHours = Math.round(days/1000/60/60);
        var difDays = Math.round(days/1000/60/60/24);
        var difWeeks = Math.round(days/1000/60/60/24/7);
        var difMonths = Math.round(days/1000/60/60/24/7/12);

        if(difMonths >= 1){
          lastOnline = Math.round(days/1000/60/60/24/7/12) +" months";
        } else if(difWeeks >= 1){
          lastOnline = Math.round(days/1000/60/60/24/7) +" weeks";
        } else if(difDays >= 1){
          lastOnline = Math.round(days/1000/60/60/24) +" days";
        } else if(difHours >= 1){
          lastOnline = Math.round(days/1000/60/60) +" hours";
        } else {
          lastOnline = "Currently online";
        }

        var memberSince = day+"/"+month+"/"+year;

        injector.constant('profileData', data.response.players[0]); //make globally
        injector.constant('lastOnline', lastOnline); //make globally
        injector.constant('memberSince', memberSince); //make globally

        this.dataToLoad = $.grep(this.dataToLoad, function(value){ // remove from dataToLoad array
          return value != "profileData";
        });
      });

      // MOST RECENT PLAYED GAMES
      $.getJSON('http://localhost:3000/GetRecentlyPlayedGames/?key='+this.apikey+'&steamid='+this.userid).done(data => {
        injector.constant('recentGames', data.response.games); //make globally
        this.dataToLoad = $.grep(this.dataToLoad, function(value){ // remove from dataToLoad array
          return value != "recentlyPlayed";
        });
      });

      // MOST POPULAR GAMES
      $.getJSON('http://localhost:3000/GetTopGames').done(data => {
        var top100Games = _.orderBy(data, function(item){ // Lodash ordering by name
          return item["average_forever"];
        }, "desc");

        for(var i = 0; i < 10; i++){
          this.topGames.push({
            "name": top100Games[i].name,
            "average_playtime": Math.round(top100Games[i].average_forever/60)
          });
        }
      });
    },
    watch:{
      topGames: function(){
        if(this.topGames.length == 10){
          injector.constant('topGames', this.topGames); //make globally
          this.dataToLoad = $.grep(this.dataToLoad, function(value){ // remove from dataToLoad array
            return value != "mostPopularGame";
          });
        }
      },
      dataToLoad: function(){
        if(this.dataToLoad.length == 0){ // if all data is loaded
          this.$emit('allAPIloaded');
        }
      }
    }
  }
</script>
