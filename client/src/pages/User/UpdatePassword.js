import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
const UpdatePassword = () => {
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
      const { data } = await axios.put("/api/v1/auth/profile", {
        password
      });
      if (data?.errro) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-sm text-center">
          <div className="col col-xl-10">
            <div className="card2" style={{ borderRadius: "1rem" , marginTop: "150px" }}>
            <div className="row g-0">
            <div className="card-body p-4 p-lg-5 text-black">
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
      </div>
    </Layout>
  );
};

export default UpdatePassword;