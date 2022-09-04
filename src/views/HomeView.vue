<template>
  <v-container class="fill-height align-items-center justify-center">
    <v-flex>
      <v-flex class="overflow-hidden rounded-xl mb-5">
        <v-img
          :src="require($vuetify.theme.dark
          ? '../assets/logo/DarkMode-V2-cropped.jpg'
          : '../assets/logo/LightMode-V2-cropped.jpg')"
          alt="TERRIS"
        />
      </v-flex>
      <v-spacer class="pt-5">
        <SearchCountryInput />
      </v-spacer>
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
