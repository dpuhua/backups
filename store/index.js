import cookieUtil from '~/utils/cookie'
import config from '~/config'
import {
  BUILD_DETAIL,
  BUILD_ALBUM,
  STRUCTURE_TYPE,
  ZYGW_LIST,
  SPECIAL_LIST,
  BUILD_LATOUT,
  GUESS_BUILD,
  APP_LIST
} from '~/store/mutation-types'
const default_avatar = require('../assets/img/global/default_img.png')
// import { setStore } from '~/utils/utils'

export const state = () => ({
  token: '',
  unionId: '',
  brokerId: '',
  city: config.city,
  API_VERSION: config.API_VERSION, // 接口API版本号
  userInfo: {}, // 用户信息
  memberInfo: {}, // 会员信息
  buildDetail: {}, // 楼盘详情
  structureType: {}, // 楼盘户型
  buildAlbum: {}, // 楼盘相册
  zygwList: {}, // 楼盘顾问
  specialDatas: {}, // 特价房源
  supportDatas: {}, // 周边配套
  guessBuilding: {}, // 猜你喜欢
  buildingList: {} // 楼盘资讯
})

export const getters = {
  city: (state) => state.city,
  isLogin: (state) => state.token && state.unionId,
  // 用户头像
  avatar: (state) => state.userInfo.avatar || default_avatar,
  realphone: (state) => state.userInfo.phone,
  // 手机号脱敏
  desPhone: (state) =>
    state.userInfo.phone &&
    state.userInfo.phone.replace(/(\d{3})\d*(\d{4})/, '$1****$2')
}

export const mutations = {
  setCity(state, { cityCode, cityName, cache }) {
    if (cityCode && cityName) {
      state.city.cityCode = cityCode
      state.city.cityName = cityName
      if (cache !== false) {
        cookieUtil.set('cityCode', cityCode)
        cookieUtil.set('cityName', cityName)
      }
    }
  },
  setUserInfo(state, payload) {
    state.userInfo = payload
  },
  clearUserInfo(state) {
    state.userInfo = {}
  },
  setMemberInfo(state, payload) {
    state.memberInfo = payload
  },
  setUserStore(state, payload) {
    const { token, unionId, brokerId, cache } = payload
    state.token = token
    state.unionId = unionId
    state.brokerId = brokerId
    if (cache !== false) {
      cookieUtil.set('token', token)
      cookieUtil.set('unionId', unionId)
      cookieUtil.set('brokerId', brokerId)
    }
  },
  clearUserStore(state) {
    state.token = ''
    state.unionId = ''
    state.brokerId = ''
    cookieUtil.remove('token')
    cookieUtil.remove('unionId')
    cookieUtil.remove('brokerId')
  },
  // 楼盘相关
  [BUILD_DETAIL](state, value) {
    state.buildDetail = value
  },
  [STRUCTURE_TYPE](state, value) {
    state.structureType = value
  },
  [BUILD_ALBUM](state, value) {
    state.buildAlbum = value
  },
  [ZYGW_LIST](state, value) {
    state.zygwList = value
  },
  [SPECIAL_LIST](state, value) {
    state.specialDatas = value
  },
  [BUILD_LATOUT](state, value) {
    state.supportDatas = value
  },
  [GUESS_BUILD](state, value) {
    state.guessBuilding = value
  },
  [APP_LIST](state, value) {
    state.buildingList = value
  }
}

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req }) {
    const cookieObj = cookieUtil.parse(req.headers.cookie)
    const { token, unionId, brokerId, cityCode, cityName } = cookieObj
    commit('setUserStore', { token, unionId, brokerId, cache: false })
    commit('setCity', { cityCode, cityName, cache: false })
    try {
      if (token) {
        await dispatch('modules/user/apiProfile')
      }
    } catch (e) {}
  },
  login({ commit }, data) {
    commit('setUserStore', {
      token: data.access_token,
      unionId: data.union_id,
      brokerId: data.broker_id
    })
  },
  logout({ commit }) {
    commit('clearUserStore')
    commit('clearUserInfo')
  }
}
