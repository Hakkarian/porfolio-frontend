import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { FC } from 'react'
import { getAllProjects } from '../../redux/operations';
import ProjectList from '../../components/ProjectList';


const ProjectPage: FC = () => {
  const dispatch: ThunkDispatch<RTCIceConnectionState, void, AnyAction> =
    useDispatch();
  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);
  return (
    <ProjectList />
  );
}

export default ProjectPage