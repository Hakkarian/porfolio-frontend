import { Dispatch } from "react";
import { ActionType, IUpdUser, SetStateProp } from "../interfaces";
import { updUser } from '../redux/operations';



// this function basically approves what you've just edited.
const handleUpdate = (model: IUpdUser, user: string, setEdit: SetStateProp, dispatch: Dispatch<ActionType>) => {
        // here we're using redux operation, which updates the user information with his credentials
        dispatch(updUser(model));
        // after successful operation field becomes read-only
        setEdit(prevEdit => ({...prevEdit, [user]: false}))
};

export default handleUpdate;


