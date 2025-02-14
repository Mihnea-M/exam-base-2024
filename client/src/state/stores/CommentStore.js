import EventEmitter from "../../utils/EventEmitter";
import { SERVER } from "../../config/global";

class CommentStore {
  constructor() {
    this.data = [];
    this.emitter = new EventEmitter();
  }
  async getAll(state, projectId, taskId) {
    try {
      const response = await fetch(
        `${SERVER}/api/users/${state.user.data.id}/projects/${projectId}/tasks/${taskId}/comments`,
        {
          headers: {
            authorization: state.user.data.token,
          },
        }
      );
      if (!response.ok) {
        throw response;
      }
      const content = await response.json();
      this.data = content.data;
      this.emitter.emit("GET_COMMENTS_SUCCESS");
    } catch (err) {
      console.warn(err);
      this.emitter.emit("GET_COMMENTS_ERROR");
    }
  }

  async createComment(state, projectId, taskId, comment) {
    try {
        console.log(projectId)
        console.log(taskId)
        
      const response = await fetch(
        `${SERVER}/api/users/${state.user.data.id}/projects/${projectId}/tasks/${taskId}/comments`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            authorization: state.user.data.token,
          },
          body: JSON.stringify({content: comment}),
        }
      );
      if (!response.ok) {
        throw response;
      }
      this.getAll(state, projectId, taskId);
    } catch (err) {
      console.warn(err);
      this.emitter.emit("ADD_TASK_ERROR");
    }
  }
}

export default CommentStore;
