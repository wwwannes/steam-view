<template>
  <div>
    <h4>Dashboard</h4>
    <last-played/>
    <money-spend/>
  </div>
</template>

<script>

  import LastPlayedGames from "./LastPlayedGames.vue";
  import MostPlayedGames from "./MostPlayedGames.vue";
  import MostPopularGames from "./MostPopularGames.vue";
  import TotalMoneySpend from "./TotalMoneySpend.vue";

  export default{
    name: "Dashboard",
    components:{
      "last-played": LastPlayedGames,
      "most-played": MostPlayedGames,
      "most-popular": MostPopularGames,
      "money-spend": TotalMoneySpend
    }
  }
</script>
