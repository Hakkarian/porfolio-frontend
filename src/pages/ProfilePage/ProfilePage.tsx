import { FC } from 'react'

import Profile from '../../components/Profile';

import LikedList from '../../components/LikedList';

import LikedPagination from '../../components/Pagination/LikedPagination';

// here we have a user profile, a list with favorite projects and a pagination of favorite projects
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