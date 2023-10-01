import React from 'react'
import { Link } from "react-router-dom";
import useArtist from '../hooks/useArtist';
import Layout from "../components/Layout/Layout";

const AllArtists = () => {

    const artists = useArtist();

    return (
        <Layout title={"All Artists"}>
        <div className="category-container">
            <div className="row container">
                {artists.map((c) => (
                    <div className="col-md-2 mt-2 mb-4 gx-6 gy-6" key={c._id}>
                        <div className="card-text">
                            <img 
                                src={`/api/v1/artist/artist-photo/${c._id}`} 
                                className="card-artist-img-all" alt={c.name} 
                            />
                            <div className="1-overlay">
                                <Link to={`/artist/${c.slug}`} className="btn name-artist-btn">
                                    {c.name}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </Layout>
    );
}

export default AllArtists