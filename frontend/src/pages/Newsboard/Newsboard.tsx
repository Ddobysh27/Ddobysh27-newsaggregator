import { DragAndDrop } from "../../components";
import { useAppDispatch } from "../../store";

import { logoutUser } from "../../store/auth/actionCreators";


const Newsboard = () => {

    const dispatch = useAppDispatch();

    return (
        <div>
            <div><h1>Newsboard</h1></div>
            <button onClick={() => { dispatch(logoutUser()) }}>Logout</button>
            <DragAndDrop />
        </div>
    );
}

export default Newsboard;