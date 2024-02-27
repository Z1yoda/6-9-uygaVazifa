import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { validate } from "../functions";
import { useRef, useState } from "react";

function Login({ onLogin }) {
    const navigate = useNavigate()
    const emailRef = useRef("");
    const usernameRef = useRef("");
    const passwordRef = useRef(0);
    const [error, setError] = useState({
        usernameError: "",
        emailError: "",
        passwordError: "",
        userError: ""
    });
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({})

    function handleClick(e) {
        e.preventDefault();
        if (validate(emailRef, usernameRef, passwordRef, setError)) {
            console.log("Validation passed");

            const user = {
                username: usernameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            };

            setLoading(true);

            fetch("https://auth-rg69.onrender.com/api/auth/signin", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
                .then((res) => res.json())
                .then((data) => {
                    setData(data)
                    setLoading(false);

                    if (data.message === "User Not found.") {
                        setError(prevError => ({ ...prevError, userError: "User Not found!" }));
                        emailRef.current.focus()
                    } else if (data.message === "Invalid Password!") {
                        setError(prevError => ({ ...prevError, userError: "Invalid Password" }));
                        passwordRef.current.focus()
                    } else {
                        onLogin(data)
                        navigate('/')
                    }

                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }


    }


    return (
        <div className="container mt-4 col-5">
            <h2 className="text-center mb-4">Login Page</h2>

            <form id="form" >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        ref={emailRef}
                    />
                    {error.emailError && (
                        <p id="emailError" className="form-text text-danger">
                            {error.emailError}
                        </p>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        aria-describedby="emailHelp"
                        ref={usernameRef}
                    />
                    {error.usernameError && (
                        <p id="usernameError" className="form-text text-danger">
                            {error.usernameError}
                        </p>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        ref={passwordRef}
                    />
                    {error.passwordError && (
                        <p id="passwordError" className="form-text text-danger">
                            {error.passwordError}
                        </p>
                    )}
                </div>
                {error.userError && (
                    <p id="userError" className="form-text text-danger">
                        {error.userError}
                    </p>
                )}
                <button className="btn btn-success" onClick={handleClick}>
                    {loading ? 'Loading...' : 'Log in'}
                </button>
                <NavLink to="/register">Sign up</NavLink>
            </form>
        </div>
    )
}

export default Login