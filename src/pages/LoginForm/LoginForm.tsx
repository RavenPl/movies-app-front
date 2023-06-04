import {FormEvent, useContext, useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";

import {GlobalContext} from "../../contexts/GlobalContext";
import {FormValidationErrorMessage} from "../../components/common/FormValidationErrorMessage";
import {Spinner} from "../../components/common/Spinner/Spinner";
import {DataError} from "../../interfaces";
import {apiURL} from "../../utils/constants";

export const LoginForm = () => {

    const {isLogged, setIsLogged, setBookmarks} = useContext(GlobalContext);
    const [error, setError] = useState<null | DataError>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorDisplay, setErrorDisplay] = useState<string>("");

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {

        setErrorDisplay("block");
    }, [error])

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value
        }));
    };

    const formHandler = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const resp = await fetch(`${apiURL}/auth/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(form)
            });

            const data = await resp.json();
            const {favouriteMovies} = data;

            if ([400, 401, 500].includes(resp.status)) {
                console.log('jjj');
                setError(prev => ({
                    ...prev,
                    code: resp.status,
                    message: data.message,
                }));
                setLoading(false);
                return;
            }
            setBookmarks([...favouriteMovies]);
            setIsLogged(true);
            setLoading(false);

        } catch (e: any) {
            console.log(e.message);
            setError(prev => ({...prev, code: 500, message: "Sorry, try again later!"}));
            setLoading(false);
        }
    }

    if (loading) {
        return <Spinner/>
    }

    if (isLogged) {
        return <Navigate to={"/movies"}/>
    }

    return (<>
            <div className="form_container">
                <form method="POST" onSubmit={formHandler} className="form_wrapper">
                    <h3>Login!</h3>
                    {error && <FormValidationErrorMessage message={error.message} display={errorDisplay}/>}
                    <label>
                        <span>Email</span>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onInput={() => setErrorDisplay("none")}
                            onChange={e => updateForm(e.target.name, e.target.value)}
                        />
                    </label>
                    <label>
                        <span>Password</span>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onInput={() => setErrorDisplay("none")}
                            onChange={e => updateForm(e.target.name, e.target.value)}
                        />
                    </label>
                    <button>Submit</button>
                </form>
            </div>
        </>
    );
};
