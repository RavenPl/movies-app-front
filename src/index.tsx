import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider,} from "react-router-dom";

import {RootLayout} from "./layouts/RootLayout";
import {RegisterForm} from "./pages/RegisterForm/RegisterForm";
import {GlobalProvider} from "./contexts/GlobalContext";
import {LoginForm} from "./pages/LoginForm/LoginForm";
import {LogoutUser} from "./pages/LogoutUser/LogoutUser";
import {NotFoundView} from "./pages/NotFoundView/NotFoundView";
import {DeleteUser} from "./pages/DeleteUser/DeleteUser";
import {Bookmarks} from "./pages/Bookmarks/Bookmarks";
import "./index.css";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Navigate to="/movies"/>}/>
            <Route path="/movies" element={<RootLayout/>}>
                <Route path="/movies/bookmarks" element={<Bookmarks/>}/>
                <Route path="/movies/register" element={<RegisterForm/>}/>
                <Route path="/movies/login" element={<LoginForm/>}/>
                <Route path="/movies/logout" element={<LogoutUser/>}/>
                <Route path="/movies/delete" element={<DeleteUser/>}/>
            </Route>
            <Route path="*" element={<NotFoundView/>}/>
        </>
    )
);
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <GlobalProvider>
            <RouterProvider router={router}/>
        </GlobalProvider>
    </React.StrictMode>
);
