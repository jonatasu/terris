<template>
  <v-container v-if="country" class="country">
    <h1>{{ country.name.official }}</h1>
    <p>{{ country }}</p>
  </v-container>
</template>

<script>
import * as Api from '@/service';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'CountryView',
  computed: {
    ...mapState(['visitedCountries']),
    countryCode() {
      return this.$route.params.countryCode;
    },
    countryOfficialName() {
      return this.$route.params.countryOfficialName;
    },
    hasStoredCountry() {
      return !!this.visitedCountries[this.countryCode];
    },
  },
  data: () => ({
    country: null,
  }),
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions(['addVisitedCountry']),

    async init() {
      if (!this.hasStoredCountry) {
        this.country = await Api.getCountryByName(this.countryOfficialName);

        if (Object.keys(this.country).length) {
          const storeCountry = {
            code: this.country.ccn3,
            info: this.country,
          };
          this.addVisitedCountry(storeCountry);
        } else {
          this.$router.push({ path: '/' });
        }
      } else {
        this.country = this.visitedCountries[this.countryCode];
      }
    },
  },
};
</script>
