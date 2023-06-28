import { FC, lazy, Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom'
import { currenti } from '../../redux/operations';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

const HomePage = lazy(() => import("../../pages/HomePage"));
const ProjectPage = lazy(() => import('../../pages/ProjectPage'));
const RegisterPage = lazy(() => import("../../pages/RegisterPage"));
const LoginPage = lazy(() => import("../../pages/LoginPage"));
const ProfilePage = lazy(() => import("../../pages/ProfilePage"));

const App: FC = () => {
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();

  useEffect(() => {
    dispatch(currenti());
  }, [dispatch])
  return (
    <>
      <NavLink to="/projects">Projects</NavLink>
      <NavLink to="/user">User</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Login</NavLink>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/user" element={<ProfilePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App