<template>
  <v-container>
    <div class="button">
      <router-link v-bind:to="{ name: 'meal' }" id="back">
        <v-btn>Back</v-btn>
      </router-link>
    </div>
    <br />
    <h1>Add food</h1>
    <food-search />
  </v-container>
</template>

<script>
import FoodSearch from "../components/FoodSearch.vue";
export default {
  components: { FoodSearch },
};
</script>

<style scoped>
.button {
  display: flex;
  justify-content: flex-start;
}
#back {
  text-decoration: none;
}
</style>
