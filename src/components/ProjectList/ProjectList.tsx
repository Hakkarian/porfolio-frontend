import { ChangeEvent, FC, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectProjects } from '../../redux/selectors';
import { IProject, IUpdProj } from '../../interfaces';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { addComment, getAllComments, updateProject } from '../../redux/operations';
import CommentList from '../CommentList';

const ProjectList: FC = () => {
  const [edit, setEdit] = useState(false)
  const [state, setState] = useState<IUpdProj>({
    title: "",
    description: "",
    image: null
  });
  const [selectedProject, setSelectedProject] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [content] = useState("");

  console.log('image', state.image);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

      setState(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value,
        image: file || prevState.image,
      }));
    console.log('handleChange', state.title)

  };

  const handleUpdate = (item: IProject) => {
    const { title, description, image } = state;
    const payload = {
      title: title ? title : item.title, description: description ? description : item.description, image, id: item._id
    }
    console.log('proj payload', payload)
    dispatch(updateProject(payload))
    setEdit(false);
    setState({
      title: "",
      description: "",
      image: null
    })
  }

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
    console.log('submit payload', payload)
    dispatch(addComment(payload));
  };
  const handleEdit = (id: string) => {
    setSelectedProject(id)
    setEdit(true)
  }

  return (
    <>
      {projects && (
        <ul>
          {projects.map((item: IProject) => (
            <li key={item._id}>
              {selectedProject === item._id && edit ? (
                <button type="button" onClick={() => handleUpdate(item)}>
                  Confirm
                </button>
              ) : (
                <button type="button" onClick={() => handleEdit(item._id)}>
                  Edit
                </button>
              )}
              {selectedProject === item._id && edit ? (
                <>
                  <img
                    src={item.image.url}
                    alt="project"
                    width={250}
                    height={150}
                  />
                  <input type="file" onChange={handleChange} />
                  <input
                    type="name"
                    name="title"
                    value={state.title || item.title}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="description"
                    defaultValue={item.description}
                    value={state.description || item.description}
                    onChange={handleChange}
                  />
                </>
              ) : (
                <>
                  <img
                    src={item.image.url}
                    alt="project"
                    width={250}
                    height={150}
                  />
                  <input type="name" defaultValue={item.title} readOnly />
                  <textarea defaultValue={item.description} readOnly />
                </>
              )}
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