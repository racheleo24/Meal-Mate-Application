<template>
  <v-container>
    <h1 id="title">{{ currentDate() }}</h1>
    <daily-view-card class="widen" />
    <hydration-summary />
  </v-container>
</template>

<script>
import DailyViewCard from "../components/DailyViewCard.vue";
import HydrationSummary from "../components/HydrationSummary.vue";
import moment from "moment";

export default {
  components: {
    DailyViewCard,
    HydrationSummary,
  },
  methods: {
    currentDate() {
      const date = moment().format("MMMM Do, YYYY");
      return date;
    },
  },
};
</script>

<style scoped>
.widen {
  margin: 5px 0 5px 0;
  padding: 0;
}
#title {
  margin-bottom: 15px;
}
</style>
