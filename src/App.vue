<template>
    <div id="app">
        <tfp-header id="header" />
        <router-view />
        <tfp-footer id="footer" />
    </div>
</template>

<script>
import TfpHeader from "@/components/TfpHeader.vue";
import TfpFooter from "./components/TfpFooter.vue";

export default {
    components: {
        TfpHeader,
        TfpFooter,
    },
};
</script>

<style>
.v-card {
    border-radius: 5px;
    border: 1px solid rgb(165, 165, 165);
    margin-bottom: 5px;
    margin-top: 5px;
    box-shadow: 3px 3px #dedede;
}
#app {
    display: flex;
    flex-direction: column;
    height: 100vh;
    min-height: 100vh;
    justify-content: space-between;
}
#footer {
    position: sticky;
    bottom: 0;
    width: 100%;
}
</style>
