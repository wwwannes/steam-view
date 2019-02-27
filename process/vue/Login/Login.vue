<template>
  <div class="card col-md-4">
    <div class="card-header">
      <h2 class="title">Login</h2>
    </div>
    <form @submit.prevent="checkName">
      <div class="card-body">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label>Profile name</label>
                <input type="text" class="form-control" v-model="profileName" placeholder="Profile name" value="">
              </div>
              <div class="alert alert-danger" :class="{hide: hideError}">
                <span>Profile name not found.</span>
              </div>
            </div>
          </div>
      </div>
      <div class="card-footer text-right">
        <button type="submit" class="btn btn-fill btn-primary">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
  import injector from 'vue-inject';
  import Login from "./Login.vue";

  injector.constant('loggedin', false);

  export default{
    name: "Login",
    data(){
      return{
        profileName: "",
        hideError: true
      }
    },
    dependencies: ["apikey"],
    methods: {
      checkName: function(e){
        $.getJSON('http://localhost:3000/GetSteamID/?key='+this.apikey+'&username='+this.profileName).done(data => {
          var nameResponse = data.response;
          if(nameResponse.success == 1){
            this.hideError = true;
            injector.constant('userid', nameResponse.steamid);
            injector.constant('loggedin', true);
            this.$emit("loggedIn");
          } else {
            this.hideError = false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .hide{
    display: none;
  }
  .card{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
  }
</style>
