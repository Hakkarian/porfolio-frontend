import { FC } from "react";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { getLikedProjects } from "../../redux/operations";
import { useSelector } from "react-redux";
import { selectProjects } from "../../redux/selectors";

const LikedPagination: FC = () => {
  const dispatch: ThunkDispatch<RTCIceConnectionState, null, AnyAction> = useDispatch();
  const {currentPage} = useSelector(selectProjects);

  const { totalPages } = useSelector(selectProjects);
  return (
    <>

      {currentPage > 1 && (
        <button
          type="button"
          onClick={() =>
            dispatch(getLikedProjects({ page: currentPage - 1, limit: 4 }))
          }
        >
          Previous
        </button>
      )}
      {currentPage < totalPages && (
        <button
          type="button"
          onClick={() =>
            dispatch(getLikedProjects({ page: currentPage + 1, limit: 4 }))
          }
        >
          Next
        </button>
      )}
    </>
  );
};

export default LikedPagination;
