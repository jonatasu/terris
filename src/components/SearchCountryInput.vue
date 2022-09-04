<template>
  <v-autocomplete
    :items="countries"
    :placeholder="autocompletePlaceholder"
    :loading="loading"
    :filled="filled"
    auto-select-first
    cache-items
    @change="item => gotoCountryDetailPage(item)"
  />
</template>

<script>
import * as Api from '../service';

export default {
  name: 'SearchCountry',
  props: {
    filled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    loading() {
      return !this.countries.length;
    },
    autocompletePlaceholder() {
      return this.loading ? 'Loading...' : 'Where do you want us to take you?';
    },
  },
  data: () => ({
    countries: [],
  }),
  async beforeMount() {
    this.countries = await Api.getAllCountryNames();
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
