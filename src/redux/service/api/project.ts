import { instance, setToken } from "./user"


const projectApi = {
  getPaginatedProjects: async (data: {page: number, limit: number}) => {
    const { data: result } = await instance.get(`/projects?page=${data.page}&limit=${data.limit}`);
    return result;
  },
  getLikedProjects: async (data: {page: number, limit: number}) => {
    try {
      const { data: result } = await instance.get(
        `/projects/liked?page=${data.page}&limit=${data.limit}`
      );
      return result;
    } catch (error) {
      console.log(error)
    }
  },
  addProject: async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      if (data.description) {
        formData.append("description", data.description);
      }
      if (data.image) {
        formData.append("image", data.image);
      }
      const { data: result } = await instance.post("/projects", formData);
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  updProject: async (data: any, token: string) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.image) {
        formData.append("image", data.image);
      }

      setToken(token);
      const { data: result } = await instance.patch(
        `/projects/${data.id}`,
        formData
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  changeLike: async (
    data: { likes: number; liked: string[]; id: string },
    token: string
  ) => {
    try {
      const { data: result } = await instance.put(
        `/projects/${data.id}/like`,
        data
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  changeDislike: async (
    data: { dislikes: number; disliked: string[]; id: string },
    token: string
  ) => {
    try {
      const { data: result } = await instance.put(
        `/projects/${data.id}/dislike`,
        data
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  },
};

export default projectApi;