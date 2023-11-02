import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import axios from "axios";
const UpdatePassword = () => {

  const navigate = useNavigate();
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [password, setPassword] = useState("");

  //get user data
  useEffect(() => {
    const {  password } = auth?.user;
    setPassword(password);
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password === "") {
        // กรณีรหัสเป็นค่าว่าง
        Swal.fire({
            position: 'top-center',
            icon: 'warning',
            title: 'Warning!',
            text: 'Please enter Password!',
            showConfirmButton: false,
            timer: 3000
        });
        return;
    }
      const { data } = await axios.put("/api/v1/auth/profile", {
        password
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        // toast.success("Profile Updated Successfully");
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Updated!',
          text: 'Password has been Updated.',
          showConfirmButton: false,
          timer: 3000
      });
        navigate("/dashboard/user");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      Swal.fire({
        position: 'top-center',
        icon: 'warning',
        title: 'Warning!',
        text: 'Something went wrong',
        showConfirmButton: false,
        timer: 3000
    });
    return;
    }
  };
  return (
    <Layout title={"Your Profile"}>
      {/* <div className="container py-5 h-100 password-user "style={{ width: "21cm", height: "29.7cm", padding: "2cm" }} >
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10 text-center">
            <div className="col chang-password">
              <div className="card2" style={{ borderRadius: "1rem", marginTop: "150px" }}>
                <div className="row g-0">
                  <div className="card-body  text-black">
                    <form onSubmit={handleSubmit}>
                      <h4 className="title">Change Your Password</h4>
                      <div className="mb-3">
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="Enter Your Password"
                        />
                      </div>
  
                      <button type="submit" className="btn btn-warning btn-lg btn-block">
                        UPDATE Your Password
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

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
          <h4 className="title-register">Change Password</h4>

          <div className="mb-3">
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="Enter Your Password"
                        />
                      </div>
  
                      <button type="submit" className="btn-register">
                        Change Password
                      </button>
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

export default UpdatePassword;