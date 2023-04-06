import React, {FormEvent, useEffect, useState} from 'react';

import {Spinner} from "../components/comon/Spinner/Spinner";
import {DataErrors} from "../interfaces";
import {ErrorMessage} from "../components/comon/InputError";
import "./RegisterForm.css";
import {Navigate} from 'react-router-dom';

export const RegisterForm = () => {

    const [error, setError] = useState<null | DataErrors>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorDisplay, setErrorDisplay] = useState<string>("");
    const [isRegister, setIsRegister] = useState<boolean>(false);
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        setErrorDisplay("block");
    }, [error])

    const formHandler = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const resp = await fetch(`http://localhost:3001/movies/auth/register`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            const data = await resp.json();

            const error: DataErrors = {
                code: resp.status,
                message: data.message,
            }

            if ([400, 500].includes(resp.status)) {
                setError(error);
                return;
            }
            setIsRegister(true);
        } finally {
            setLoading(false);
        }
    }

    if (isRegister) {
        return <Navigate to="/movies/login"/>
    }

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value
        }));
    }

    if (loading) {
        return <Spinner/>
    }

    return (
        <div className="form_container">

            <form method="POST" onSubmit={formHandler} className="form_wrapper">
                <h3>Register!</h3>
                {error && <ErrorMessage message={error.message} display={errorDisplay}/>}
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

                <label htmlFor="">
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
    );
}


