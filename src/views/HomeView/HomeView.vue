<template>
  <v-container class="fill-height">
    <v-row class="justify-center mb-5">
      <v-col
        cols="10"
        sm="8"
        lg="6"
        class="d-flex flex-column"
      >
        <v-flex class="d-flex overflow-hidden rounded-xl mb-5">
          <v-img
            :src="require($vuetify.theme.dark
            ? '@/assets/logo/DarkMode-V2-cropped.jpg'
            : '@/assets/logo/LightMode-V2-cropped.jpg')"
            alt="TERRIS"
            width="100%"
          />
        </v-flex>
        <v-spacer class="pt-5">
          <SearchCountryInput />
        </v-spacer>
      </v-col>
    </v-row>
    <v-flex class="d-flex justify-center">
      <v-btn
        color="secondary"
        outlined
        x-large
        @click="$router.push('countries')"
      >
        <v-icon left>mdi-view-dashboard</v-icon>
        Go to country list
      </v-btn>
    </v-flex>
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
