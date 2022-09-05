<template>
  <v-footer
    v-if="getActiveView !== 'home'"
    padless
    class="mt-5"
  >
    <v-card
      flat
      tile
      width="100%"
      class="secondary text-center"
    >
      <v-card-text>
        <v-btn
          v-for="button in buttons"
          :key="`button_${button.name}`"
          class="mx-4"
          icon
          color="white"
          :title="button.name"
          :disabled="getActiveView === button.name"
          @click="gotoView(button.name)"
        >
          <v-icon size="24px">
            mdi-{{button.icon}}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ getYear }} — <strong>Jônatas F. Vieira</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  computed: {
    getYear() {
      return new Date().getFullYear();
    },
    getActiveView() {
      return this.$route.name;
    },
  },
  data: () => ({
    buttons: [
      {
        name: 'home',
        icon: 'home',
      },
      {
        name: 'countries',
        icon: 'view-dashboard',
      },
    ],
  }),
  methods: {
    gotoView(name) {
      if (name !== this.getActiveView) {
        this.$router.push({ name });
      }
    },
  },
};
</script>

<style>

</style>
