import React from "react";
import { NavLink } from "react-router-dom";
import {BiUser, BiShoppingBag, BiSolidBasket, BiShieldAlt2} from 'react-icons/bi';
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
                to="/dashboard/user/preorders"
                className="nav-link"
            >
                <BiSolidBasket/>Your Pre-Order Products
            </NavLink>
            <NavLink
                to="/dashboard/user/update-password"
                className="nav-link"
            >
                <BiShieldAlt2/>Change Your Passsword
            </NavLink>
            </div>
        </div>
        </div>
    );
};
export default UserMenu;