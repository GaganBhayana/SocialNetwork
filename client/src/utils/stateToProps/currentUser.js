export default function(state) {
  return {
    user: state.currentUser.user,
    error: state.currentUser.error,
    loading: state.currentUser.loading
  };
}
