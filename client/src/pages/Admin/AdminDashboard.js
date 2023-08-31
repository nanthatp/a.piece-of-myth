import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import LayoutAdmin from "./../../components/Layout/LayoutAdmin";
import { useAuth } from "../../context/auth";
const AdminDashboard = () => {
    const [auth] = useAuth();
    return (
        <LayoutAdmin>
            <div className="row dashboard">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <div className="card w-75 p-3">
                    <h3> Admin Name : {auth?.user?.name}</h3>
                    <h3> Admin Email : {auth?.user?.email}</h3>
                    <h3> Admin Contact : {auth?.user?.phone}</h3>
                    </div>
                </div>
            </div>
        
        </LayoutAdmin>
    );
    };

export default AdminDashboard;

