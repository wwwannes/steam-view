<template>
  <div class="row" :class="{hide: !showpage}">
    <money-spend/>
    <last-played/>
    <most-played/>
    <most-popular/>
  </div>
</template>

<script>

  import LastPlayedGames from "./LastPlayedGames.vue";
  import MostPlayedGames from "./MostPlayedGames.vue";
  import MostPopularGames from "./MostPopularGames.vue";
  import TotalMoneySpend from "./TotalMoneySpend.vue";

  export default{
    name: "Dashboard",
    props: ["showpage"],
    components:{
      "last-played": LastPlayedGames,
      "most-played": MostPlayedGames,
      "most-popular": MostPopularGames,
      "money-spend": TotalMoneySpend
    }
  }
</script>

<style>
  .chart-area{
    height: auto;
  }
</style>
