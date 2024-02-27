import React from "react";
import { NavLink } from "react-router-dom";
import { validate } from "../functions";
import { useRef, useState } from "react";
import check from '../assets/check.svg'

function Register() {
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
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

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

            fetch("https://auth-rg69.onrender.com/api/auth/signup", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
                .then((res) => res.json())
                .then((data) => {
                    setLoading(false);

                    if (data.message === "Failed! Username is already in use!") {
                        setError(prevError => ({ ...prevError, userError: "Username is already in use!" }));

                        const form = document.getElementById('form')
                        form.reset()
                        emailRef.current.focus()
                    } else if (data.message === "User registered successfully!") {
                        form.style.display = 'none'
                        setRegistrationSuccess(true)
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
            <h2 className="text-center mb-4">Register Page</h2>

            <form id="form" onSubmit={handleClick}>
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
                <button type="submit" className="btn btn-primary">
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
                <NavLink to="/login">Login</NavLink>
            </form>

            {registrationSuccess && (
                <div id="card" className="card text-center border-success" >
                    <div className="card-body">
                        <img className="mb-3" src={check} alt="" />
                        <h3 className="card-text mb-3">User registered successfully</h3>
                        <NavLink to="/" className="btn btn-success">Go Home</NavLink>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Register;
