export const authSelector = (state) => state.authStore;
export const isLoading = (state) => authSelector(state).loading;
export const usernameSelector = (state) => authSelector(state).username;
export const userIdSelector = (state) => authSelector(state).id;
export const profileImageUrlSelector = (state) => authSelector(state).profileImageUrl;
export const loginMethodSelector = (state) => authSelector(state).loginMethod;

