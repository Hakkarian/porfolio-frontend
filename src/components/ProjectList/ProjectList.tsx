import { ChangeEvent, MouseEvent, FC, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProjects, selectToken, selectUser } from "../../redux/selectors";
import { IProject } from "../../interfaces";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import {
  addComment,
  dislike,
  getAllComments,
  paginate,
  like,
} from "../../redux/operations";
import CommentList from "../CommentList";
import { ProjectItemCss, ProjectListCss } from "./ProjectList.styled";

const ProjectList: FC = () => {
  const { user } = useSelector(selectUser);
  const token = useSelector(selectToken);
  const { projects, currentPage, isLoading, error } =
    useSelector(selectProjects);

  const [selectedProject, setSelectedProject] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [content, setContent] = useState("");

  const dispatch: ThunkDispatch<RTCIceConnectionState, null, AnyAction> =
    useDispatch();
  
  useEffect(() => {
    dispatch(paginate({ page: currentPage, limit: 4 }));
  }, [dispatch]);

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
    const { name } = e.target as HTMLButtonElement;
    const { _id: projectId } = item;
    let { likes, dislikes, liked, disliked } = item;
    const payloadAddLike = { likes: likes + 1, id: projectId, liked, page: currentPage, limit: 4 };
    const payloadRemoveLike = {
      likes: likes - 1 < 0 ? 0 : likes - 1,
      id: projectId,
      liked,
      page: currentPage,
      limit: 4,
    };
    const payloadAddDislike = {
      dislikes: dislikes + 1,
      id: projectId,
      disliked,
      page: currentPage,
      limit: 4,
    };
    const payloadRemoveDislike = {
      dislikes: dislikes - 1 < 0 ? 0 : dislikes - 1,
      id: projectId,
      disliked,
      page: currentPage,
      limit: 4,
    };
    const likedUser = liked.find((item: string) => item === user.userId);
    const dislikedUser = disliked.find((item: string) => item === user.userId);
    if (likedUser) {
      dispatch(like(payloadRemoveLike));
      if (name === "dislike") {
        dispatch(dislike(payloadAddDislike));
        return;
      }
      return;
    }
    if (dislikedUser) {
      dispatch(dislike(payloadRemoveDislike));
      if (name === "like") {
        dispatch(like(payloadAddLike));
        return;
      }
      return;
    }
    
    if (name === "like") {
      dispatch(like(payloadAddLike));
      return;
    }
    if (name === "dislike") {
      dispatch(dislike(payloadAddDislike));
      return;
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      {projects && (
        <ProjectListCss>
          {projects.map((item: IProject) => (
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
                    <button
                      className="project__reaction-wrap--button-blue"
                      type="button"
                      name="like"
                      onClick={(e) => toggleReaction(item, e)}
                      disabled={selectedProject === item._id && isLoading}
                    >
                      Cool!
                    </button>
                    <p>{item.likes}</p>
                  </div>
                  <div className="project__reaction-wrap">
                    <button
                      className="project__reaction-wrap--button-red"
                      type="button"
                      name="dislike"
                      onClick={(e) => toggleReaction(item, e)}
                    >
                      Nah, thanks
                    </button>
                    <p>{item.dislikes}</p>
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

export default ProjectList;
