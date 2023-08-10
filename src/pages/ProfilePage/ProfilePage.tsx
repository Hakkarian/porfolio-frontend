import { FC } from 'react'

import Profile from '../../components/Profile';

import LikedList from '../../components/LikedList';

import LikedPagination from '../../components/Pagination/LikedPagination';


const ProfilePage: FC = () => {
  return (
    <div>
      <Profile />
      <LikedList />
      <LikedPagination />
    </div>
  );
}

export default ProfilePage