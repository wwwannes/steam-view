import $ from 'jquery';
import injector from 'vue-inject';
import Vue from 'vue';
import App from "./vue/App.vue";

// Globally declare Loadingscreen for global use
Vue.component('loading-screen', require("./vue/General/Loadingscreen.vue"));

// Vue inject global variable
require("./GlobalVariables")
Vue.use(injector);

var vm = new Vue({
  el: "#app",
  render: h => h(App)
});
