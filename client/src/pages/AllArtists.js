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
            {artists.map((a) => (
                <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={a._id}>
                <div className="card-category">
                    <Link to={`/artist/${a.slug}`} className="btn cat-btn">
                    {a.name}
                    </Link>
                </div>
                </div>
            ))}
            </div>
        </div>
        </Layout>
    );
}

export default AllArtists