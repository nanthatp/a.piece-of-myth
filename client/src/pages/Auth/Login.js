import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="login - a.piece-of-myth">
      <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
      <div className="card2" style={{ borderRadius: "1rem" , marginTop: "80px" }}>
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
        <form onSubmit={handleSubmit} >
          <h4 className="title-register">LOGIN</h4>

          <div className="mb-3">
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          
          <div className="mb-3">
            <button type="submit" className="btn-log">
              LOGIN
            </button>
          </div>
          
          <p className="btn-forgot" style={{ color: "#393f81" }}>
            Forgot your Password?{" "}
            <Link to="/forgot-password" className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover btn-forgot">
              click here
            </Link>
          </p>

          <p className="btn-forgot" style={{ color: "#393f81" }}>
            Don't have an account?{" "}
            <Link to="/register" className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover btn-forgot">
              Register here
            </Link>
          </p>

        </form>
        </div>
        </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    </Layout>
  );
};

export default Login;