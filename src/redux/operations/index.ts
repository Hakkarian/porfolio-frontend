import { register, login, currenti, updUser, logoutUser } from './userOperation';
import {
  paginate,
  getLikedProjects,
  addProject,
  updateProject,
  like,
  dislike,
} from "./projectOperation";
import { getAllComments, addComment, updComment, delComment } from './commentOperation';

export { register, login, currenti, updUser, logoutUser, paginate, getLikedProjects, getAllComments, addProject, addComment, updComment, delComment, updateProject, like, dislike };