export const authSelector = (state) => state.authReducer;
export const loadingSelector = (state) => authSelector(state).loading;
export const usernameSelector = (state) => authSelector(state).username;
export const profileImageUrlSelector = (state) => authSelector(state).profileImageUrl;
export const loginMethodSelector = (state) => authSelector(state).loginMethod;

