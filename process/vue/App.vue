<template>
  <div>
    <component :is="currentComponent" @loggedIn="loggedIn" v-if="currentComponent == 'login-screen'"/>
    <component :is="currentComponent" v-else/>
  </div>
</template>

<script>
  import Login from "./Login/Login.vue";
  import Loggedin from "./Login/Loggedin.vue";

  export default{
    name: "App",
    data(){
      return{
        currentComponent: "login-screen"
      }
    },
    components: {
      "login-screen": Login,
      "loggedin-screen": Loggedin
    },
    methods:{
      loggedIn: function(){
        this.currentComponent = "loggedin-screen";
      }
    }
  }
</script>
