import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserLogin, LoadThumbnails } from "../Data/GetData";
import { DangerNotification } from "../Data/Helper";
import "../CSS/Login.css";


const Login = ({ navigate, setOverlays, setUser, setProjects }) => {

    const [loginState, setLoginState] = useState({"username": '', "password": ''});

    const handleSubmit = async (e) => {

        e.preventDefault();

        setOverlays({loading: true, background: true});

        const { name, jobTitle, status } = await UserLogin(loginState.username, loginState.password);

        if(status === 200){

            //If you get the data set some global varaibles
            setUser({name: name, jobTitle: jobTitle, username: loginState.username, password: loginState.password});

            //Get the Thumbnails for the project
            const { status, projects } = await LoadThumbnails(loginState.username);
            setOverlays({loading: false, background: false});

            if(status === 200){

                setProjects(projects);
                navigate("/projects");
            }
            else{
                DangerNotification("Error", "Failed to Load Resources");
            }
            
        }

        else{
            setOverlays({loading: false, background: false});
            DangerNotification("Unsuccessful", "Your username or password is incorrect.")
        }

    }

    return (
        <div className="login-wrapper">
            <div className="login-box">
                <h4>Sign In</h4>
                <p>or <Link className="create-account-link" to="./create-account">create an account</Link></p>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input value={loginState.username} onChange={(e) => setLoginState({...loginState, "username": e.target.value})} type="text" placeholder="Username" required />
                    <br />
                    <input value={loginState.password} onChange={(e) => setLoginState({...loginState, "password": e.target.value})} type="password" placeholder="Password" required autoComplete="on" />
                    <br />
                    <button className="login-btn">Sign In</button>
                </form>
            </div>
            <p className="forgot-p">Fogot Password? <span className="forgot-btn">Reset Password</span></p>
        </div>
    );
}

export default Login;