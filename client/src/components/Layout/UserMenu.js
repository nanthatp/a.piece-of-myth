import React from "react";
import { useAuth } from "../../context/auth";
import {NavLink, Link} from 'react-router-dom'
import {BsFillCartPlusFill} from 'react-icons/bs';
import {BiSolidCategoryAlt} from 'react-icons/bi';
import {BsBox2HeartFill} from 'react-icons/bs';
import {BsFillLaptopFill} from 'react-icons/bs';
import{BsFillCollectionFill} from 'react-icons/bs';
import{BsListStars} from 'react-icons/bs';
import{BsFillPostcardHeartFill} from 'react-icons/bs';
import{BsFillBalloonHeartFill} from 'react-icons/bs';
import{BsFillLayersFill} from 'react-icons/bs';
import{BsCollectionPlayFill} from 'react-icons/bs';
import{BsBalloonFill} from 'react-icons/bs';
import{BsListUl} from 'react-icons/bs';
import{BsFillHouseHeartFill} from 'react-icons/bs';

const UserMenu = () => {
    
    const [auth] = useAuth();
    return (
        // <div className="text-center p-6">
        // <div className="nav nav-pills flex-column">
        //     <div className="item">
        //     <h4>Dashboard</h4>
        //     <NavLink
        //         to="/dashboard/user/profile"
        //         className="nav-link"
        //     >
        //         <BsFillPersonFill/> Profile
        //     </NavLink>
        //     <NavLink
        //         to="/dashboard/user/orders"
        //         className="nav-link"
        //     >
        //         <BsBagHeart/> Orders
        //     </NavLink>
        //     <NavLink
        //         to="/dashboard/user/preorders"
        //         className="nav-link"
        //     >
        //         <BsBagHeartFill/> Your Pre-Order
        //     </NavLink>
        //     <NavLink
        //         to="/dashboard/user/update-password"
        //         className="nav-link"
        //     >
        //         <BsShieldLockFill/> Change Passsword
        //     </NavLink>
        //     </div>
        // </div>
        // </div>

        <div className="nav nav-pills flex-column position-relative">
            <div className="fixed top-0 left-0 item">
                <Link to = "/dashboard/user" className="navbar-brand">
                    <span></span> Dashboard {auth?.user?.name}
                </Link>
                <NavLink
                    to="/"
                    className="nav-link Menu"
                >
                    <BsFillHouseHeartFill/> Home
                </NavLink>
                <NavLink
                    to="/dashboard/user/orders"
                    className="nav-link Menu"
                >
                    <BiSolidCategoryAlt/> My Order
                </NavLink>
                <NavLink
                    to="/dashboard/user/preorders"
                    className="nav-link Menu"
                >
                    <BiSolidCategoryAlt/> My Pre-Order
                </NavLink>
                
            
                
            </div>
        </div>       
    );
};
export default UserMenu;