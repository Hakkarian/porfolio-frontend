import { FC, useEffect } from 'react'

import Profile from '../../components/Profile';
import { useSelector } from 'react-redux';
import { selectFavorite, selectProjects } from '../../redux/selectors';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { getLikedProjects } from '../../redux/operations';
import LikedList from '../../components/LikedList';
import Pagination from '../../components/Pagination';


const ProfilePage: FC = () => {
  const dispatch: ThunkDispatch<RTCIceConnectionState, null, AnyAction> =
    useDispatch();
  const favorite = useSelector(selectFavorite);
  const { currentPage } = useSelector(selectProjects);
  return (
    <div>
      <Profile />
      <LikedList />
      <Pagination />
    </div>
  );
}

export default ProfilePage