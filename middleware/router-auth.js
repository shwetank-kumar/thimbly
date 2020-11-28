export default function ({ store, redirect, route }) {
  if (store.state.user != null && route.name === 'login') {
    redirect('/createlisting')
  }
  if (store.state.user == null && isSecureRoute(route)) {
    redirect('/')
  }
}

function isSecureRoute(route) {
  if (route.matched.some((record) => record.path === '/createlisting')) {
    return true
  }
}
