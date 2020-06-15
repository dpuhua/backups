import config from './config'
const env = process.env.NODE_ENV

export default {
  mode: 'universal',
  /*
   ** server of the page
   */
  server: {
    host: '0.0.0.0' // default: localhost,
  },
  /*
   ** Headers of the page
   */
  head: {
    title: '恒大宝官网',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '恒大宝官网.恒大宝官网'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: '恒大宝官网2,恒大宝官网23'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#e62e37' },
  /*
   ** Global CSS
   */
  css: [
    /**
     * 配置全局 css
     */
    'element-ui/lib/theme-chalk/index.css',
    '@assets/css/global.less',
    '@assets/css/reset.less'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/router',
    { src: '@/plugins/component', ssr: true },
    { src: '@/plugins/request', ssr: true },
    { src: '@/plugins/babel-polyfill', ssr: true },
    '@/plugins/carousel'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/proxy', '@nuxtjs/axios'],
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    cache: true,
    extend(config, ctx) {}
  },
  router: {
    middleware: 'route'
  },
  /*
   ** axios
   */
  axios: {
    proxy: true // axios跟随代理请求接口，使用ip访问时生效
  },
  /*
   ** env
   */
  env: {
    API_VERSION: config.API_VERSION
  },
  // 设置代理
  proxy: {
    // 开发环境--网关
    '/backapi': {
      target: config[env].API_HOST,
      changeOrigin: true
    },

    // 开发环境--网关
    '/webapi': {
      target: config[env].API_HOST,
      changeOrigin: true
    },

    // 开发环境--登录网关
    '/appapi': {
      target: config[env].API_HOST,
      changeOrigin: true
    },

    // 中台服务代理
    '/odyapi': {
      target: config[env].ODY_API_HOST,
      changeOrigin: true,
      pathRewrite: {
        '^/odyapi': ''
      }
    },

    // 恒房通API
    '/hftapi': {
      target: config[env].HFT_API_HOST,
      changeOrigin: true,
      pathRewrite: {
        '^/hftapi': ''
      }
    }
  }
}
