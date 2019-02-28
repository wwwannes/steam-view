<template>
  <div :class="{hide: !showpage}">
    <div class="row">
      <div class="col-md-4">
        <money-spend/>
        <last-played/>
      </div>
      <div class="col-md-8">
        <most-played/>
      </div>
    </div>
    <div class="row">
      <most-popular/>
    </div>
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
