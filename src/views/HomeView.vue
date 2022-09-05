<template>
  <v-container class="fill-height align-items-center justify-center">
    <v-row class="justify-center">
      <v-col
        cols="10"
        sm="7"
        lg="3"
        class="d-flex flex-column align-items-center"
      >
        <v-flex class="d-flex overflow-hidden rounded-xl mb-5">
          <v-img
            :src="require($vuetify.theme.dark
            ? '../assets/logo/DarkMode-V2-cropped.jpg'
            : '../assets/logo/LightMode-V2-cropped.jpg')"
            alt="TERRIS"
            max-width="500"
            width="100%"
          />
        </v-flex>
        <v-spacer class="pt-5">
          <SearchCountryInput />
        </v-spacer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SearchCountryInput from '@/components/SearchCountryInput.vue';

export default {
  name: 'HomeView',
  components: {
    SearchCountryInput,
  },
};
</script>
