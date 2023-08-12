import React,{useEffect, useState} from 'react';
import { NavLink } from "react-router-dom";
import { toast } from 'react-hot-toast';
import axios from 'axios';
import "../../styles/AdminDashboard.css";
import {BiSolidCartAdd} from 'react-icons/bi';
import {BiSolidCategoryAlt} from 'react-icons/bi';
import {BsBox2HeartFill} from 'react-icons/bs';
import {FaSign} from 'react-icons/fa';
import {AiOutlineUnorderedList} from 'react-icons/ai';
import{AiFillPicture} from 'react-icons/ai';



const AdminMenu = () => {

    return (
        
        <>
            <div className="text-center p-6">
                <div className="nav nav-pills flex-column">
                    <div className="item">
                        <NavLink
                            to="/dashboard/admin/create-category"
                            className="nav-link"
                        >
                            <BiSolidCategoryAlt/> Create Category
                        </NavLink>
                        <NavLink
                            to="/dashboard/admin/create-product"
                            className="nav-link"
                        >
                            <BiSolidCartAdd/> Create Product
                        </NavLink>
                        <NavLink
                            to="/dashboard/admin/create-preproduct"
                            className="nav-link"
                        >
                             Create Pre-order Product
                        </NavLink>
                        <NavLink
                            to="/dashboard/admin/create-banner"
                            className="nav-link"
                        >
                            <FaSign/> Create Banner
                        </NavLink>
                        <NavLink
                            to="/dashboard/admin/products"
                            className="nav-link"
                        >
                            <BsBox2HeartFill /> All Products List
                        </NavLink>
                        <NavLink
                            to="/dashboard/admin/orders"
                            className="nav-link"
                        >
                            <AiOutlineUnorderedList/> All Orders List
                        </NavLink> 
                        <NavLink
                            to="/dashboard/admin/banners"
                            className="nav-link"
                        >
                            <AiFillPicture/> All Banners List
                        </NavLink> 
                    </div>
                    
                </div>
                
            </div>

            

            

        
        </>
    );
};

export default AdminMenu;