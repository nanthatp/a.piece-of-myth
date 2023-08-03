import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
    return (
        
        <>
            <div className="text-center p-6">
                
                <div className="nav nav-tabs">

                    <NavLink
                        to="/dashboard/admin/create-category"
                        className="nav-link"
                    >
                        Create Category
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/create-product"
                        className="nav-link"
                    >
                        Create Product
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/create-product"
                        className="nav-link"
                    >
                        Create Product
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/products"
                        className="nav-link"
                    >
                        Products
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/products"
                        className="nav-link"
                    >
                        Products
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/orders"
                        className="nav-link"
                    >
                        Orders
                    </NavLink>  

                </div>
                
                {/* <NavLink
                    to="/dashboard/admin/users"
                    className="list-group-item list-group-item-action"
                >
                    Users
                </NavLink> */}
            </div>
        
        </>
    );
};

export default AdminMenu;