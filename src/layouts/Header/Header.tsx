import {NavLink} from "react-router-dom";

import {SearchBox} from "../../components/SearchBox";
import "./Header.css";

export const Header = () => {
    return (
        <header>
            <nav>
                <NavLink to="/movies">Movies App</NavLink>
                <NavLink to="/movies/login">Login</NavLink>
                <NavLink to="/movies/register">Sign Up</NavLink>
                <SearchBox/>
            </nav>
        </header>
    );
};
