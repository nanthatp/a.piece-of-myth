import React, {useState, useEffect} from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import LayoutAdmin from "./../../components/Layout/LayoutAdmin";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";


const Artist = () => {
    const [artists, setArtist] = useState([]);

    //get all artists
    const getAllArtist = async () => {
        try {
        const { data } = await axios.get("/api/v1/artist/get-artist");
        setArtist(data.artists);
        } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong");
        }
    };

    useEffect(() => {
        getAllArtist();
    }, []);

    return (
        <LayoutAdmin>
            <div className="row dashboard">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                    <div className="col-md-9 ">
                        <h1 className="text-center">All Artist</h1>
                        <div className="d-flex flex-wrap">
                        {artists?.map((p) => (
                                <Link
                                    key={p._id}
                                    to={`/dashboard/admin/artist/${p.slug}`}
                                    className="product-link"
                                >
                                    <div className="card m-2" style={{ width: "15rem" }}>
                                        <img
                                            src={`/api/v1/artist/artist-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                        />
                                    <div className="card-body">
                                        <h5 className="card-title-pro">{p.name}</h5>
                                    </div>
                                </div>
                            </Link>
                            
                            ))}
                        </div>
                    </div>
            </div>
        </LayoutAdmin>
    );
};
    

export default Artist