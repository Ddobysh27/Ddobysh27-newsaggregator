import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import Login from "../../components/Login";
import Newsboard from "../Newsboard";

const Main = () => {

    const isLoggedIn = useSelector(
        (state: IRootState) => !!state.auth.authData.accessToken
    );

    return (
        <div>
            {isLoggedIn ? <Newsboard /> : <Login />}
        </div>
    );
}

export default Main;