import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import LayoutAdmin from "./../../components/Layout/LayoutAdmin";
import { useAuth } from "../../context/auth";
import {NavLink, Link} from 'react-router-dom'
import {BsFillEmojiHeartEyesFill } from "react-icons/bs";
import {BsFillEnvelopeOpenHeartFill } from "react-icons/bs";
import {BsFillTelephoneFill } from "react-icons/bs";
import {BsFillPersonFill} from "react-icons/bs";

const AdminDashboard = () => {
    const [auth] = useAuth();
    return (
        <LayoutAdmin>
            <div className="row dashboard">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-sm text-center dashboard-ad">
                    <div className="container dashboard-form">
                        <div className="row justify-content-center dashboard-text">
                        {!auth?.user
                            ? "Hello Guest"
                            : `Hello  ${auth?.token && auth?.user?.name}`} !
                        </div>
                    </div>

                    <div className="col-md-8 dashboard-card">
                        <div className="card">
                            <div className="card-body text-start"> {/* ใช้ text-start เพื่อจัดเรียงข้อความทางด้านซ้าย */}
                                <div className="mb-3 text-center card-heard">
                                  {auth?.user?.name} information
                                </div>
                                <div className="mb-3 card-information d-flex align-items-center">
                                    <span> <BsFillPersonFill/> </span>Name: {auth?.user?.name}
                                    {/* <Link
                                      to="/dashboard/admin/profile"
                                      className="nav-link ms-auto edit-user"
                                    >
                                      Edit my profile
                                    </Link> */}
                                </div>

                                <div className="mb-3 card-information">
                                    <span> <BsFillEnvelopeOpenHeartFill/> </span>Email: {auth?.user?.email}
                                </div>
                                <div className="mb-3 card-information">
                                    <span> <BsFillTelephoneFill/> </span>Contact: {auth?.user?.phone}
                                </div>
                                {/* <div className="mb-3 card-information d-flex align-items-center">
                                    <span> <BsFillShieldLockFill/> </span> Password: ******* 
                                    <Link
                                      to="/dashboard/admin/update-password"
                                      className="nav-link ms-auto edit-user"
                                    >
                                      Change Password
                                    </Link>
                                </div> */}
                            
                            </div>
                        </div>
                    </div>







                </div>
            </div>
        
        </LayoutAdmin>
    );
    };

export default AdminDashboard;

