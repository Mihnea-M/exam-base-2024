import React from "react";
import AppContext from '../../state/AppContext'
import { useParams } from 'react-router-dom'
import Comment from '../Comment'


function TaskComments() {
  const globalState = React.useContext(AppContext)

  const [comments, setComments] = React.useState([]);
  const [isAddingNewComment, setIsAddingNewComment] = React.useState(false);
  const [newComment, setNewComment] = React.useState("");

  const params = useParams()
  const projectId = params.pid
  const taskId = params.tid

  function addNewComment() {
    setIsAddingNewComment(true);
  }

  function createNewComment() {
    globalState.comment.createComment(globalState, projectId, taskId, newComment);
    setIsAddingNewComment(false);
  }

  React.useEffect(() => {
    globalState.comment.emitter.addListener("GET_COMMENTS_SUCCESS", () => {
      setComments(globalState.comment.data);
    });
    globalState.comment.getAll(globalState, projectId, taskId);
  }, []);

  return (
    <div>
      <h3>Comments</h3>
      {comments.length > 0 ? (
        comments.map((comment) => {
          return <Comment comment={comment}/>;
        })
      ) : (
        <div>No comments found</div>
      )}
      {isAddingNewComment && (
        <div>
          <input type="text" value={newComment} onChange={e => setNewComment(e.target.value)} />
          <button onClick={createNewComment}>Create new comment</button>
        </div>
      )}
      {!isAddingNewComment && (
        <button onClick={addNewComment}>Add new comment</button>
      )}
    </div>
  );
}

export default TaskComments;
