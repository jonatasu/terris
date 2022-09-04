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
    ...mapActions(['addVisitedCountry', 'setAppBarCountryDetails']),

    async init() {
      if (this.hasStoredCountry) {
        this.country = this.visitedCountries[this.countryCode];
      } else {
        this.country = await Api.getCountryByName(this.countryOfficialName);

        const storeCountry = {
          code: this.country.ccn3,
          info: this.country,
        };
        this.addVisitedCountry(storeCountry);
      }
      this.handleAppBarCountryDetails();
    },

    handleAppBarCountryDetails() {
      const appBarFlagCountryDetails = {
        flag: this.country.flag,
        name: this.country.name.common,
        flagImg: this.country.flags.svg,
      };
      this.setAppBarCountryDetails(appBarFlagCountryDetails);
    },
  },
};
</script>
