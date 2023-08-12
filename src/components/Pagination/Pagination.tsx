import {FC} from 'react'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { paginate } from '../../redux/operations';
import { useSelector } from 'react-redux';
import { selectProjects } from '../../redux/selectors';

const Pagination: FC = () => {
    const dispatch: ThunkDispatch<RTCIceConnectionState, null, AnyAction> = useDispatch();

  const { totalPages } = useSelector(selectProjects);
  console.log(totalPages)
  return (
    <>
      <ul>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <li key={page}>
              <button
                type="button"
                onClick={() => dispatch(paginate({ page, limit: 4 }))}
              >{page}</button>
            </li>
          )
        )}
      </ul>
    </>
  );
}

export default Pagination