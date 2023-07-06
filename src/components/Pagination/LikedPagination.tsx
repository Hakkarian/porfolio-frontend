import { FC } from "react";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { getLikedProjects, paginate } from "../../redux/operations";
import { useSelector } from "react-redux";
import { selectProjects } from "../../redux/selectors";

const LikedPagination: FC = () => {
  const dispatch: ThunkDispatch<RTCIceConnectionState, null, AnyAction> = useDispatch();

  const { totalPages } = useSelector(selectProjects);
  return (
    <>
      <ul>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <li key={page}>
              <button
                type="button"
                onClick={() => dispatch(getLikedProjects({ page, limit: 4 }))}
              >
                {page}
              </button>
            </li>
          )
        )}
      </ul>
      {/* {currentPage > 1 && (
        <button
          type="button"
          onClick={() =>
            dispatch(paginate({ page: currentPage - 1, limit: 4 }))
          }
        >
          Previous
        </button>
      )}
      {currentPage < totalPages && (
        <button
          type="button"
          onClick={() =>
            dispatch(paginate({ page: currentPage + 1, limit: 4 }))
          }
        >
          Next
        </button>
      )} */}
    </>
  );
};

export default LikedPagination;
