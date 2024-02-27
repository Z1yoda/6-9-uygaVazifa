import React from "react"

function Home({ userData }) {

    localStorage.setItem("userData", JSON.stringify(userData));

    return (
        <div className="container mt-4 col-6">
            <h2 className="text-center mb-4">Home</h2>

            <div id="card" className="card text-center border-primary" >
                {userData && (
                    <div className="card-body">
                        <h4>Email: {userData.email}</h4>
                        <h4>Username: {userData.username}</h4>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home