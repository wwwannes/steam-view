<template>
  <div class="sidebar">
    <div class="sidebar-wrapper">
      <div class="logo">
        <span class="simple-text">Steam View</span>
      </div>
      <ul class="nav">
        <li class="dashboard active" @click.prevent="showpage('dashboard')"><a href=""><i class="fa fa-chart-pie"></i><p>Dashboard</p></a></li>
        <li class="games"><a href="" @click.prevent="showpage('games')"><i class="fa fa-th"></i>My games</a></li>
        <li class="profile"><a href="" @click.prevent="showpage('profile')"><i class="fa fa-user"></i>My profile</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default{
    name: "Menu",
    methods:{
      showpage: function(page){
        this.$emit('showpage', page);
        $(".nav li").removeClass('active');
        $(".nav ."+page).addClass('active');
      }
    }
  }
</script>

<style scoped>
  .sidebar{
    /*background: linear-gradient(0deg,#00adee,#000000);*/
  }
  .nav li:hover a:before{
    content: " ";
    position: absolute;
    height: 6px;
    width: 6px;
    top: 22px;
    left: -4px;
    background: #fff;
    border-radius: 50%;
  }
</style>
