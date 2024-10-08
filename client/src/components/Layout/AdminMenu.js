import React,{useEffect, useState} from 'react';
import {NavLink, Link} from 'react-router-dom'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import "../../styles/AdminDashboard.css";
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



const AdminMenu = () => {

    return (
        <div className="nav nav-pills flex-column position-relative">
            <div className="fixed top-0 left-0 item">
                <Link to = "/dashboard/admin" className="navbar-brand">
                    <span></span> Dashboard Admin
                </Link>
                <NavLink
                    to="/"
                    className="nav-link Menu"
                >
                    <BsFillHouseHeartFill/> Home
                </NavLink>
                <NavLink
                    to="/dashboard/admin/create-category"
                    className="nav-link Menu"
                >
                    <BiSolidCategoryAlt/> Create Category
                </NavLink>
                <NavLink
                    to="/dashboard/admin/create-collection"
                    className="nav-link Menu"
                >
                    <BsFillCollectionFill/> Create Collection
                </NavLink>
                <NavLink
                    to="/dashboard/admin/create-product"
                    className="nav-link Menu"
                >
                    <BsFillCartPlusFill/> Create Product
                </NavLink>
                <NavLink
                    to="/dashboard/admin/create-preproduct"
                    className="nav-link Menu"
                >
                    <BsFillLayersFill/> Create Pre-Order 
                </NavLink>
                <NavLink
                    to="/dashboard/admin/create-banner"
                    className="nav-link Menu"
                >
                    <BsFillLaptopFill/> Create Banner
                </NavLink>
                <NavLink
                    to="/dashboard/admin/create-artist"
                    className="nav-link Menu"
                >
                    <BsFillPostcardHeartFill/> Create Artist
                </NavLink>
                <NavLink
                    to="/dashboard/admin/orders"
                    className="nav-link Menu"
                >
                    <BsListStars/> All Orders List
                </NavLink> 
                <NavLink
                    to="/dashboard/admin/preorder"
                    className="nav-link Menu"
                >
                    <BsListUl/> Pre-Order List
                </NavLink>
                <NavLink
                    to="/dashboard/admin/products"
                    className="nav-link Menu"
                >
                    <BsBox2HeartFill /> All Products List
                </NavLink>
                <NavLink
                    to="/dashboard/admin/preproduct"
                    className="nav-link Menu"
                >
                    <BsBalloonFill/> Pre-Product List
                </NavLink> 
                <NavLink
                    to="/dashboard/admin/banners"
                    className="nav-link Menu"
                >
                    <BsCollectionPlayFill/> All Banners List
                </NavLink> 
                <NavLink
                    to="/dashboard/admin/artists"
                    className="nav-link Menu"
                >
                    <BsFillBalloonHeartFill/> Artist List
                </NavLink> 
            </div>
        </div>       
    );
};

export default AdminMenu;