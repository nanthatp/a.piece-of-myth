import React from "react";
import { NavLink } from "react-router-dom";
import { BsFillPersonFill, BsShieldLockFill, BsBagHeart, BsBagHeartFill } from "react-icons/bs";
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
                <BsFillPersonFill/> Profile
            </NavLink>
            <NavLink
                to="/dashboard/user/orders"
                className="nav-link"
            >
                <BsBagHeart/> Orders
            </NavLink>
            <NavLink
                to="/dashboard/user/preorders"
                className="nav-link"
            >
                <BsBagHeartFill/> Your Pre-Order
            </NavLink>
            <NavLink
                to="/dashboard/user/update-password"
                className="nav-link"
            >
                <BsShieldLockFill/> Change Passsword
            </NavLink>
            </div>
        </div>
        </div>
    );
};
export default UserMenu;