import { FC, useState, ChangeEvent, memo } from 'react'
import { useSelector } from 'react-redux';
import { selectComments, selectUser } from '../../redux/selectors';
import { CommentListProps, IComment } from '../../interfaces';
import { useDispatch } from 'react-redux';
import { delComment, updComment } from '../../redux/operations';
import { AnyAction } from 'redux';
import { ThunkDispatch } from '@reduxjs/toolkit';


const CommentList: FC<CommentListProps> = ({ projectId }) => {
  // typescript dispatch preparations
  const dispatch: ThunkDispatch<RTCIceConnectionState, null, AnyAction> =
    useDispatch();
  const comments = useSelector(selectComments);
  const {user} = useSelector(selectUser);
  const [selectedComment, setSelectedComment] = useState("");
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");

  // handle comment update
  const handleUpdate = (comment: { content: string, _id: string }) => {
    // renaming the id
    const { _id: id } = comment;
    // passing to the payload, which contains text, id of the comment, id of the project.
    // if user didn't type anything, then comment remains unchanged
    const payload = {
      content: text ? text : comment.content, id, projectId
    }
    dispatch(updComment(payload))
    // after comment is being updated, edit button returns to original state
    setEdit(false);
    setText("");
  }
  // handle input writing
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }
  // handle change of an edit button when user started updating the message
  const handleEdit = (id: string) => {
    setEdit(true)
    setSelectedComment(id)
  }
  // removing the comment
  const handleDelete = (projectId: string, id: string) => {
    const payload = {
      projectId, id
    }
    dispatch(delComment(payload))
  }
    return (
      <>
        {/*Comments start showing only when array is not empty*/}
        {comments.length !== 0 && (
          <ul>
            {/*For every comment inside the array, build it by the comment's blueprint. 
            Each comment has Confirm/Edit and Delete Button, author tag, avatar of the user, and the comment text*/}
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
// CommentList is memoized in order to prevent additional rerenderings
export default memo(CommentList);