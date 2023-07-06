import { ChangeEvent, MouseEvent, FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

import { selectFavorite, selectProjects, selectToken, selectUser } from "../../redux/selectors";
import { IProject } from "../../interfaces";
import {
  addComment,
  dislike,
  getAllComments,
  getLikedProjects,
  like,
} from "../../redux/operations";
import CommentList from "../CommentList";

const LikedList: FC = () => {
    const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
    const { user } = useSelector(selectUser);
    const token = useSelector(selectToken);
  const favorite = useSelector(selectFavorite);
  const { currentPage } = useSelector(selectProjects);
  const [selectedProject, setSelectedProject] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    dispatch(getLikedProjects({page: currentPage, limit: 4}));
  }, [dispatch, currentPage]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleButtonClick = (id: string): void => {
    if (showComments && selectedProject === id) {
      setShowComments(false);
    } else {
      setShowComments(true);
      setSelectedProject(id);
      dispatch(getAllComments(id));
    }
  };

  const handleSubmit = (id: string) => {
    const payload = {
      content,
      id,
    };
    if (!token) {
      alert("To add a comment you need to register");
      return;
    }
    dispatch(addComment(payload));
    setContent("");
  };

  const toggleReaction = (item: IProject, e: MouseEvent<HTMLButtonElement>) => {
    const { _id: projectId } = item;
    let { likes, dislikes, liked, disliked } = item;
    const payloadAddLike = { likes: likes + 1, id: projectId, liked };
    const payloadRemoveLike = {
      likes: likes - 1 < 0 ? 0 : likes - 1,
      id: projectId,
      liked,
    };
    const payloadAddDislike = {
      dislikes: dislikes + 1,
      id: projectId,
      disliked,
    };
    const payloadRemoveDislike = {
      dislikes: dislikes - 1 < 0 ? 0 : dislikes - 1,
      id: projectId,
      disliked,
    };
    const likedUser = liked.find((item: string) => item === user.userId);
    const dislikedUser = disliked.find((item: string) => item === user.userId);
    if (likedUser) {
      dispatch(like(payloadRemoveLike));
      return;
    }
    if (dislikedUser) {
      dispatch(dislike(payloadRemoveDislike));
      return;
    }
    const { name } = e.target as HTMLButtonElement;
    if (name === "like") {
      dispatch(like(payloadAddLike));
      return;
    }
    if (name === "dislike") {
      dispatch(dislike(payloadAddDislike));
      return;
    }
  };

  return (
    <>
      {favorite && (
        <ul>
          {favorite.map((item: IProject) => (
            <li key={item._id}>
              <img
                src={item.image.url}
                alt="project"
                width={250}
                height={150}
              />
              <button
                type="button"
                name="like"
                onClick={(e) => toggleReaction(item, e)}
              >
                Don't like anymore
              </button>
              <input type="name" value={item.title || ""} readOnly/>
              <textarea value={item.description || ""} readOnly/>
              <a href={item.link}>Link</a>
              <a href={item.github}>Github</a>

              <button type="button" onClick={() => handleButtonClick(item._id)}>
                {selectedProject === item._id && showComments
                  ? "Hide Comments"
                  : "Show Comments"}
              </button>
              {selectedProject === item._id && showComments && (
                <CommentList projectId={item._id} />
              )}
              {favorite.length !== 0 && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(item._id);
                  }}
                >
                  <label>
                    <input
                      value={selectedProject === item._id ? content : ""}
                      type="text"
                      placeholder="Type something..."
                      onChange={handleChange}
                    />
                  </label>
                  <button type="submit">+</button>
                </form>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default LikedList;
