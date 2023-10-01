import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  //get user data
  useEffect(() => {
    const { email, name, phone, password,address,province,postalcode } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
    setProvince(province);
    setPostalcode(postalcode);
    // setPassword(password);
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        // password,
        phone,
        address,
        province,
        postalcode,
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
        navigate("/dashboard/user");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  
  return (
    <Layout title={"Your Profile"}>
      {/* <div className="container profile-user" style={{ width: "21cm", height: "29.7cm", padding: "2cm" }}>
        <div className="row">
          <div className="col-sm text-center">
            <div className="col col-xl-10">
              <div className="card2" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      <h4 className="title">USER PROFILE</h4>
                      <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Email "
                    disabled
                  />
                </div>
                
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Address"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Province"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={postalcode}
                    onChange={(e) => setPostalcode(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Postal code"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Phone"
                  />
                </div>

                <button type="submit" className="btn btn-warning btn-lg btn-block">
                  UPDATE
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
        <form onSubmit={handleSubmit}>
          <h4 className="title-register">Edit Profile</h4>
          <div className="container text-center">
                  <div className="row justify-content-evenly">
                    
                  <div className="col-6">
                        <div className="mb-3">
                          <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="Name"
                              autoFocus
                          />
                        </div>

                        <div className="mb-3">
                          <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Address"
                          />
                        </div>

                        <div className="mb-3">
                          <input
                            type="text"
                            value={postalcode}
                            onChange={(e) => setPostalcode(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Postal Code"
                          />
                        </div>
                      </div>

                        <div className="col-6">
                          <div className="mb-3">
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="Email "
                              disabled
                            />
                          </div>
                          
                          <div className="mb-3">
                            <input
                              type="text"
                              value={province}
                              onChange={(e) => setProvince(e.target.value)}
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="Province"
                            />
                          </div>

                          <div className="mb-3">
                            <input
                              type="text"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="Phone"
                            />
                          </div>
                        </div>

                        <div className="mb-3">
                          <button type="submit" className="btn-create-product">
                            UPDATE
                          </button>
                        </div>
                    
                  </div>
                </div>
          
        </form>
        </div>
        </div>
      </div>
      </div>
      </div>
      </div>
      </div>

      {/* <div className="row dashboard">
            <div className="col-sm text-center">
            <form onSubmit={handleSubmit}>
                <h1>Edit Profile</h1>
                <div className="container product-form">
                <div className="row justify-content-center new-product">
                <h2>My Profile</h2>
                </div>
                </div>
                <div className="container text-center  create-product">
                  <div className="row justify-content-evenly">
                    
                  
                    
                  </div>
                </div>
                </form>
            </div>

        </div> */}
    </Layout>
  );
  
  
};

export default Profile;