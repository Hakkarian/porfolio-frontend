import { FC, lazy, Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { currenti } from '../../redux/operations';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import AppBar from './AppBar';
import PrivateView from '../../views/PrivateView';
import RestrictedView from '../../views/ResctrictedView';
import { useSelector } from 'react-redux';
import { selectToken } from '../../redux/selectors';

const HomePage = lazy(() => import("../../pages/HomePage"));
const ProjectPage = lazy(() => import('../../pages/ProjectPage'));
const RegisterPage = lazy(() => import("../../pages/RegisterPage"));
const LoginPage = lazy(() => import("../../pages/LoginPage"));
const ProfilePage = lazy(() => import("../../pages/ProfilePage"));

const App: FC = () => {
  const token = useSelector(selectToken);
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(currenti());
    }
  }, [dispatch, token])
  return (
    <>
      <AppBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route element={<PrivateView />}>
            <Route path="/user" element={<ProfilePage />} />
          </Route>
          <Route element={<RestrictedView />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App