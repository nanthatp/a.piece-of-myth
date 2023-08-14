import React from "react";
import { NavLink } from "react-router-dom";
import {BiUser, BiShoppingBag, BiSolidBasket} from 'react-icons/bi';
const UserMenu = () => {
    return (
        <div className="text-center p-6">
        <div className="nav nav-pills flex-column">
            <div className="item">
            <h4>Dashboard</h4>
            <NavLink
                to="/dashboard/user/profile"
                className="nav-link"
            >
                <BiUser/>Profile
            </NavLink>
            <NavLink
                to="/dashboard/user/orders"
                className="nav-link"
            >
                <BiShoppingBag/>Orders
            </NavLink>
            <NavLink
                to="/dashboard/user/preorder"
                className="nav-link"
            >
                <BiSolidBasket/>Your Pre-Order Products
            </NavLink>
            </div>
        </div>
        </div>
    );
};

export default UserMenu;