import React, { useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const BannerForm = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [banner, setBanner] = useState([]);
    const [banners, setBanners] = useState([]);
    console.log(banner, setBanner);

     //-------get all banner-------//
    const getAllBanner = async () => {
        try {
        const { data } = await axios.get("/api/v1/banner/get-banner");
        if (data?.success) {
            setBanners(data?.banners);
        }
        } catch (error) {
        console.log(error);
        }
    };

    //-------get single banner-------//
    const getSingleBanner = async () => {
        try{
        const { data } = await axios.get(
            `/api/v1/banner/get-banner/${params.slug}`
        );
        setBanner(data?.banner);

        } catch(error) {
        console.log(error);
        }
    };

    useEffect(() => {
        getAllBanner();
        getSingleBanner();
    }, []);

    return (
        <Swiper
        pagination={{
            dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        >
        {banners?.map((b) => (
            <SwiperSlide className="slide" key={banner._id}>
                <div className={`slide-img`}>
                <video 
                    autoPlay loop muted playsInline 
                    src={`/api/v1/banner/banner-photo/${b._id}`}
                    className="back-video"
                    alt=""
                />
                </div>
                <div className="my-container h-[70vh] flex flex-col items-center justify-center">
                    <h1 className="content">
                        {b.name}
                    </h1>
                    <div className="mt-10">
                    <Link
                        // to={`/cat-products/${cat.name}`}
                        className="a"
                    >
                        Pre-Order Now
                    </Link>
                    </div>
                </div>
                
            </SwiperSlide>
        ))}
            
        </Swiper>
    );
};

export default BannerForm