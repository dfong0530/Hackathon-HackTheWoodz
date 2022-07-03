import React, { useState } from "react";
import { sleep, DangerNotification, SuccessNotification } from "../Data/Helper";
import { CreateUser } from "../Data/GetData";
import "../CSS/CreateAccount.css";

//View for creating account
const CreateAccount = ({ navigate, setOverlays }) => {

    //Data that stores the forms
    const [accountData, setAccountData] = useState({name: "", jobTitle: "", email: "", username: "", password: ""});

    //When user submits. Post user data to API and save some of the data on the client
    const handleSubmit = async (e) => {
        e.preventDefault();

        setOverlays({loading: true, background: true});

        const { status } = await CreateUser(accountData.name, accountData.jobTitle, accountData.username, accountData.email, accountData.password);

        setOverlays({loading: false, background: false});

        navigate("/");
        await sleep(500);

        if(status ===  200){
            SuccessNotification("Success", "Your account has been added to the database");
        }
        else{
            DangerNotification("Error", "Your account has not been saved.");
        }

    };

    return (
        <>
            <div className="create-account-section">
                <h4>Create your Account</h4>
                <p>Create an account to view and manage your projects.</p>
                <form onSubmit={handleSubmit}>
                    <input className="account-half-inpL" value={accountData.name} onChange={(e) => setAccountData({...accountData, "name": e.target.value})} type="text" placeholder="Enter your name" required />
                    <input className="account-half-inpR" value={accountData.jobTitle} onChange={(e) => setAccountData({...accountData, "jobTitle": e.target.value})} type="text" placeholder="Enter your Job Title" required />
                    <br />
                    <input className="account-full-inp" value={accountData.email} onChange={(e) => setAccountData({...accountData, "email": e.target.value})} type="text" placeholder="Enter your Email" required />
                    <br />
                    <input className="account-full-inp" value={accountData.username} onChange={(e) => setAccountData({...accountData, "username": e.target.value})} type="text" placeholder="Enter your Username" required />
                    <br />
                    <input className="account-full-inp" value={accountData.password} onChange={(e) => setAccountData({...accountData, "password": e.target.value})} type="password" placeholder="Enter your Password" required  autoComplete="on" />
                    <br />
                    <button className="create-account-btn">Create Account</button>
                </form>
            </div>
        </>
    );
}

export default CreateAccount;