import React, {useContext} from 'react';

import {GlobalContext} from "../../contexts/GlobalContext";
import "./LogoutUserInfo.css"

interface Props {
    logoutUser: () => void;
}

export const LogoutUserInfo = (props: Props) => {

    const {setIsLogged} = useContext(GlobalContext);

    return (
        <div className="logout-user">
            <h3>Do you really want to log out?</h3>
            <button onClick={() => props.logoutUser()}>YES!</button>
            <button onClick={() => setIsLogged(false)}>NO!</button>
        </div>
    );
};
