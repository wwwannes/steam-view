<template>
  <div class="col-lg-4">
    <div class="card card-chart">
      <div class="card-header">
        <h3 class="card-title">Total money spend</h3>
      </div>
      <div class="card-body">
        <div class="chart-area text-center">
          <h2>€{{moneySpend}}</h2>
          <span>For {{totalGames}} games</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: "MoneySpend",
    dependencies: ["moneySpend", "totalGames"]
  }
</script>
