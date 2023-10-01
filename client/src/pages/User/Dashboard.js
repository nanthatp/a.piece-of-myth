import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import LayoutAdmin from "./../../components/Layout/LayoutAdmin";
import {NavLink, Link} from 'react-router-dom'
import { useAuth } from "../../context/auth";
import {BsFillEmojiHeartEyesFill } from "react-icons/bs";
import {BsFillEnvelopeOpenHeartFill } from "react-icons/bs";
import {BsFillTelephoneFill } from "react-icons/bs";
import {BsFillShieldLockFill } from "react-icons/bs";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    // <Layout title={"Dashboard - a.piece-of-myth"}>
    //   <div className="container dashboard-user">
    //     <div className="row">
    //       <div className="col-md-9">
    //         <div className="card w-75 p-3">
    //           <h3>{auth?.user?.name}</h3>
    //           <h3>{auth?.user?.email}</h3>
    //           <h3>{auth?.user?.phone}</h3>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </Layout>

    <LayoutAdmin>
            <div className="row dashboard">
                <div className="col-md-3">
                    <UserMenu />
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
                                    <span> <BsFillEmojiHeartEyesFill/> </span>Name: {auth?.user?.name}
                                    <Link
                                      to="/dashboard/user/profile"
                                      className="nav-link ms-auto edit-user"
                                    >
                                      Edit my profile
                                    </Link>
                                </div>

                                <div className="mb-3 card-information">
                                    <span> <BsFillEnvelopeOpenHeartFill/> </span>Email: {auth?.user?.email}
                                </div>
                                <div className="mb-3 card-information">
                                    <span> <BsFillTelephoneFill/> </span>Contact: {auth?.user?.phone}
                                </div>
                                <div className="mb-3 card-information d-flex align-items-center">
                                    <span> <BsFillShieldLockFill/> </span> Password: ******* 
                                    <Link
                                      to="/dashboard/user/update-password"
                                      className="nav-link ms-auto edit-user"
                                    >
                                      Change Password
                                    </Link>
                                </div>
                            
                            </div>
                        </div>
                    </div>







                </div>
            </div>
        
        </LayoutAdmin>
  );
};

export default Dashboard;