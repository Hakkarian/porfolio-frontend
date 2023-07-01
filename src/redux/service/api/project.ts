import { instance, setToken } from "./user"


const projectApi = {
  getAllProjects: async () => {
    const {data: result} = await instance.get("/projects");
    return result;
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
      console.log(error)
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

      setToken(token)
      const { data: result } = await instance.patch(`/projects/${data.id}`, formData)
      return result;
    } catch (error) {
      console.log(error)
    }
  }
};

export default projectApi;