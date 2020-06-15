export default function({ app, req, redirect, route }) {
  app.store.commit('layout/showAccountDialog')
}
