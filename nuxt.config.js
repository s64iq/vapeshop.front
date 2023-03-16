export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Vapeshop',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '@/plugins/antd-ui',ssr: false},
    {src: '@/plugins/auth-methods'},
    {src: '@/plugins/product-methods'},
    {src: '@/plugins/product-filter-methods'},
    {src: '@/plugins/navigation-methods'},
    {src: '@/plugins/order-methods'},
    {src: '@/plugins/product-page-methods'},
    {src: '@/plugins/product-page-methods'},
    {src: '@/plugins/user-safety-methods'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  axios: {
    baseURL: 'http://localhost:8085/api',
    browserBaseURL: 'http://localhost:8085/api'
  },

  auth: {
    localStorage: true,
    strategies: {
      local: {
        scheme: "refresh",
        token: {
          property: 'accessToken',
          maxAge: 30,
          type: 'Bearer'
        },
        refreshToken: {
          property: 'refreshToken',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          autoFetch: false
        },
        endpoints: {
          login: { url: '/auth/signin', method: 'post', propertyName: "accessToken"},
          refresh: { url: '/auth/refreshtoken', method: 'post', propertyName: "refreshToken"},
          user: false
        },
        userAutoFetch: false,
        autoLogout: false
      }
    },
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/'
      }
    }
  }
}
