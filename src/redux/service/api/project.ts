import instance, {setToken} from "../http/instance";


const projectApi = {
  getPaginatedProjects: async (data: {page: number, limit: number}) => {
    const { data: result } = await instance.get(`/projects?page=${data.page}&limit=${data.limit}`);
    console.log('paginate get api', result)
    return result;
  },
  getLikedProjects: async (data: {page: number, limit: number}) => {
    try {
      const { data: result } = await instance.get(
        `/projects/liked?page=${data.page}&limit=${data.limit}`
      );
      console.log('favarata', result)
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
    data: { likes: number; liked: string[]; page: number, limit: number, id: string }

  ) => {
    try {
      const { data: result } = await instance.put(
        `/projects/${data.id}/like?page=${data.page}&limit=${data.limit}`,
        data
      );
      console.log('liked api', result);
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  changeDislike: async (
    data: { dislikes: number; disliked: string[]; id: string, page: number, limit: number }
  ) => {
    try {
      const { data: result } = await instance.put(
        `/projects/${data.id}/dislike?page=${data.page}&limit=${data.limit}`,
        data
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  },
};

export default projectApi;