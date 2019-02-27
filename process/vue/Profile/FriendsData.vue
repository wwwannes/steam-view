<template>
  <div class="col-md-4">
    <div class="card">
      <div class="card-header">
        <h5 class="title">Friendslist</h5>
      </div>
      <div class="card-body">
        <div v-for="friend in friends" class="friend row">
          <div class="col-md-4">
            <img :src="friend.avatarmedium"/>
          </div>
          <div class="col-md-8">
            <h5>{{friend.personaname}}</h5>
            <span>Last online {{friend.onlineText}} ago</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: "Friendslist",
    data(){
      return{
        friends: []
      }
    },
    dependencies: ["apikey", "userid"],
    created: function(){
      var key = this.apikey;
      var id = this.userid;

      $.getJSON('http://localhost:3000/GetFriendList/?key='+key+'&steamid='+id) // get steamid of friends
      .done( data => {

        var allFriends = this.friends;

        $.each(data.friendslist.friends, function(){
          $.getJSON('http://localhost:3000/GetProfile/?key='+key+'&steamids='+this.steamid)
          .done( info => {

            var onlineText;
            var onlineDate = info.response.players[0].lastlogoff * 1000; //unix timestamp
            var thisMoment = new Date().getTime(); //unix timestamp
            var days = new Date(thisMoment - onlineDate);

            var difHours = Math.round(days/1000/60/60);
            var difDays = Math.round(days/1000/60/60/24);
            var difWeeks = Math.round(days/1000/60/60/24/7);
            var difMonths = Math.round(days/1000/60/60/24/7/12);

            if(difMonths >= 1){
              onlineText = Math.round(days/1000/60/60/24/7/12) +" months";
            } else if(difWeeks >= 1){
              onlineText = Math.round(days/1000/60/60/24/7) +" weeks";
            } else if(difDays >= 1){
              onlineText = Math.round(days/1000/60/60/24) +" days";
            } else if(difHours >= 1){
              onlineText = Math.round(days/1000/60/60) +" hours";
            } else {
              onlineText = "Currently online";
            }

            allFriends.push({
              "personaname":info.response.players[0].personaname,
              "avatarmedium":info.response.players[0].avatarmedium,
              "onlineText":onlineText
            })
          });
        });
      });

    }
  }
</script>

<style scoped>
  .friend{
    margin-bottom: 15px;
  }
</style>
