import { instance } from "./user"

const commentsApi = {
  getAllComments: async (id: string) => {
        try {
           const { data: result } = await instance.get(
             `projects/${id}/comments`
           );
           return result; 
        } catch (error) {
            console.log(error);
        }
  },
};

export default commentsApi;