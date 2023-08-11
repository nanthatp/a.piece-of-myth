import React, {useState, useEffect} from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
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
        <Layout>
            <div className="row dashboard">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                    <div className="col-md-9 ">
                        <h1 className="text-center">All Banners List</h1>
                        <div className="d-flex flex-wrap">
                            {banners?.map((p) => (
                                <Link
                                    key={p._id}
                                    to={`/dashboard/admin/banner/${p.slug}`}
                                    className="banner-link"
                                >
                                    <div className="card m-2" style={{ width: "100cm" }}>
                                        <file
                                            src={`/api/v1/banner/banner-file/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                        />
                                    </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};
    

export default Banners