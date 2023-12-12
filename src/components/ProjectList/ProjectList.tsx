import { ChangeEvent, MouseEvent, FC, useState, useEffect } from "react";
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
  getLikedProjects,
} from "../../redux/operations";
import CommentList from "../CommentList";
import { ProjectItemCss, ProjectListCss, TopCss } from "./ProjectList.styled";

const ProjectList: FC = () => {
  const { user } = useSelector(selectUser);
  const token = useSelector(selectToken);
  const { projects, currentPage, currentLikedPage, isLoading, error } =
    useSelector(selectProjects);
  

  const [selectedProject, setSelectedProject] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [content, setContent] = useState("");
  const [toTop, setToTop] = useState(false);
  
  // when the user is scrolling, a button "to top" will appear
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setToTop(true);
      }
      else {
        setToTop(false);
      }
    })
  }, []);

  const dispatch: ThunkDispatch<RTCIceConnectionState, null, AnyAction> =
    useDispatch();
  
  // fill the page with paginated set of projects, with up to 4 projects per page
  useEffect(() => {
    dispatch(paginate({ page: currentPage, limit: 4 }));
  }, [dispatch, currentPage]);

  // handle change of state of the input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  // handle showing comments on pressing the button
  const handleButtonClick = (id: string): void => {
    if (showComments && selectedProject === id) {
      setShowComments(false);
    } else {
      setShowComments(true);
      setSelectedProject(id);
      dispatch(getAllComments(id));
    }
  };

  // submit the comment to save it in the database
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

  // add like or dislike to the project
  // if like is added, remove the dislike and vice-versa
  const toggleReaction = (item: IProject, e: MouseEvent<HTMLButtonElement>) => {
    // we're getting the name of the button (like or dislike)
    // also an id of a project
    // in addition a number of likes, dislikes,
    // and two arrays of users who liked and disliked the project
    const { name } = e.target as HTMLButtonElement;
    const { _id: projectId } = item;
    let { likes, dislikes, liked, disliked } = item;
    // creating various payloads.
    // Here we add a 1 to likes number, an id of a project,
    // a page and a limit of projects per page
    const payloadAddLike = {
      likes: likes + 1,
      id: projectId,
      liked,
      page: currentPage,
      limit: 4,
    };
    // if likes - 1 is less than zero, display 0 or reduce the amount of likes by one
    const payloadRemoveLike = {
      likes: likes - 1 < 0 ? 0 : likes - 1,
      id: projectId,
      liked,
      page: currentPage,
      limit: 4,
    };
    // dislikes are basically the same
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
    // here we find exact user who liked or disliked the project, and comparing him with the current user
    // if one of the matches, continue to interact with likes and dislikes addition and reduction
    // by found condition
    const likedUser = liked.find((item: string) => item === user.userId);
    const dislikedUser = disliked.find((item: string) => item === user.userId);
    // if user has pressed the "Like" button already
    // on click on the "Dislike" button reduce the amount of likes, and add a dislike
    if (likedUser) {
      dispatch(like(payloadRemoveLike));
      dispatch(
        getLikedProjects({
          page: currentLikedPage > 1 ? currentLikedPage - 1 : currentLikedPage,
          limit: 4,
        })
      );
      if (name === "dislike") {
        // and add dislike, if we pressed "Dislike" button
        dispatch(dislike(payloadAddDislike));
        // and paginate with projects
        dispatch(
          getLikedProjects({
            page:
              currentLikedPage > 1 ? currentLikedPage - 1 : currentLikedPage,
            limit: 4,
          })
        );
        return;
      }
      return;
    }
    // if user has pressed the "Dislike" button already
    // on click on the "Like" button reduce the amount of dislikes, and add a like
    if (dislikedUser) {
      dispatch(dislike(payloadRemoveDislike));
      if (name === "like") {
        dispatch(like(payloadAddLike));
        dispatch(
          getLikedProjects({
            page: 1,
            limit: 4,
          })
        );
        return;
      }
      return;
    }
    // or just add a like on pressing the "Like" button
    if (name === "like") {
      dispatch(like(payloadAddLike));
      dispatch(
        getLikedProjects({
          page: currentLikedPage > 1 ? currentLikedPage - 1 : currentLikedPage,
          limit: 4,
        })
      );
      return;
    }
    // or just add a dislike on pressing the "Dislike" button
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
      {/*Do not render anything, if an array of projects is empty
         Else render a list of projects. Each has a brief description,
         a list of buttons "like" and "dislike", and a comments box, 
         in we the user can write, update or delete comments*/}
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
      {/*A button "to top", which scrolls... to top, you are right*/}
      {toTop && <TopCss onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Top</TopCss>}
    </>
  );
};

export default ProjectList;
