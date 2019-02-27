<template>
  <div class="col-md-4">
    <div class="card card-user">
      <div class="card-body">
        <div class="author">
          <div class="block block-one"></div>
          <div class="block block-two"></div>
          <div class="block block-three"></div>
          <div class="block block-four"></div>
          <img class="avatar" :src="profileData.avatarfull"/>
          <p class="description">{{profileData.personaname}}</p>
          <h5 class="title">Level {{profileLevel}}</h5>
        </div>
        <div class="card-description text-center">
          <span>Member since {{memberSince}}</span><br/>
          <span>Last online {{lastOnline}} ago</span>
        </div>
        <div class="card-footer text-center">
          <a :href="profileData.profileurl" target="_blank" class="btn btn-fill btn-primary">Visit profile</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: "ProfileData",
    data(){
      return{
        profileData: [],
        profileLevel: 0,
        memberSince: "",
        lastOnline: ""
      }
    },
    dependencies: ["apikey", "userid"],
    created: function(){
      var key = this.apikey;
      var id = this.userid;

      $.getJSON('http://localhost:3000/GetProfile/?key='+key+'&steamids='+id)
      .done( data => {
        var joinDate = new Date(data.response.players[0].timecreated * 1000);
        var day = joinDate.getDate();
        var month = joinDate.getMonth();
        var year = joinDate.getFullYear();

        var onlineDate = data.response.players[0].lastlogoff * 1000; //unix timestamp
        var thisMoment = new Date().getTime(); //unix timestamp
        var days = new Date(thisMoment - onlineDate);

        var difHours = Math.round(days/1000/60/60);
        var difDays = Math.round(days/1000/60/60/24);
        var difWeeks = Math.round(days/1000/60/60/24/7);
        var difMonths = Math.round(days/1000/60/60/24/7/12);

        if(difMonths >= 1){
          this.lastOnline = Math.round(days/1000/60/60/24/7/12) +" months";
        } else if(difWeeks >= 1){
          this.lastOnline = Math.round(days/1000/60/60/24/7) +" weeks";
        } else if(difDays >= 1){
          this.lastOnline = Math.round(days/1000/60/60/24) +" days";
        } else if(difHours >= 1){
          this.lastOnline = Math.round(days/1000/60/60) +" hours";
        } else {
          this.lastOnline = "Currently online";
        }

        this.memberSince = day+"/"+month+"/"+year;
        this.profileData = data.response.players[0];
      });

      $.getJSON('http://localhost:3000/GetProfileLevel/?key='+key+'&steamid='+id)
      .done( data => {
        this.profileLevel = data.response.player_level;
      });
    }
  }
</script>
