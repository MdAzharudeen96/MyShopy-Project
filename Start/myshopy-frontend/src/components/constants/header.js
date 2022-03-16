import React from "react";
import * as ROUTES from "./routes";
import { Link } from "react-router-dom";
import "./header.css";

export default function Headers(){

    return(
        <header className="main-header">
            <h1 className="logo-name">MyShopy</h1>
            <div className="header-right">
                <h3 className="img-log">
                    <Link to={ROUTES.LOGIN}>
                        Login
                    </Link>
                </h3>
                <h3 className="img-cart">Cart</h3>
            </div>
        </header>
    )
}