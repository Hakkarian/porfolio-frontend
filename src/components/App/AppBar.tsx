import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/operations';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { selectToken, selectUser } from '../../redux/selectors';
import { AvatarUsername, HeaderCss, Nav, NavLinkCss, UserWrap } from './AppBar.styled';
import { Button } from '../../shared/CssTools.styled';
import DarkMode from '../DarkMode/DarkMode';

export interface AppProps {
  toggleTheme: () => void
}

const AppBar: FC<AppProps> = ({toggleTheme}) => {
  const { user } = useSelector(selectUser);
  const token = useSelector(selectToken);
  const userone = useSelector(selectUser);

  console.log(userone)

  console.log(token)

    const dispatch: ThunkDispatch<RTCIceConnectionState, null, AnyAction> = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser())
    }
  return (
    <HeaderCss>
      {token ? (
        <>
          <Nav className="header__nav">
            <NavLinkCss to="/">Home</NavLinkCss>
            <NavLinkCss to="/projects">Projects</NavLinkCss>
            <NavLinkCss to="/user">User</NavLinkCss>
          </Nav>
          <UserWrap className="header__user-wrap">
            {user && (
              <AvatarUsername className="header__avatar-username">
                <div className="header__avatar">
                  <img
                    src={user?.avatar.url}
                    alt="avatar"
                    width={40}
                    height={40}
                  />
                </div>
                <p>Welcome, {user?.username}</p>
              </AvatarUsername>
            )}
                <DarkMode toggleTheme={toggleTheme} />
              <Button
                type="button"
                className="header__button--transparent-bg"
                onClick={handleLogout}
              >
                Logout
              </Button>
          </UserWrap>
        </>
      ) : (
        <>
          <NavLinkCss to="/register">Register</NavLinkCss>
          <NavLinkCss to="/login">Login</NavLinkCss>
        </>
      )}
    </HeaderCss>
  );
}

export default AppBar