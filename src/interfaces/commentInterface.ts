export interface IComment {
    _id: string,
    projectId: string,
    author: {username: string, avatar: {url: string, id: string}, email: string, userId: string}
    content: string,
    createdAt: string,
    updatedAt: string
}

export interface ICommentState {
    comments: IComment[],
    isLoading: boolean,
    error: string | null
}

export interface CommentListProps {
    projectId: string
}