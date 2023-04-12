import ReactDOM from 'react-dom/client';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";

import {RootLayout} from "./layouts/RootLayout";
import {RegisterForm} from "./pages/RegisterForm/RegisterForm";
import {GlobalProvider} from "./contexts/GlobalContext";
import {LoginForm} from "./pages/LoginForm/LoginForm";
import './index.css';
import {Test} from "./pages/Test";
import {Logout} from "./components/Logout/Logout";
import {NotFoundView} from "./pages/NotFoundView/NotFoundView";
import {DeleteUser} from "./pages/DeleteUser";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/movies" element={<RootLayout/>}>

                {/*<Route path="/movies" element={<RootLayout/>}/>*/}
                <Route path="/movies/register" element={<RegisterForm/>}/>
                <Route path="/movies/login" element={<LoginForm/>}/>
                <Route path="/movies/logout" element={<Logout/>}/>
                <Route path="/movies/test" element={<Test/>}/>
                <Route path="/movies/delete" element={<DeleteUser/>}/>

            </Route>
            <Route path="*" element={<NotFoundView/>}/>

        </>
    )
    )
;

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <React.StrictMode>
    <GlobalProvider>
        <RouterProvider router={router}/>
    </GlobalProvider>
    // </React.StrictMode>
)
;
