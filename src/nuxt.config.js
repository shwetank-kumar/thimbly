import colors from "vuetify/es5/util/colors"

export default {
  // ssr: false,
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: "%s - thimbly",
    title: "thimbly",
    meta: [
      {charset: "utf-8"},
      {name: "viewport", content: "width=device-width, initial-scale=1"},
    ],
    link: [{rel: "icon", type: "image/x-icon", href: "~/assets/favicon.ico"}],
    script: [
      {
        src: "https://www.gstatic.com/firebasejs/ui/4.7.1/firebase-ui-auth.js",
      },
      {src: "https://js.stripe.com/v3/"},
    ],
    link: [
      {
        type: "text/css",
        rel: "stylesheet",
        href:
          "https://www.gstatic.com/firebasejs/ui/4.7.1/firebase-ui-auth.css",
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "~/plugins/fireauth.js",
    "~/plugins/validation.js",
    {src: "~/plugins/firebaseui", mode: "client"},
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/content
    // '@nuxt/content',
    "vue-social-sharing/nuxt",
  ],

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  // Source directory location
  // srcDir: 'src/',
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  // buildDir: '../functions/nuxt',
  build: {
    // publicPath: '/public',
  },
}
