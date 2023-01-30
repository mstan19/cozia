import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Home = () => {

    return (
        <main>
            <div>
                homepage of cozia
            </div>
            {Auth.loggedIn() ? (
                  <p>
                    <Link to="/dashboard" id="dash-link" key="already-login">
                      Go to your dashboard
                    </Link>
                  </p>
                ) : (
                  <p>
                    <Link to="/login" id="start-link" key="needs-login">
                      Log in to get started
                    </Link>
                  </p>
                )}
        </main>
    );
}

export default Home;