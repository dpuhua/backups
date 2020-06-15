/**
 * 经纪人（会员）相关
 */

// state
const state = () => ({})

// mutations
const mutations = {}

// actions
const actions = {
  // 我的佣金状态统计
  apiBrokerageNum({ commit }, data) {
    return this.$axios.$post(
      `/appapi/broker/recommend/${this.state.API_VERSION}/brokerageNum`,
      data
    )
  },
  // 我的佣金
  apiBrokerage({ commit }, data) {
    return this.$axios.$post(
      `/appapi/broker/recommend/${this.state.API_VERSION}/brokerage`,
      data
    )
  },
  // 我的佣金分页
  apiBrokeragePage({ commit }, data) {
    return this.$axios.$post(
      `/appapi/broker/recommend/${this.state.API_VERSION}/brokeragePage`,
      data
    )
  },
  // 我的佣金明细
  apiBrokerageDetail({ commit }, data) {
    return this.$axios.$post(
      `/appapi/broker/recommend/${this.state.API_VERSION}/brokerageDetail`,
      data
    ) // 佣金明细
  },
  // 会员等级和权益信息
  async apiGetMemberLevelAndEquity({ commit }) {
    const { data } = await this.$axios.$post(
      `/appapi/broker/personal/${this.state.API_VERSION}/getMemberLevelAndEquity`
    )
    commit('setMemberInfo', data, { root: true })
  },
  // 我的客户推荐列表
  apiRecommendList({ commit }, data, config) {
    return this.$axios.$post(
      `/appapi/broker/recommend/${this.state.API_VERSION}/recommendList`,
      data,
      config
    )
  },
  // 我的客户推荐状态统计
  apiRecommendCount({ commit }, data) {
    return this.$axios.$post(
      `/appapi/broker/recommend/${this.state.API_VERSION}/recommendCount`
    )
  },
  // 我的客户推荐成交状态统计
  apiRecommendDealCount({ commit }, data) {
    return this.$axios.$post(
      `/appapi/broker/recommend/${this.state.API_VERSION}/recommendDealCount`
    )
  },
  // 我的推荐进展
  apiRecommendProgress({ commit }, data) {
    return this.$axios.$post(
      `/appapi/broker/recommend/${this.state.API_VERSION}/recommendProgress`,
      data
    )
  },
  // 延长保护期
  apiActivate({ commit }, data) {
    return this.$axios.$post(
      `/appapi/broker/recommend/${this.state.API_VERSION}/activateVisited`,
      data
    )
  },
  // 佣金比例label
  apiRateList({ commit }, data) {
    return this.$axios.$post(
      `/appapi/broker/recommend/${this.state.API_VERSION}/rateList`,
      data
    )
  },
  // 佣金比例转换
  apiSetBrokerageMortgage({ commit }, data) {
    return this.$axios.$post(
      `/appapi/broker/recommend/${this.state.API_VERSION}/setBrokerageMortgage`,
      data
    )
  },
  // 删除已经过期的推荐
  apiDelRecommend({ commit, rootState }, data) {
    return this.$axios.$post(
      `/appapi/broker/recommend/${this.state.API_VERSION}/deleteCst`,
      data,
      {
        headers: {
          brokerId: rootState.brokerId
        }
      }
    )
  },
  // 根据数据类型列表查询字典数据
  apiQueryProductByTypes({ commit }, data) {
    return this.$axios.$post(
      `/backapi/dictionary/appapi/sysconfig/${this.state.API_VERSION}/queryProductByTypes`,
      data
    )
  },
  // 推荐信息录入
  apiRecommendCustomer({ commit }, data) {
    return this.$axios.$post(
      `/appapi/broker/recommend/${this.state.API_VERSION}/recommendCustomer`,
      data
    )
  },
  // 意向客户录入
  create({ commit }, data) {
    return this.$axios.$post(
      `/webapi/broker/intentionRegistration/${this.state.API_VERSION}/create`,
      data
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
