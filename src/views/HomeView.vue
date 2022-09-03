<template>
  <v-container>
    <h1 class="text-center">TERRIS</h1>
    <v-autocomplete
      :items="countries"
      label="Where do you want us to take you?"
      auto-select-first
      :disabled="loading"
      @change="item => gotoCountryDetailPage(item)"
    />
  </v-container>
</template>

<script>
import * as Api from '../service';

export default {
  name: 'HomeView',
  data: () => ({
    countries: [],
    loading: true,
  }),
  async beforeMount() {
    this.countries = await Api.getAllCountryNames();
  },
  mounted() {
    this.loading = false;
  },
  methods: {
    gotoCountryDetailPage(countryName) {
      if (countryName) {
        this.$router.push({ path: `/country/${countryName}` });
      }
    },
  },
};
</script>
