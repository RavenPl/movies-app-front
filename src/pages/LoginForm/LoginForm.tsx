import {FormEvent, useContext, useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";

import {DataError} from "../../interfaces";
import {FormValidationErrorMessage} from "../../components/comon/FormValidationErrorMessage";
import {Spinner} from "../../components/comon/Spinner/Spinner";
import {GlobalContext} from "../../contexts/GlobalContext";

export const LoginForm = () => {

    const [error, setError] = useState<null | DataError>(null);
    const {isLogged, setIsLogged} = useContext(GlobalContext);
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
            const resp = await fetch(`http://localhost:3001/movies/auth/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(form)
            });

            const data = await resp.json();
            const error: DataError = {
                code: resp.status,
                message: data.message,
            };

            if ([400, 401, 500].includes(resp.status)) {
                setError(error);
                setLoading(false);
                return;
            }
            setIsLogged(true);
            setLoading(false);

        } catch (e: any) {
            console.log(e.message);
            setError({code: 500, message: "Sorry, try again later!"});
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
