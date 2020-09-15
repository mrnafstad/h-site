<template>
  <v-app>
    <Header />

    <v-main>
      <router-view />
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Header,
    Footer
  },

  data: () => ({
    //
  }),
  methods: {
    ...mapActions(["authentication"])
  }
};
</script>
