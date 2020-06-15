export default {
  API_VERSION: 'v1', // api版本号
  // 开发环境
  dev: {
    // API_HOST: 'http://hdb-dev-api.test.h.cn/',
    API_HOST: 'http://hdb-sit-api.test.h.cn/',
    ODY_API_HOST: 'http://middleend-sit-mo2o.test.h.cn',
    HFT_API_HOST: 'https://hdhfttest.evergrande.com'
  },
  // 测试环境
  test: {
    API_HOST: 'http://hdb-sit-api.test.h.cn/',
    ODY_API_HOST: 'http://middleend-sit-mo2o.test.h.cn',
    HFT_API_HOST: 'https://hdhfttest.evergrande.com'
  },
  // 生产环境
  production: {
    API_HOST: 'http://hdb-sit-api.test.h.cn/',
    ODY_API_HOST: 'http://middleend-sit-mo2o.test.h.cn',
    HFT_API_HOST: 'https://hdhfttest.evergrande.com'
  },
  // 默认城市
  city: {
    cityCode: '440300',
    cityName: '深圳'
  }
}
