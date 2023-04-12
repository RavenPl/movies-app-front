import {Link} from "react-router-dom";

import "./NotFoundView.css"

export const NotFoundView = () => {
    return (
        <div className="not-found-error">
            <h2>Not found error - 404!</h2>
            <Link to="/movies">Home Page</Link>
        </div>
    )
}