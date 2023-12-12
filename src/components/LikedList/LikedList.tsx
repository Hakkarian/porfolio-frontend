import {
  ChangeEvent,
  MouseEvent,
  FC,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

import {
  selectFavorite,
  selectProjects,
  selectToken,
  selectUser,
} from "../../redux/selectors";
import { IProject } from "../../interfaces";
import {
  addComment,
  getAllComments,
  getLikedProjects,
  like,
} from "../../redux/operations";
import CommentList from "../CommentList";
import {
  ProjectItemCss,
  ProjectListCss,
} from "../ProjectList/ProjectList.styled";
import { NotLikeButton } from "./LikedList.styled";

const LikedList: FC = () => {
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
  const token = useSelector(selectToken);
  const { user, isLoading } = useSelector(selectUser);
  const favorite = useSelector(selectFavorite);
  const { currentLikedPage } = useSelector(selectProjects);
  const [selectedProject, setSelectedProject] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [content, setContent] = useState("");

  // if an array of favorite projects is empty, display 1 page of projects overall
  useEffect(() => {
    if (favorite.length !== 0) {
      dispatch(getLikedProjects({ page: currentLikedPage, limit: 4 }));
    } else {
      dispatch(getLikedProjects({ page: 1, limit: 4 }));
    }
  }, [dispatch, currentLikedPage]);

  // handle input writing
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  }, []);

  // if user typed on the show comments button, it will see a list of comments
  // else close the comments window
  const handleButtonClick = useCallback(
    (id: string): void => {
      if (showComments && selectedProject === id) {
        setShowComments(false);
      } else {
        setShowComments(true);
        setSelectedProject(id);
        dispatch(getAllComments(id));
      }
    },
    [showComments, selectedProject, dispatch]
  );

  // send the message while clicking on a button
  // if you are not authorized, notify that user must register first
  const handleSubmit = useCallback(
    (id: string) => {
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
    },
    [dispatch, token, content]
  );

  // remove the project from the list of liked projects
  const removeFromFavorite = (
    item: IProject,
    e: MouseEvent<HTMLButtonElement>
  ) => {
    // stop from reloading
    e.stopPropagation();
    const { _id: projectId } = item;
    let { likes, liked } = item;
    // we're removing like with help of the payload.
    // If a total amount of likes is equal to zero, nothing happens.Else decrease the amount by one
    const payloadRemoveLike = {
      likes: likes - 1 < 0 ? 0 : likes - 1,
      id: projectId,
      liked,
      page: currentLikedPage,
      limit: 4,
    };
    // search for a liked user
    const likedUser = liked.find((item: string) => item === user.userId);
    // trigger the reduction of likes, if user liked current project,
    // and reload the list of liked projects
    if (likedUser) {
      dispatch(like(payloadRemoveLike));
      dispatch(
        getLikedProjects({
          page: currentLikedPage,
          limit: 4,
        })
      );
      // if there is only one project left on not the first page, list renders previous page
      // if "previous page" means first, then render the first page
      // with 4 projects per page
      if (favorite.length === 1) {
        dispatch(
          getLikedProjects({
            page: currentLikedPage > 1 ? currentLikedPage - 1 : 1,
            limit: 4,
          })
        );
      }
      return;
    }
  };

  return (
    <>
      {/*If the list of favorites is empty, display an error message
         If not empty, let's show the list of favorite projects, which user can remove from his own library*/}
      {favorite.length === 0 && <div>An error occured</div>}
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
                {/*On click on the button, display a list of comments, owned by project where button "Show comments is located"*/}
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
