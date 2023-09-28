// import React from 'react'
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios'
// import Layout from '../../components/Layout/Layout';
// import toast from "react-hot-toast";
// import "../../styles/AuthStyles.css";


// function ForgotPassword() {
//     const [email, setEmail] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [answer, setAnswer] = useState("");
  
//     const navigate = useNavigate();
  
//     // form function
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         const res = await axios.post("/api/v1/auth/forgot-password", {
//           email,
//           newPassword,
//           answer,
//         });
//         if (res && res.data.success) {
//           toast.success(res.data && res.data.message);
  
//           navigate("/login");
//         } else {
//           toast.error(res.data.message);
//         }
//       } catch (error) {
//         console.log(error);
//         toast.error("Something went wrong");
//       }
//     };

//     return(
//        <Layout title="forgot_password - a.piece-of-myth"> 
//             <div className="form-container">
//                 <div className="bg-white p-3 rounded w-25">
        
//                     <form onSubmit={handleSubmit}>
//                         <h4 className="title">Forgot Password?</h4>
//                         <div className="mb-3">
//                             <label htmlFor="exampleInputEmail1" className="form-label">
//                                 Your Email
//                             </label>
//                             <input
//                                 type="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 className="form-control"
//                                 id="exampleInputEmail1"
//                                 placeholder="Enter Your Email "
//                                 required
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="exampleInputEmail1" className="form-label">
//                                 Your Secret Word
//                             </label>
//                             <input 
//                                 type="text" 
//                                 value={answer}
//                                 onChange={(e) => setAnswer(e.target.value)}
//                                 className="form-control" 
//                                 id="exampleInputEmail1" 
//                                 placeholder="Enter Your Answer"
//                                 required
//                             />
//                         </div> 
//                         <div className="mb-3">
//                             <label htmlFor="exampleInputEmail1" className="form-label">
//                                 Your New Password
//                             </label>
//                             <input
//                             type="password"
//                             value={newPassword}
//                             onChange={(e) => setNewPassword(e.target.value)}
//                             className="form-control"
//                             id="exampleInputPassword1"
//                             placeholder="Enter Your New Password"
//                             required
//                             />
//                       </div>
//                         <div className="mb-3">
//                             <button type="submit" className="btn btn-success w-100 rounded-0">
//                                 RESET
//                             </button>
//                         </div>

//                         <div className="mb-3">
//                             <button
//                                 type="button"
//                                 className="btn forgot-btn w-100 rounded-0"
//                                 onClick={() => {
//                                 navigate("/login");
//                                 }}>
//                                 Go back
//                             </button>
//                         </div>
//                     </form>       
//                 </div>
//             </div>
//         </Layout>
//     )
// }

// export default ForgotPassword;

import React, { useState } from "react";
import axios from "../../Services/axiosInterceptor.js"
const ForgotPassword = () => {
  const [email, setEmail] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("/api/v1/auth/forget-password", { email });

    if (res) {
      alert("email Sent");
    }
  };

  return (
    <section className="vh-100" >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card2" style={{ borderRadius: "1rem", marginTop: "80px" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://cdn.discordapp.com/attachments/417585852206809090/1140335973880832130/hghlk.jpg"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i
                          className="fas fa-cubes fa-2x me-3"
                          style={{ color: " #ff6219" }}
                        ></i>
                        <h4 className="title-register">Forget Password?</h4>
                      </div>

                      {/* <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Type Your Email Here
                      </h5> */}

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id=""
                          placeholder="Enter Your Email"
                          className="form-control form-control-lg"
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <h5
                        className="btn-forgot fw-normal mb-3 pb-3"
                        // style={{ letterSpacing: "1px" }}
                      >
                        We will send password set-up link to your email address.  Please check your inbox.
                      </h5>

                      <div className="pt-1 mb-4">
                        <button
                          className="btn-register"
                          type="submit"
                        >
                          Send Email
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
