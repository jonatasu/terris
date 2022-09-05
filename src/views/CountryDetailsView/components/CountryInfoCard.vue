<template>
  <v-card
    class="d-flex pa-3 mb-5 flex-row align-items-center"
    elevation="0"
    outlined
    shaped
  >
    <v-card
      class="country-info-icon-frame overflow-hidden mr-3"
      width="50"
      height="50"
      outlined
      shaped
      elevation="0"
    >
      <v-img
        v-if="iconName"
        class="align-self-start"
        :src="require(`@/assets/icons/${iconName}.svg`)"
        max-width="50"
        max-height="50"
      />
    </v-card>
    <ul
      v-if="infoContentType === 'list' && infoAmount > 1"
      class="d-flex flex-column justify-center pl-3"
    >
      <li
        v-for="(content, index) in infoContent"
        :key="`content_${index}`"
      >
        <p class="font-weight-medium pa-0 ma-0">{{ content }}</p>
      </li>
    </ul>
    <v-flex
      v-if="infoAmount === 1"
      class="d-flex align-center"
    >
      <p class="font-weight-medium pa-0 ma-0">
        {{ infoContentType === 'list' ? infoContent[0] : infoContent }}
      </p>
    </v-flex>
  </v-card>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
    },
    infoContentType: {
      type: String,
      default: 'text',
    },
    infoContent: {
      type: [String, Array],
      required: true,
    },
  },
  computed: {
    infoAmount() {
      let amount = 1;
      if (this.infoContentType === 'list' && this.infoContent.length > 1) {
        amount = this.infoContent.length;
      }
      return amount;
    },
  },
};
</script>

<style lang="scss">
.theme--dark.v-card.country-info-icon-frame {
  background-color: #F8F9FB;
}
</style>
