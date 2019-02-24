<template>
  <div class="gameDetail">
    <img :src="game.background"/>
    <h2>{{game.name}}</h2>
    <p v-html="game.about_the_game"></p>
  </div>
</template>

<script>
  export default{
    name: "GameDetail",
    props: ["game"]
  }
</script>
