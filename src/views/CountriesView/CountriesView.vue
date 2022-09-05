<template>
  <div id="countries">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            label="Filter by name"
            v-model="filterBy.name"
            clearable
          >
            <v-icon slot="prepend">
              mdi-map-search
            </v-icon>
          </v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          align="end"
        >
          <v-combobox
            v-model="filterBy.region"
            :items="getRegions"
            label="Regions"
            multiple
            clearable
          />
        </v-col>
      </v-row>
      <v-flex
        v-if="!loading && filterBy.name && !filteredCountries.length"
        class="pa-sm-5 pa-3"
      >
        <p class="text-center">
          We couldn't find any country name that contains
          <strong>{{ filterBy.name }}</strong> in the name.
          <v-btn
            text
            color="primary"
            @click="filterBy.name = ''"
          >
            Clear filter
          </v-btn>
        </p>
      </v-flex>
    </v-container>
    <v-container fluid>
      <v-row v-if="!loading && filteredCountries.length">
        <v-col
          v-for="country in filteredCountries"
          :key="`country_${country.code}`"
          cols="6"
          sm="4"
          md="3"
          lg="2"
        >
          <CountryCard
            :flag="country.flags.svg"
            :commonName="country.commonName"
            :officialName="country.officialName"
            :region="country.region"
            @click="gotoCountryDetailPage(country)"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import * as Api from '@/service';
import { mapState, mapActions } from 'vuex';
import CountryCard from '@/components/CountryCard.vue';

export default {
  name: 'CountriesView',
  components: {
    CountryCard,
  },
  computed: {
    ...mapState(['storedRegions']),
    getRegions() {
      if (this.storedRegions.length) {
        return this.storedRegions;
      }

      if (localStorage.getItem('regions')) {
        return localStorage.getItem('regions').split(',');
      }

      const mapRegions = this.countries.map((country) => country.region);
      const removedDuplicateRegions = mapRegions.sort().filter(
        (item, pos, ary) => !pos || item !== ary[pos - 1],
      );

      localStorage.setItem('regions', removedDuplicateRegions.join(','));

      return removedDuplicateRegions;
    },
    filteredCountries() {
      if (this.countries.length) {
        if (this.filterBy.region.length || !!this.filterBy.name) {
          let newFilteredList = Object.assign(this.countries, []);

          if (this.filterBy.region.length) {
            newFilteredList = this.filterCountriesByRegion(newFilteredList);
          }

          if (this.filterBy.name) {
            newFilteredList = this.filterCountriesByName(newFilteredList);
          }

          return newFilteredList;
        }
        return this.countries;
      }
      return [];
    },
  },
  data: () => ({
    countries: [],
    regions: [],
    loading: true,
    filterBy: {
      region: [],
      name: '',
    },
  }),
  watch: {
    filterBy: {
      deep: true,
      handler(newValue) {
        localStorage.setItem('filterByRegion', newValue.region.join(','));
        localStorage.setItem('filterByName', newValue.name || '');
      },
    },
  },
  async beforeMount() {
    await Api.getAllCountry()
      .then((response) => {
        this.countries = response;
      })
      .catch((err) => console.error(`This is the ERROR: ${err}`));
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions(['']),
    init() {
      this.getLocalStorageFilter();
      this.loading = false;
    },
    getLocalStorageFilter() {
      const storageRegion = localStorage.getItem('filterByRegion');
      const storageName = localStorage.getItem('filterByName');
      const localFilter = {
        region: storageRegion ? storageRegion.split(',') : [],
        name: storageName || '',
      };
      this.filterBy = localFilter;
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
    filterCountriesByName(list) {
      return list.filter(
        (country) => country.commonName.toLowerCase().includes(this.filterBy.name),
      );
    },
    filterCountriesByRegion(list) {
      return list.filter(
        (country) => this.filterBy.region.includes(country.region),
      );
    },
  },
};
</script>

<style>

</style>
