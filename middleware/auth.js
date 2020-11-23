export default function ({ store, redirect }) {
  console.log(store.state.user)
  // If the user is not authenticated
  if (!store.state.user) {
    return redirect('/')
  }
}
