import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import Layout from '../../components/Layout/Layout';


function ForgotPassword() {
    const [email, setEmail] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("/api/auth/forget-password", { email });

    if (res) {
      alert("email Sent");
    }
    };

    return(
       <Layout title="forgot_password - a.piece-of-myth"> 
            <div className="form-container">
                <div className="bg-white p-3 rounded w-25">
        
                    <form onSubmit={handleSubmit}>
                        <h4 className="title">Forgot Password</h4>
                        <p>We will send Set-up password in your Email</p>
                        <div className="mb-3">
                            <input
                            type="email"
                            placeholder="Enter Your Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-success w-100 rounded-0">
                                Send
                            </button>
                        </div>

                        <div className="mb-3">
                            <button
                                type="button"
                                className="btn forgot-btn w-100 rounded-0"
                                onClick={() => {
                                navigate("/login");
                                }}>
                                Go back
                            </button>
                        </div>
                    </form>       
                </div>
            </div>
        </Layout>
    )
}

export default ForgotPassword;
