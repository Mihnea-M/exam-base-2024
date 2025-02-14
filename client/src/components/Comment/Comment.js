import React from 'react';

function Comment( { comment } ) {
  return <div>
    <div>Comment by {comment.user.email}</div> 
    <div>{comment.content}</div> 
    <div>Created at: {comment.createdAt}</div> 
  </div>;
}

export default Comment;
