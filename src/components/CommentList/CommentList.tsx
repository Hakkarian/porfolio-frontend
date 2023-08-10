import { FC, useState, ChangeEvent, memo } from 'react'
import { useSelector } from 'react-redux';
import { selectComments, selectUser } from '../../redux/selectors';
import { CommentListProps, IComment } from '../../interfaces';
import { useDispatch } from 'react-redux';
import { delComment, updComment } from '../../redux/operations';
import { AnyAction } from 'redux';
import { ThunkDispatch } from '@reduxjs/toolkit';


const CommentList: FC<CommentListProps> = ({ projectId }) => {
  const dispatch: ThunkDispatch<RTCIceConnectionState, null, AnyAction> =
    useDispatch();
  const comments = useSelector(selectComments);
  const {user} = useSelector(selectUser);
  const [selectedComment, setSelectedComment] = useState("");
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");

  const handleUpdate = (comment: { content: string, _id: string }) => {
    const { _id: id } = comment;
    const payload = {
      content: text ? text : comment.content, id, projectId
    }
    dispatch(updComment(payload))
    setEdit(false);
    setText("");
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }
  const handleEdit = (id: string) => {
    setEdit(true)
    setSelectedComment(id)
  }
  const handleDelete = (projectId: string, id: string) => {
    const payload = {
      projectId, id
    }
    dispatch(delComment(payload))
  }
    return (
      <>
        {comments.length !== 0 && (
          <ul>
            {comments.map((comment: IComment) => <li key={comment._id}>
                {user.userId === comment.author.userId && <div>{selectedComment === comment._id && edit ? (
                  <button type="button" onClick={() => handleUpdate(comment)}>
                    Confirm
                  </button>
                ) : (
                  <button type="button" onClick={() => handleEdit(comment._id)}>
                    Edit
                  </button>
                )}
                  <button type="button" onClick={() => handleDelete(projectId, comment._id)}>
                    Delete
                  </button></div>}
                <p>{comment.author.username}</p>
                <img
                  src={comment.author.avatar.url}
                  alt="avatar"
                  width={40}
                  height={40}
                />
                {selectedComment === comment._id && edit ? (
                  <textarea
                    defaultValue={comment.content}
                    onChange={handleChange}
                  />
                ) : (
                  <textarea value={comment.content || ""} readOnly />
                )}
              </li>
            )}
          </ul>
        )}
      </>
    );
}

export default memo(CommentList);