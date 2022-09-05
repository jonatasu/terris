<template>
  <v-app
    id="terris"
  >
    <AppBar />

    <DarkModeToggle fixed fab small />

    <v-main>
      <router-view />
    </v-main>

    <FooterComponent />
  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar.vue';
import DarkModeToggle from '@/components/DarkModeToggle.vue';
import FooterComponent from '@/components/Footer.vue';

export default {
  components: {
    AppBar,
    DarkModeToggle,
    FooterComponent,
  },
};
</script>

<style lang="scss">
@import '~vuetify/src/styles/main.sass';
</style>
