import { ChangeEvent, FC, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectProjects } from '../../redux/selectors';
import { IProject } from '../../interfaces';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { addComment, getAllComments } from '../../redux/operations';
import CommentList from '../CommentList';

const ProjectList: FC = () => {
  const [selectedProject, setSelectedProject] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [content, setContent] = useState("");

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
    dispatch(addComment(payload));
    setContent("");
  };

  return (
    <>
      {projects.length !== 0 && (
        <ul>
          {projects.map((item: IProject) => <li key={item._id}>
                  <img
                    src={item.image.url}
                    alt="project"
                    width={250}
                    height={150}
                  />
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
          )}
        </ul>
      )}
    </>
  );
};

export default ProjectList;