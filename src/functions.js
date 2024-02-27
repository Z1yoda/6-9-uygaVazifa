function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

function validate(emailRef, usernameRef, passwordRef, setError) {
    let isValid = true;

    if (!validateEmail(emailRef.current.value)) {
        setError(prevError => ({ ...prevError, emailError: "Enter a valid email!" }));
        emailRef.current.focus();
        isValid = false;
    } else {
        setError(prevError => ({ ...prevError, emailError: '' }));
    }

    if (username.value.trim().length < 3) {
        setError(prevError => ({ ...prevError, usernameError: "Enter a valid username!" }));
        usernameRef.current.focus();
        isValid = false;
    } else {
        setError(prevError => ({ ...prevError, usernameError: '' }));
    }

    if (password.value.trim().length < 3) {
        setError(prevError => ({ ...prevError, passwordError: "Enter a valid password!" }));
        passwordRef.current.focus();
        isValid = false;
    } else {
        setError(prevError => ({ ...prevError, passwordError: '' }));
    }

    return isValid;
}

export { validate };
