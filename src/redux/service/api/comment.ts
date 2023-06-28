import { instance, setToken } from "./user"

const commentsApi = {
  getAllComments: async (id: string) => {
    try {
      const { data: result } = await instance.get(`projects/${id}/comments`);
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  addComment: async (data: { content: string; id: string }, token: string) => {
    try {
      setToken(token);
      const { data: result } = await instance.post(
        `projects/${data.id}/comments`,
        data
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  updateComment: async (
    data: { content: string; id: string, projectId: string },
    token: string
  ) => {
    try {
      setToken(token);
      console.log("comment upd api", data, token);
      const { data: result } = await instance.patch(
        `projects/${data.projectId}/comments/${data.id}`,
        data
      );
      console.log("comment api result");
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  deleteComment: async (data: { projectId: string, id: string }, token: string) => {
    try {
      setToken(token);
      console.log('del comment', data)
      const {data: result} = await instance.delete(`/projects/${data.projectId}/comments/${data.id}`);
      return result;
    } catch (error) {
      console.log(error)
    }
  }
};

export default commentsApi;