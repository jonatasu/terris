<template>
  <v-autocomplete
    :items="countries"
    :placeholder="autocompletePlaceholder"
    :loading="loading"
    :filled="filled"
    auto-select-first
    cache-items
    :item-text="getItemText"
    :item-value="getItemValue"
    @change="item => gotoCountryDetailPage(item)"
  />
</template>

<script>
import * as Api from '@/service';

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
    await Api.getAllCountry()
      .then((response) => {
        this.countries = response;
      })
      .catch((err) => console.error(`This is the ERROR: ${err}`));
  },
  methods: {
    getItemText(item) {
      return `${item.flag} ${item.commonName}`;
    },
    getItemValue(item) {
      return `${item.code}_${item.officialName}_${item.commonName}`;
    },
    gotoCountryDetailPage(country) {
      if (country) {
        const [countryCode, countryOfficialName, countryName] = country.split('_');
        this.$router.push({
          name: 'country',
          params: {
            countryName,
            countryCode,
            countryOfficialName,
          },
        });
      }
    },
  },
};
</script>
