import React, { FC } from 'react'
import { useSelector } from 'react-redux';
import { selectComments } from '../../redux/selectors';
import { IComment } from '../../interfaces';

const CommentList: FC = () => {
    const comments = useSelector(selectComments)
    return (
      <>
        {comments.length !== 0 && (
          <ul>
            {comments.map((comment: IComment) => (
                
                <li key={comment._id}>
                <p>{comment.author.username}</p>
                <img src={comment.author.avatar.url} alt="avatar" />
                <p>{comment.content}</p>
                <p>Created {comment.createdAt}</p>
                <p>Updated {comment.updatedAt}</p>
              </li>
            ))}
          </ul>
        )}
      </>
    );
}

export default CommentList