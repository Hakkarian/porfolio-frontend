export interface IProject {
    _id: string,
    title: string,
    description: string,
    image: {id: string, url: string}
}

export interface IProjectState {
    projects: IProject[],
    isLoading: boolean,
    error: string | null
}