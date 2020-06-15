/**
 * 城市/楼盘/认购相关，
 */

// state
const state = () => ({
  hotLabel: {
    pages: 0, // 总页数
    current: 0, // 当前页数
    size: 5, // 每页条数
    list: []
  }
})

// mutations
const mutations = {}

// actions
const actions = {
  // 楼盘资讯
  apiGetAppList({ commit }, data) {
    return this.$axios.$post(
      `/backapi/banner/appapi/banner/${this.state.API_VERSION}/dynamic/appList`,
      data
    )
  },
  // 热门楼盘
  apiGetPopularBuildings({ commit }, data) {
    return this.$axios.$post(
      `/backapi/prod/popular/${this.state.API_VERSION}/app/list`,
      data
    )
  },
  // 获取楼盘详情信息
  apiGetDetailsBaseInfo({ commit }, data) {
    return this.$axios.$post(
      `/backapi/prod/prod/${this.state.API_VERSION}/details/baseInfo`,
      data
    )
  },
  // 热卖户型
  apiGetDetailsHotLayout({ commit }, data) {
    return this.$axios.$post(
      `/backapi/prod/prod/${this.state.API_VERSION}/details/hotLayout/`,
      data
    )
  },
  // 楼盘户型
  apiGetDetailsBuildLayout({ commit }, data) {
    return this.$axios.$post(
      `/odyapi/ouser-web/api/store/getBuildingOpenTime.do`,
      data
    )
  },
  // 特价房源
  apiGetDetailsSpecial({ commit }, data) {
    return this.$axios.$post(
      `/backapi/prod/prod/${this.state.API_VERSION}/details/discount`,
      data
    )
  },
  // 楼盘相册
  apiGetDetailsSpics({ commit }, prodId) {
    return this.$axios.$post(
      `/backapi/prod/prod/${this.state.API_VERSION}/details/pics/`,
      prodId
    )
  },
  // 周边配套
  apiGetSupporting({ commit }, prodId) {
    return this.$axios.$post(
      `/backapi/prod/prod/${this.state.API_VERSION}/details/supporting`,
      prodId
    )
  },
  // 猜你喜欢
  apiGetGuessBuilding({ commit }, data) {
    return this.$axios.$post(
      `/backapi/prod/prod/${this.state.API_VERSION}/guessBuilding`,
      data
    )
  },
  // 楼盘筛选标签
  apiQueryAllFilterLabel({ commit }, data) {
    return this.$axios.$post(
      `/backapi/prod/labelInfo/${this.state.API_VERSION}/queryAllFilterLabel`,
      data
    ) // 1 首页,  2 楼盘频道
  },
  // 楼盘列表
  apiQueryAppProductListByParam({ commit }, data) {
    return this.$axios.$post(
      `/backapi/prod/prod/${this.state.API_VERSION}/queryAppProductListByParam`,
      data
    )
  },
  // 为您推荐楼盘列表
  apiRecommendBuilding({ commit }, data) {
    return this.$axios.$post(
      `/backapi/prod/prod/${this.state.API_VERSION}/recommendBuilding`,
      data
    )
  },
  // 获取楼盘省市列表信息
  apiGetPcMapperByLevel({ commit }, level) {
    return this.$axios.$post(
      `/backapi/prod/baseInfo/${this.state.API_VERSION}/getPcMapperByLevel`,
      {
        level
      }
    )
  },
  // 热门标签
  apiGetHotLabels({ commit, state }, data) {
    return this.$axios.$post(
      `/backapi/prod/labelInfo/${this.state.API_VERSION}/hotLabel`,
      data
    )
  },
  // 获取有楼盘的省
  getProvPcMapperDto({ commit }, data) {
    return this.$axios.$post(
      `/backapi/prod/baseInfo/${this.state.API_VERSION}/getProvPcMapperDto`,
      data
    )
  },
  // 获取某省的楼盘
  getProductsByProvId({ commit }, ProvId) {
    return this.$axios.$post(
      `/backapi/prod/baseInfo/getProductsByProvId/${ProvId}`
    )
  },
  // 获取某省的楼盘2
  queryProductBaseInfo({ commit }, data) {
    return this.$axios.$post(
      `/backapi/prod/prod/${this.state.API_VERSION}/queryProductBaseInfo`,
      data
    )
  },
  // 置业顾问列表
  apiZygwList({ commit }, data) {
    return this.$axios.$post(
      `/backapi/prod/prod/${this.state.API_VERSION}/zygwList`,
      data
    )
  },
  // 置业顾问详情
  apiZygwDetail({ commit }, data) {
    return this.$axios.$post(`/backapi/prod/prod/zygwDetail`, data)
  },
  // 加密小程序参数，换取scene
  async apiMd5encode({ commit }, data) {
    const ret = await this.$axios.$post(
      `/hftapi/broker/api/commonApi/md5Encode`,
      {
        content: JSON.stringify(data)
      }
    )
    return ret.objValue
  },
  // 通过scene获取好盘小程序二维码，用于分享详情
  async apiGetHPWxacodeByScene(
    { commit },
    { scene, page = 'pages/building/buildingDetail/buildingDetail' }
  ) {
    const ret = await this.$axios.$post(
      '/hftapi/broker/api/customerApi/getwxacode',
      {
        scene,
        page,
        source: 1
      }
    )
    return `https://files.evergrande.com/${ret.objValue}`
  },
  // 组合上两个接口，参数如下
  /*
  {
      id: 'c403542be1784a4c9989c881b6718e98', // buildingid
      type: 1,
      userId: '',
      from: null
    }
  */
  async apiGetHPWxacodeByObj({ commit, dispatch }, data) {
    const scene = await dispatch('apiMd5encode', data)
    const wximg = await dispatch('apiGetHPWxacodeByScene', { scene })
    return wximg
  },
  // 获取楼盘公告
  apiGetBuildingNotice({ commit }, { buildingId }) {
    return this.$axios.$get(
      `/backapi/prod/buildingAnnouncement/queryAll/${buildingId}`
    )
  }
}

// getters
const getters = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
