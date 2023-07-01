import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/operations';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { selectToken, selectUser } from '../../redux/selectors';

const AppBar: FC = () => {
    const { user } = useSelector(selectUser);
    const token = useSelector(selectToken);
    const dispatch: ThunkDispatch<RTCIceConnectionState, null, AnyAction> = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser())
    }
  return (
    <div>
      <NavLink to="/projects">Projects</NavLink>

      {token ? (
        <>
          <NavLink to="/user">User</NavLink>
          <div>
            <img src={user.avatar.url} alt="avatar" />
            <p>{user.username}</p>
          </div>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
        </>
      )}
    </div>
  );
}

export default AppBar