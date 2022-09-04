<template>
  <v-app-bar
    v-if="!atHome"
    app
    color="secondary"
    dark
    shrink-on-scroll
    :src="appBarFlagCountryDetails.flagImg"
    prominent
    loader-height="4"
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.95)"
      ></v-img>
    </template>

    <v-toolbar-title
      class="logo"
      title="Go to homepage"
      @click="$router.push('/')"
    >
      TERRIS
    </v-toolbar-title>

    <h2 class="title align-self-end pb-2 pl-4">
      {{ appBarFlagCountryDetails.name }}
    </h2>

    <v-spacer></v-spacer>

    <div
      transition="expand-transition"
      class="search-box"
    >
      <SearchCountryInput
        v-if="loadSearchCountryInput"
        v-show="showSearchCountryInput"
        filled
      />
      <v-btn
        v-if="!atHome"
        icon
        class="ml-3"
        @click="handleSearchCountryInput"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </div>

    <v-btn icon>
      <v-icon>mdi-brightness-4</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import SearchCountryInput from '@/components/SearchCountryInput.vue';
import { mapState } from 'vuex';

export default {
  name: 'AppBar',
  components: { SearchCountryInput },
  computed: {
    ...mapState(['appBarFlagCountryDetails']),
    atHome() {
      return this.$route.name === 'home';
    },
  },
  data: () => ({
    loadSearchCountryInput: false,
    showSearchCountryInput: false,
  }),
  methods: {
    handleSearchCountryInput() {
      this.showSearchCountryInput = !this.showSearchCountryInput;
      this.loadSearchCountryInput = true;
    },
  },
};
</script>

<style lang="scss">
.logo {
  cursor: pointer;
}
.search-box {
  display: flex;
  flex: 1;
  justify-content: flex-end;
}
</style>
