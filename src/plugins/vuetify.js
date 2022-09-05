import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import minifyTheme from 'minify-css-string';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    options: { minifyTheme },
    themeCache: {
      get: (key) => localStorage.getItem(key),
      set: (key, value) => localStorage.setItem(key, value),
    },
    themes: {
      light: {
        primary: '#1282A2',
        secondary: '#272838',
        accent: '#C9F9FF',
        error: colors.red.accent3,
        background: '#F8F9FB',
      },
      dark: {
        primary: colors.blue.lighten3,
        background: colors.indigo.base,
      },
    },
  },
});
