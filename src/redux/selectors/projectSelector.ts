// selectors check if state has a projects state and an array of favorite projects

export const selectProjects = (state: any) => state.projects;
export const selectFavorite = (state: any) => state.projects.favorite;
