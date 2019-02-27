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
        profileLevel: 0
      }
    },
    dependencies: ["profileData", "lastOnline", "memberSince", "apikey", "userid"],
    created: function(){
      $.getJSON('http://localhost:3000/GetProfileLevel/?key='+this.apikey+'&steamid='+this.userid)
      .done( data => {
        this.profileLevel = data.response.player_level;
      });
    }
  }
</script>
