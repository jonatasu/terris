<template>
  <v-container v-if="country" class="country">
    <h1>{{ country.name.official }}</h1>
    <p>{{ country }}</p>
  </v-container>
</template>

<script>
import * as Api from '../service';

export default {
  name: 'CountryView',
  data: () => ({
    country: null,
  }),
  async mounted() {
    const { countryName } = this.$route.params;

    if (countryName) {
      this.country = await Api.getCountryByName(countryName);
    } else {
      this.$router.push({ path: '/' });
    }
  },
};
</script>
