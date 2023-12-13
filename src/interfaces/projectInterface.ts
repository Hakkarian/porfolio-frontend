// interfaces of a project and redux project state

export interface IProject {
    _id: string,
    title: string,
    description: string,
    image: { id: string, url: string },
    likes: number,
    dislikes: number,
    liked: string[],
    disliked: string[],
    github: string,
    link: string
}

export interface IUpdProj {
    title: string,
    description: string,
    image: File | null
}

export interface IProjectState {
    projects: IProject[],
    favorite: IProject[],
    currentPage: number,
    currentLikedPage: number,
    totalPages: number,
    totalLikedPages: number,
    isLoading: boolean,
    error: string | null
}