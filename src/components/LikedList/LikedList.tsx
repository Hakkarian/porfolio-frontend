import { ChangeEvent, MouseEvent, FC, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

import { selectFavorite, selectProjects, selectToken, selectUser } from "../../redux/selectors";
import { IProject } from "../../interfaces";
import {
  addComment,
  getAllComments,
  getLikedProjects,
  like,
  paginate,
} from "../../redux/operations";
import CommentList from "../CommentList";
import { ProjectItemCss, ProjectListCss } from "../ProjectList/ProjectList.styled";
import { NotLikeButton } from "./LikedList.styled";

const LikedList: FC = () => {
    const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
  const token = useSelector(selectToken);
  const {user, isLoading} = useSelector(selectUser);
  const favorite = useSelector(selectFavorite);
  const { currentPage, currentLikedPage } = useSelector(selectProjects);
  const [selectedProject, setSelectedProject] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    dispatch(getLikedProjects({ page: currentLikedPage, limit: 4 }));
  }, [dispatch, currentLikedPage]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  }, []);

  const handleButtonClick = useCallback((id: string): void => {
    if (showComments && selectedProject === id) {
      setShowComments(false);
    } else {
      setShowComments(true);
      setSelectedProject(id);
      dispatch(getAllComments(id));
    }
  }, [showComments, selectedProject, dispatch]);

  const handleSubmit = useCallback((id: string) => {
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
  }, [dispatch, token, content]);

  const removeFromFavorite = (item: IProject, e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const { _id: projectId } = item;
    let { likes, liked } = item;
    const payloadRemoveLike = {
      likes: likes - 1 < 0 ? 0 : likes - 1,
      id: projectId,
      liked,
      page: currentLikedPage,
      limit: 4,
    };
    const likedUser = liked.find((item: string) => item === user.userId);
    if (likedUser) {
      dispatch(like(payloadRemoveLike))
        .then(() =>
          dispatch(getLikedProjects({ page: currentLikedPage, limit: 4 }))
        )
        .then(() =>
          dispatch(
            paginate({
              page: currentPage > 1 ? currentPage - 1 : currentPage,
              limit: 4,
            })
          )
        );
      return;
    }
  };

  return (
    <>
      {favorite.length !== 0 && (
        <ProjectListCss>
          {favorite.map((item: IProject) => (
            <ProjectItemCss key={item._id}>
              <div className="project__image-reactions">
                <img
                  src={item.image.url}
                  alt="project"
                  width={700}
                  height={400}
                />
                <div className="project__reactions">
                  <div className="project__reaction-wrap">
                    <NotLikeButton
                      className="project__reaction-wrap--button-glitter"
                      type="button"
                      name="like"
                      disabled={selectedProject === item._id && isLoading}
                      onClick={(e) => removeFromFavorite(item, e)}
                    >
                      <span>Do not like anymore</span>
                    </NotLikeButton>
                  </div>
                </div>
              </div>
              <div className="project__info-wrap">
                <h2>{item.title || ""}</h2>
                <div className="project__description-container">
                  <p>{item.description || ""}</p>
                </div>
                <div className="project__links-button">
                  <div className="project__links">
                    <a href={item.link}>Link</a>
                    <a href={item.github}>Github</a>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleButtonClick(item._id)}
                  >
                    {selectedProject === item._id && showComments
                      ? "Hide Comments"
                      : "Show Comments"}
                  </button>
                </div>

                {selectedProject === item._id && showComments && (
                  <div className="project__input__comments">
                    <div className="project__comments-wrap">
                      <CommentList projectId={item._id} />
                    </div>
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
                  </div>
                )}
              </div>
            </ProjectItemCss>
          ))}
        </ProjectListCss>
      )}
    </>
  );
};

export default LikedList;
