import { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectProjects } from '../../redux/selectors';
import { IProject } from '../../interfaces';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { getAllComments } from '../../redux/operations';
import CommentList from '../CommentList';

const ProjectList: FC = () => {
    const projects = useSelector(selectProjects);
    const dispatch: ThunkDispatch<RTCIceConnectionState, void, AnyAction> =
      useDispatch();
    return (
      <>
        {projects.length !== 0 && (
          <ul>
            {projects.map((item: IProject) => (
              <li key={item._id}>
                <img
                  src={item.image.url}
                  alt="project"
                  width={250}
                  height={150}
                />
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <button
                  type="button"
                  onClick={() => dispatch(getAllComments(item._id))}
                >
                  Click to see the comments
                </button>
                <CommentList />
              </li>
            ))}
          </ul>
        )}
      </>
    );
}

export default ProjectList