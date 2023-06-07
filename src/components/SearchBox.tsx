import React, {useContext, useState} from 'react';
import {MdSearch} from "react-icons/md";

import {movieSearch} from "../utils/constants";
import {GlobalContext} from "../contexts/GlobalContext";

export const SearchBox = () => {

    const {setMovies, setError} = useContext(GlobalContext);
    const [search, setSearch] = useState<string>("");

    const searchHandler = async (e: any) => {
        e.preventDefault();
        const resp = await fetch(`${movieSearch}${search}`);
        const data = await resp.json();

        if ((data.Response === "False")) {
            setSearch("");
            setError(prev => ({
                ...prev,
                message: data.Error,
                code: 400
            }))
            return
        }
        setMovies(() => [...data.Search]);
        setSearch("");
    }

    return (
        <>
            <form onSubmit={searchHandler} className="search-box">
                <input
                    className="search-box_input"
                    type="text"
                    placeholder="Search movie..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <span className="search-box_span">
                    <MdSearch size="100%"/>
                </span>
            </form>

        </>
    );
};
