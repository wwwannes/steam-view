<template>
  <div>
    <h4>{{profileData.personaname}}</h4>
    <img :src="profileData.avatarmedium"/>
    <b>Friendslist</b>
    <ul>
      <li v-for="friend in friends">
        <h5>{{friend.personaname}}</h5>
        <span>Online/last online ?</span>
        <span>How long member ?</span>
        <img :src="friend.avatarmedium"/>
      </li>
    </ul>
  </div>
</template>

<script>
  export default{
    name: "ProfileData",
    data(){
      return{
        profileData: [],
        friends: []
      }
    },
    dependencies: ["apikey", "userid"],
    created: function(){
      var key = this.apikey;
      var id = this.userid;

      $.getJSON('http://localhost:3000/GetProfile/?key='+key+'&steamids='+id)
      .done( data => {
        this.profileData = data.response.players[0];
      });

      $.getJSON('http://localhost:3000/GetFriendList/?key='+key+'&steamid='+id) // get steaid of friends
      .done( data => {

        var allFriends = this.friends;

        $.each(data.friendslist.friends, function(){
          $.getJSON('http://localhost:3000/GetProfile/?key='+key+'&steamids='+this.steamid)
          .done( info => {
            allFriends.push(info.response.players[0])
          });
        });
      });

    }
  }
</script>
