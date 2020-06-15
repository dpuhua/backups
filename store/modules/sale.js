/**
 * 认筹认购相关接口（欧电云）
 */

// state
const state = () => ({})

// mutations
const mutations = {}

// actions
const actions = {
  // 获取房源列表
  // ?productType=1&houseTypes=&unitPriceRange=&totalPriceRange=
  // &sortType=10&stockStatus=&pageNo=1&pageSize=10&storeId=230000000028
  queryHouseList({ commit }, params) {
    return this.$axios.$get(`/odyapi/search/rest/searchList.do`, { params })
  },

  // 获取户型信息
  // {"projectGuid":"1264756175405092865","modeType":1}
  getBuildingOpenTime({ commit }, params) {
    return this.$axios.$post(
      `/odyapi/ouser-web/api/store/getBuildingOpenTime.do`,
      params
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
