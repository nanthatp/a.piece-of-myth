import React, {useState, useEffect} from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import LayoutAdmin from "./../../components/Layout/LayoutAdmin";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";


const Banners = () => {
    const [banners, setBanners] = useState([]);

    //get all banners
    const getAllBanners = async () => {
        try {
        const { data } = await axios.get("/api/v1/banner/get-banner");
            setBanners(data.banners);
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    useEffect(() => {
        getAllBanners();
    }, []);

    return (
        <LayoutAdmin>
            <div className="row dashboard">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                    <div className="col-md-9 ">
                        <h1 className="text-center">All Banners List</h1>
                        
                            {banners?.map((p) => (
                                <Link
                                    key={p._id}
                                    to={`/dashboard/admin/banner/${p.slug}`}
                                    className="banner-link"
                                >
                                <video
                                    width="320" height="240" autoPlay loop muted playsInline 
                                    className="back-video" 
                                    src={`/api/v1/banner/banner-photo/${p._id}`}       
                                />
                                </Link>
                            ))}
                    
                </div>
            </div>
        </LayoutAdmin>
    );
};
    

export default Banners