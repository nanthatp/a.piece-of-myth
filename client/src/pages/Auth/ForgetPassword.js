import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Layout from '../../components/Layout/Layout';
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";


function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
  
    const navigate = useNavigate();
  
    // form function
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post("/api/v1/auth/forgot-password", {
          email,
          newPassword,
          answer,
        });
        if (res && res.data.success) {
          toast.success(res.data && res.data.message);
  
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };

    return(
       <Layout title="forgot_password - a.piece-of-myth"> 
            <div className="form-container">
                <div className="bg-white p-3 rounded w-25">
        
                    <form onSubmit={handleSubmit}>
                        <h4 className="title">Forgot Password?</h4>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Your Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Enter Your Email "
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Your Secret Word
                            </label>
                            <input 
                                type="text" 
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className="form-control" 
                                id="exampleInputEmail1" 
                                placeholder="Enter Your Answer"
                                required
                            />
                        </div> 
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Your New Password
                            </label>
                            <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter Your New Password"
                            required
                            />
                      </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-success w-100 rounded-0">
                                RESET
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
