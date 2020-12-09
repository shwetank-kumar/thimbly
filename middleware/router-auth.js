export default function ({ store, redirect, route }) {
  if (store.state.user != null && route.name === 'login') {
    redirect('/admin/new-product')
  }
  if (store.state.user == null && isSecureRoute(route)) {
    redirect('/')
  }
}

function isSecureRoute(route) {
  if (route.matched.some((record) => record.path === '/new-product')) {
    return true
  }
}
