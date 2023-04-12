import {NavLink} from "react-router-dom";

import {SearchBox} from "../../components/SearchBox";

export const LoggedHeader = () => {
    return (
        <header>
            <nav>
                <NavLink to="/movies">Movies App</NavLink>
                <NavLink to="/movies/bookmarks">My bookmarks</NavLink>
                <NavLink to="/movies/logout">Logout</NavLink>
                <NavLink to="/movies/delete">Delete</NavLink>
                <SearchBox/>
            </nav>
        </header>
    );
};
