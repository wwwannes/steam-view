<template>
  <div class="row" :class="{hide: !showpage}">
    <last-played/>
    <money-spend/>
    <!--<most-popular/>-->
    <!--<most-played/>-->
    <!--<total-achievements/>-->
  </div>
</template>

<script>

  import LastPlayedGames from "./LastPlayedGames.vue";
  import MostPlayedGames from "./MostPlayedGames.vue";
  import MostPopularGames from "./MostPopularGames.vue";
  import TotalMoneySpend from "./TotalMoneySpend.vue";
  import TotalAchievements from "./TotalAchievements.vue";

  export default{
    name: "Dashboard",
    props: ["showpage"],
    components:{
      "last-played": LastPlayedGames,
      "most-played": MostPlayedGames,
      "most-popular": MostPopularGames,
      "money-spend": TotalMoneySpend,
      "total-achievements": TotalAchievements
    }
  }
</script>

<style>
  .chart-area{
    height: auto;
  }
</style>
