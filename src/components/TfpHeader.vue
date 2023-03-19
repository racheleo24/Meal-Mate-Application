<template>
  <div class="header">
    <router-link to="/">
      <img class="logo" src="@/assets/logo.png" alt="healthy-logo" />
    </router-link>

    <div id="header-text">
      <h2>Meal Mate</h2>
      <p id="subtitle">"Simple is better"</p>
    </div>

    <router-link to="/my-profile" id="icon-link">
      <v-icon style="font-size: 50px; color: #4bc9a1">mdi-account</v-icon>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "tfp-header",
};
</script>

<style>
.header {
  background-color: #251e62;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
}
#header-text {
  flex-grow: 1;
  color: #4bc9a1;
  font-family: "Sofia Sans Condensed", sans-serif;
}
.logo {
  width: 50px;
  margin-left: 10px;
}
.icondeco {
  font-size: 90px;
  color: #4bc9a1;
}
#icon-link {
  text-decoration: none;
}
p {
  font-size: 10px;
}
</style>
