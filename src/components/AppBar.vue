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
    extension-height="100"
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.95)"
      ></v-img>
    </template>

    <v-toolbar-title
      class="app-bar-logo-frame overflow-hidden rounded-xl pa-0"
      title="Go to homepage"
      @click="$router.push('/')"
    >
      <img
        :src="require($vuetify.theme.dark
        ? '../assets/logo/DarkMode-AppBar.jpg'
        : '../assets/logo/LightMode-AppBar.jpg')"
        alt="TERRIS logo"
        class="app-bar-logo"
      />
    </v-toolbar-title>

    <h2 class="title align-self-end mb-2 pl-4">
      {{ appBarFlagCountryDetails.flag }} {{ appBarFlagCountryDetails.name }}
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

      <DarkModeToggle />
    </div>
  </v-app-bar>
</template>

<script>
import SearchCountryInput from '@/components/SearchCountryInput.vue';
import DarkModeToggle from '@/components/DarkModeToggle.vue';
import { mapState } from 'vuex';

export default {
  name: 'AppBar',
  components: { SearchCountryInput, DarkModeToggle },
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
$logo-base-size: 80px;
$logo-small-size: 45px;

.app-bar-logo-frame {
  cursor: pointer;
  height: $logo-base-size;
  width: $logo-base-size;
  transition: all .2s linear;

  .app-bar-logo {
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    transition: all .2s linear;
  }
}
.v-app-bar--is-scrolled {
  .v-toolbar__title.app-bar-logo-frame {
    height: $logo-small-size;
    width: $logo-small-size;
    margin-bottom: 2px;
  }
}
.search-box {
  display: flex;
  flex: 1;
  justify-content: flex-end;
}
</style>
