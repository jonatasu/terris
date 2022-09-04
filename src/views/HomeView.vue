<template>
  <v-container class="fill-height align-items-center justify-center">
    <v-row class="mb-6">
      <v-col>
        <h1 class="text-center">TERRIS</h1>
      </v-col>
    </v-row>
    <v-row class="mb-6">
      <v-col>
        <SearchCountryInput />
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
