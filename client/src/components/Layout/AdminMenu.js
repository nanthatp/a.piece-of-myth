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
                        to="/dashboard/admin/create-banner"
                        className="nav-link"
                    >
                        Create Banner
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

            <div className="card text-center">
                <div className="card-header">
                    <ul className="nav nav-pills card-header-pills">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Active</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                    </li>
                    </ul>
                </div>
                
            </div>


        
        </>
    );
};

export default AdminMenu;