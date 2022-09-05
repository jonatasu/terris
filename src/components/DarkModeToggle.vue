<template>
  <v-btn
    icon
    :fab="fab"
    :fixed="fixed"
    :small="small"
    top
    right
    @click="handleDarkMode"
  >
    <v-icon>
      {{ (darkMode) ? 'mdi-weather-night' : 'mdi-weather-sunny' }}
    </v-icon>
  </v-btn>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    fab: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(['darkMode']),
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions(['toggleDarkMode']),
    init() {
      this.localStorageHasDarkMode();
    },
    handleDarkMode() {
      this.toggleDarkMode();
      this.$vuetify.theme.dark = this.darkMode;
      localStorage.setItem('DarkMode', this.darkMode);
    },
    localStorageHasDarkMode() {
      if (localStorage.getItem('DarkMode') === 'true' && !this.darkMode) {
        this.handleDarkMode();
      }
    },
  },
};
</script>

<style>

</style>
