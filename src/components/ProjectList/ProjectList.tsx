import { ChangeEvent, MouseEvent, FC, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectProjects, selectToken, selectUser } from '../../redux/selectors';
import { IProject } from '../../interfaces';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { addComment, dislike, getAllComments, like } from '../../redux/operations';
import CommentList from '../CommentList';

const ProjectList: FC = () => {
  const { user } = useSelector(selectUser);
  const token = useSelector(selectToken);
  const [selectedProject, setSelectedProject] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [content, setContent] = useState("");
  // const [reaction, setReaction] = useState({
  //   liked: [user],
  //   disliked: false,
  // })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  };

  const projects = useSelector(selectProjects);
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();

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
      content, id
    }
    if (!token) {
      alert('To add a comment you need to register')
      return
    }
    dispatch(addComment(payload));
    setContent("");
  };

  const toggleReaction = (item: IProject, e: MouseEvent<HTMLButtonElement>) => {
    const { _id: projectId } = item;
    let { likes, dislikes, liked, disliked } = item;
    const payloadAddLike = { likes: likes + 1, id: projectId, liked };
    const payloadRemoveLike = { likes: likes - 1 < 0 ? 0 : likes - 1, id: projectId, liked };
    const payloadAddDislike = { dislikes: dislikes + 1, id: projectId, disliked };
    const payloadRemoveDislike = {
      dislikes: dislikes - 1 < 0 ? 0 : dislikes - 1,
      id: projectId,
      disliked
    };
    const likedUser = liked.find((item: string) => item === user.userId)
    const dislikedUser = disliked.find((item: string) => item === user.userId);
    if (likedUser) {
      dispatch(like(payloadRemoveLike));
      return 
    }
    if (dislikedUser) {
      dispatch(dislike(payloadRemoveDislike)); 
      return
    }
    const { name } = e.target as HTMLButtonElement
    if (name === "like") {
      dispatch(like(payloadAddLike));
      return
    }    
    if (name === "dislike") {
      dispatch(dislike(payloadAddDislike));
      return
    }
  }

  return (
    <>
      {projects && (
        <ul>
          {projects.map((item: IProject) => (
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
                Like
              </button>
              <p>{item.likes}</p>
              <button
                type="button"
                name="dislike"
                onClick={(e) => toggleReaction(item, e)}
              >
                Dislike
              </button>
              <p>{item.dislikes}</p>
              <input type="name" value={item.title || ""} readOnly />
              <textarea value={item.description || ""} readOnly />

              <button type="button" onClick={() => handleButtonClick(item._id)}>
                {selectedProject === item._id && showComments
                  ? "Hide Comments"
                  : "Show Comments"}
              </button>
              {selectedProject === item._id && showComments && (
                <CommentList projectId={item._id} />
              )}
              {projects.length !== 0 && (
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

export default ProjectList;