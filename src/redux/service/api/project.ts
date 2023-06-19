import { instance } from "./user"


const projectApi = {
  getAllProjects: async () => {
    const {data: result} = await instance.get("/projects");
    console.log("api", result);
    return result;
  },
};

export default projectApi;