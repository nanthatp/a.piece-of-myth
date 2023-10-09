import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from 'antd';

const ProfileAdmin= () => {
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
  const [role, setRole] = useState(""); 
  const { Option } = Select;

  const navigate = useNavigate();

  //get user data
  useEffect(() => {
    const { email, name, phone, password,address,province,postalcode,role} = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
    setProvince(province);
    setPostalcode(postalcode);
    setRole(role);

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
        role,
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

    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
      <div className="card2" style={{ borderRadius: "1rem" , marginTop: "90px" }}>
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
                            <Select
                                bordered={false}
                                placeholder="Select Status"
                                size="medium"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setRole(value);
                                }}
                                value={role ? "0" : "1"}
                            >
                                <Option value="o">user</Option>
                                <Option value="1">admin</Option>
                            </Select>
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
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="Phone"
                            />
                          </div>
                        </div>

                        <div className="mb-3">
                          <button type="submit" className="btn-update-admin">
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

export default ProfileAdmin;