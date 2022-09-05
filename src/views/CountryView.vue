<template>
  <v-container v-if="country" class="country">
    <v-row class="pt-5">
      <v-col cols="8">
        <h2 class="mb-3">{{ country.name.official }} ({{ country.cca2 }})</h2>
        <v-row class="mb-3">
          <v-col cols="6">
            <CountryInfoCard
              icon-name="continent"
              info-content-type="list"
              :info-content="getContinent"
            />
            <CountryInfoCard
              icon-name="currency"
              info-content-type="list"
              :info-content="getCurrencies"
            />
            <CountryInfoCard
              icon-name="population"
              :info-content="getPopulation"
            />
          </v-col>
          <v-col cols="6">
            <CountryInfoCard
              icon-name="capital"
              info-content-type="list"
              :info-content="country.capital"
            />
            <CountryInfoCard
              icon-name="language"
              info-content-type="list"
              :info-content="getLanguages"
            />
            <CountryInfoCard
              icon-name="area"
              :info-content="getArea"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-btn
          color="primary"
          class="mb-3"
          block
          elevation="0"
          text
          @click="gotoGoogleMaps()"
        >
          <v-icon left large dense class="mr-3">
            mdi-google-maps
          </v-icon>
          Open on Google Maps
          <v-icon class="ml-3" x-small right>
            mdi-open-in-new
          </v-icon>
        </v-btn>
        <v-card class="mb-5">
          <v-img
            :src="country.flags.svg"
            :alt="`flag of ${country.name.official}`"
          />
        </v-card>
      </v-col>
    </v-row>
    <blockquote
      v-if="country.unMember"
      class="d-flex align-center justify-center px-sm-5 mb-5"
    >
      <v-img
        :src="require('@/assets/icons/united-nations.png')"
        max-width="50"
        max-height="50"
      />
      <p class="title font-weight-medium mb-0 ml-3">
        This country is a member of the United Nations
      </p>
    </blockquote>
  </v-container>
</template>

<script>
import * as Api from '@/service';
import { mapState, mapActions } from 'vuex';
import CountryInfoCard from '@/components/CountryInfoCard.vue';

export default {
  name: 'CountryView',
  components: {
    CountryInfoCard,
  },
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
    getCurrencies() {
      const currenciesList = Object.values(this.country.currencies);
      return currenciesList.map(
        (item) => `${item.symbol} - ${item.name}`,
      );
    },
    getContinent() {
      return Object.values(this.country.continents);
    },
    getLanguages() {
      return Object.values(this.country.languages);
    },
    getPopulation() {
      return `Population of ${Number(this.country.population).toLocaleString()}`;
    },
    getArea() {
      return `${Number(this.country.area).toLocaleString()} m²`;
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

    gotoGoogleMaps() {
      const { googleMaps } = this.country.maps;
      window.open(googleMaps);
    },
  },
};
</script>
