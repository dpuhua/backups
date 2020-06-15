export const state = () => ({
  accountDialog: false
})

export const mutations = {
  showAccountDialog(state) {
    state.accountDialog = true
  },
  hideAccountDialog(state) {
    state.accountDialog = false
  }
}
