import { FC } from "react";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { getLikedProjects } from "../../redux/operations";
import { useSelector } from "react-redux";
import { selectProjects } from "../../redux/selectors";

const LikedPagination: FC = () => {
  const dispatch: ThunkDispatch<RTCIceConnectionState, null, AnyAction> = useDispatch();
  const { currentLikedPage, totalLikedPages } = useSelector(selectProjects);
  
  console.log('totalPages', totalLikedPages)
  return (
    <>

      {currentLikedPage > 1 && (
        <button
          type="button"
          onClick={() =>
            dispatch(getLikedProjects({ page: currentLikedPage - 1, limit: 4 }))
          }
        >
          Previous
        </button>
      )}
      {currentLikedPage < totalLikedPages && (
        <button
          type="button"
          onClick={() =>
            dispatch(getLikedProjects({ page: currentLikedPage + 1, limit: 4 }))
          }
        >
          Next
        </button>
      )}
    </>
  );
};

export default LikedPagination;
