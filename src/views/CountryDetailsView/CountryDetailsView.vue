<template>
  <v-container v-if="country" class="country">
    <v-row class="pt-5">
      <v-col
        cols="12"
        sm="8"
      >
        <h2 class="mb-3">{{ country.name.official }} ({{ country.cca2 }})</h2>
        <v-row class="mb-3">
          <v-col
            cols="12"
            sm="6"
          >
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
          <v-col
            cols="12"
            sm="6"
          >
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
      <v-col
        cols="12"
        sm="4"
      >
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
          Google Maps
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

    <v-divider></v-divider>

    <blockquote
      v-if="country.unMember"
      class="d-flex align-center justify-center px-sm-5 my-5"
    >
      <v-img
        :src="require('@/assets/icons/united-nations.png')"
        max-width="50"
        max-height="50"
      />
      <p class="title font-weight-medium mb-0 ml-3">
        {{ country.name.common }} is a member of the United Nations
      </p>
    </blockquote>

    <v-divider></v-divider>

    <v-flex
      v-if="borderCountries.length"
      class="mx-5 pt-5"
    >
      <h3 class="mb-3">Countries that share a border with {{ country.name.common }}:</h3>
      <v-row>
        <v-col
          v-for="borderCountry in borderCountries"
          :key="`border_country_${borderCountry.code}`"
          cols="6"
          sm="3"
          lg="2"
        >
          <CountryCard
            :flag="borderCountry.flags.svg"
            :commonName="borderCountry.commonName"
            :officialName="borderCountry.officialName"
            :region="borderCountry.region"
            @click="gotoCountryDetailPage(borderCountry)"
          />
        </v-col>
      </v-row>
    </v-flex>
  </v-container>
</template>

<script>
import * as Api from '@/service';
import { mapState, mapActions } from 'vuex';
import CountryCard from '@/components/CountryCard.vue';
import CountryInfoCard from './components/CountryInfoCard.vue';

export default {
  name: 'CountryDetailsView',
  components: {
    CountryCard,
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
    nameOnRoutePath() {
      return this.$route.path.split('/')[2];
    },
    hasStoredCountry() {
      const visitedCountriesNames = Object.values(this.visitedCountries)
        .map((country) => country.name.common);
      return !!this.visitedCountries[this.countryCode]
        || visitedCountriesNames.includes(this.nameOnRoutePath);
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
    borderCountries: [],
  }),
  watch: {
    country: {
      deep: true,
      async handler(newValue) {
        if (newValue) {
          const appBarFlagCountryDetails = {
            flag: newValue.flag,
            name: newValue.name.common,
            flagImg: newValue.flags.svg,
          };
          this.setAppBarCountryDetails(appBarFlagCountryDetails);

          if ('borders' in newValue) {
            const borders = newValue.borders.join(',');
            const response = await Api.getCountryByCode(borders);
            this.borderCountries = response;
          }
        }
      },
    },
    $route: {
      deep: true,
      handler(newRoute, oldRoute) {
        if (newRoute.path !== oldRoute.path) {
          this.init();
        }
      },
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions(['addVisitedCountry', 'setAppBarCountryDetails']),

    async init() {
      this.getCountryData();
    },

    async getCountryData() {
      if (this.hasStoredCountry && this.countryCode) {
        this.country = this.visitedCountries[this.countryCode];
      } else {
        const name = this.countryOfficialName || this.nameOnRoutePath;
        this.country = await Api.getCountryByName(name);

        const storeCountry = {
          code: this.country.ccn3,
          info: this.country,
        };
        this.addVisitedCountry(storeCountry);
      }
    },

    getBorderCountries(borders) {
      return Api.getCountryByCode(borders).then((response) => response);
    },

    gotoGoogleMaps() {
      const { googleMaps } = this.country.maps;
      window.open(googleMaps);
    },

    gotoCountryDetailPage(country) {
      if (country) {
        const { code, officialName, commonName } = country;
        this.$router.push({
          name: 'country',
          params: {
            countryName: commonName,
            countryCode: code,
            countryOfficialName: officialName,
          },
        });
      }
    },
  },
};
</script>
