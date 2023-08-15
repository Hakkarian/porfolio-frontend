import { FC, lazy, Suspense, useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { Routes, Route, useSearchParams, BrowserRouter } from 'react-router-dom';
import { currenti } from '../../redux/operations';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import AppBar from './AppBar';
import PrivateView from '../../views/PrivateView';
import RestrictedView from '../../views/ResctrictedView';
import { useSelector } from 'react-redux';
import { selectToken } from '../../redux/selectors';
import { setGoogleUser } from '../../redux/slice/userSlice';
import { ContainerCss } from '../../utils';
import { ThemeProvider } from '@emotion/react';
import { lightTheme, darkTheme, ILightTheme } from '../../constants/theme';

const HomePage = lazy(() => import("../../pages/HomePage"));
const ProjectPage = lazy(() => import('../../pages/ProjectPage'));
const RegisterPage = lazy(() => import("../../pages/RegisterPage"));
const LoginPage = lazy(() => import("../../pages/LoginPage"));
const ProfilePage = lazy(() => import("../../pages/ProfilePage"));

const App: FC = () => {
  const [theme, setTheme] = useState('light');
  const token = useSelector(selectToken);
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams()

  const isDarkTheme = theme === 'dark';

  console.log(theme)

  useEffect(() => {
    if (token) {
      dispatch(currenti());
    }
  }, [dispatch, token])

  useEffect(() => {
    const token = searchParams.get("token");
    const username = searchParams.get("username");
    const email = searchParams.get("email");
    const url = searchParams.get("url");
    const avatarId = searchParams.get("avatarId");
    const userId = searchParams.get("userId");
    const location = searchParams.get("location");
    const birthday = searchParams.get("birthday");
    const phone = searchParams.get("phone");
    if (token) {
      const payload = {
        token, user: { username, email, location, birthday, phone, avatar: { url, id: avatarId }, userId }
      }
      dispatch(setGoogleUser(payload))
    }
    searchParams.delete("token");
    searchParams.delete("username");
    searchParams.delete("email");
    searchParams.delete("url");
    searchParams.delete("avatarId");
    searchParams.delete("userId");
    searchParams.delete("location");
    searchParams.delete("birthday");
    searchParams.delete("phone");
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams, token, dispatch])


  const toggleTheme = () => {
    setTheme(isDarkTheme ? 'light' : 'dark');
    if (isDarkTheme) {
      document.querySelector('body')?.setAttribute('data-theme', 'dark')
    } else {
      document.querySelector('body')?.setAttribute('data-theme', 'light')
    }
  }

  return (
    <>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
              <ContainerCss id="light">
                <AppBar toggleTheme={toggleTheme} />
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
              </ContainerCss>
        </ThemeProvider>
    </>
  );
}

export default App