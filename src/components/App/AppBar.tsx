import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/operations';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { selectAvatar, selectToken, selectUser } from '../../redux/selectors';

const AppBar: FC = () => {
  const { user } = useSelector(selectUser);
  // const avatar = useSelector(selectAvatar);
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
          {user ? <div>
            <img src={user?.avatar.url} alt="avatar" width={40} height={40}/>
            <p>{user?.username}</p>
          </div> : <div>Yes</div>}
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