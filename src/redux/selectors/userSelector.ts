// selectors check if state has a user token, a user state and an avatar of the user

export const selectToken = (state: any) => state.user.token;
export const selectUser = (state: any) => state.user;
export const selectAvatar = (state: any) => state.user.user.avatar;
