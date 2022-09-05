<template>
  <v-card
    class="mx-auto"
    outlined
    @click="event => $emit('click', event)"
  >
    <v-img
      :src="flag"
      width="100%"
      :alt="`flag of ${officialName}`"
    />

    <v-card-title>
      {{ commonName }}
    </v-card-title>

    <v-card-subtitle v-if="region">
      {{ region }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: {
    flag: {
      type: String,
      required: true,
    },
    officialName: {
      type: String,
      required: true,
    },
    commonName: {
      type: String,
      required: true,
    },
    region: {
      type: String,
    },
  },
};
</script>
