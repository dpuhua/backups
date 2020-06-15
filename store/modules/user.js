/**
 * 用户账号相关接口
 */

// state
const state = () => ({})

// mutations
const mutations = {}

// actions
const actions = {
  // 注册
  apiRegister({ commit }, data) {
    return this.$axios.$post(
      `/appapi/broker/uucas/${this.state.API_VERSION}/register`,
      data,
      {
        isLogin: false
      }
    )
  },
  // 登录
  apiLogin({ commit }, data) {
    return this.$axios.$post(
      `/appapi/broker/uucas/${this.state.API_VERSION}/loginUucas`,
      data,
      {
        isLogin: false
      }
    )
  },
  // 验证码登录
  apiLoginByCaptcha({ commit }, data) {
    return this.$axios.$post(
      `/appapi/broker/uucas/${this.state.API_VERSION}/loginByCode`,
      data
    )
  },

  // 验证码校验
  apiValifyCaptcha({ commit }, data) {
    return this.$axios.$post(
      `/appapi/broker/uucas/${this.state.API_VERSION}/checkVerificationCode`,
      data
    )
  },

  // 退出
  async apiLogout({ commit, dispatch }, data) {
    await this.$axios.$post(
      `/appapi/broker/member/${this.state.API_VERSION}/logout`,
      {
        os_type: 'Web'
      }
    )
    dispatch('logout', null, { root: true })
  },

  // 获取用户资料
  async apiProfile({ commit }) {
    const userinfo = await this.$axios.$post(
      `/appapi/broker/member/${this.state.API_VERSION}/getProfile`
    )
    commit(`setUserInfo`, userinfo.data, { root: true })
    return userinfo
  },

  // 获取短信验证码
  apiGetCaptcha({ commit }, data) {
    return this.$axios.$post(
      `/appapi/broker/uucas/${this.state.API_VERSION}/getVerificationCode`,
      data
    )
  },

  // 获取认证证件类型选项
  apiCardType({ commit }, data) {
    return this.$axios.$post(
      `/appapi/broker/config/${this.state.API_VERSION}/getIdCardTypeConfig`,
      data
    )
  },
  // 修改认证信息
  apiCertModifyProfile({ commit }, data) {
    return this.$axios.$post(
      `/appapi/broker/member/${this.state.API_VERSION}/certModifyProfile`,
      data
    )
  },
  // 滑块功能联调
  apiDragImg({ commit }, data) {
    return this.$axios.$post(
      `/appapi/broker/uucas/${this.state.API_VERSION}/captchaValidate`,
      data
    )
  },
  // 修改手机号R
  apiUpdatePhone({ commit }, data) {
    return this.$axios.$post(
      `/appapi/broker/member/${this.state.API_VERSION}/modifyPhoneNumberBySecret`,
      data
    )
  },
  // 修改密码
  apiResetPassword({ commit }, data) {
    return this.$axios.$post(
      `/appapi/broker/uucas/${this.state.API_VERSION}/resetPassword`,
      data
    )
  },
  // 旧密码方式修改密码
  apiModifyPassword({ commit }, data) {
    return this.$axios.$post(
      `/appapi/broker/member/${this.state.API_VERSION}/modifyPassword`,
      data
    )
  },
  // 全国省市县三级（实名认证选择常住地）
  apiAreaList({ commit }, data) {
    return this.$axios.$post(
      `/backapi/dictionary/appapi/sysconfig/${this.state.API_VERSION}/queryDisList`,
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
