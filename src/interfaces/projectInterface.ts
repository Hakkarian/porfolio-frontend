export interface IProject {
    _id: string,
    title: string,
    description: string,
    image: {id: string, url: string}
}

export interface IUpdProj {
    title: string,
    description: string,
    image: File | null
}

export interface IProjectState {
    projects: IProject[],
    isLoading: boolean,
    error: string | null
}