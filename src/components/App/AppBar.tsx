import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/operations';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { selectToken, selectUser } from '../../redux/selectors';
import { AvatarUsername, HeaderCss, Nav, NavLinkCss, UserWrap } from './AppBar.styled';
import { Button } from '../../shared/CssTools.styled';

const AppBar: FC = () => {
  const { user } = useSelector(selectUser);
  // const avatar = useSelector(selectAvatar);
  const token = useSelector(selectToken);

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
                <img
                  src={user?.avatar.url}
                  alt="avatar"
                  width={40}
                  height={40}
                />
                <p>Welcome, {user?.username}</p>
              </AvatarUsername>
            )}
            <Button type="button" className='header__button--transparent-bg' onClick={handleLogout}>
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