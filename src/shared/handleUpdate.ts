import { Dispatch } from "react";
import { ActionType, IUpdUser, SetStateProp } from "../interfaces";
import { updUser } from '../redux/operations';



    
const handleUpdate = (name: IUpdUser, user: string, setEdit: SetStateProp, dispatch: Dispatch<ActionType>) => {
        console.log('here upd')
        console.log('upd name', name)
        dispatch(updUser(name))
        setEdit(prevEdit => ({...prevEdit, [user]: false}))
};

export default handleUpdate;


