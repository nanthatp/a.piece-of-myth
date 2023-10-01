import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCollection from "../hooks/useCollection";
import Layout from "../components/Layout/Layout";
const Collections = () => {
    const collections = useCollection();
    return (
        <Layout title={"All Collections"}>
        <div className="collection-container">
            <div className="row container">
            {collections.map((c) => (
                <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
                <div className="card-collection">
                    <Link to={`/collection/${c.slug}`} className="btn cat-btn">
                    {c.name}
                    </Link>
                </div>
                </div>
            ))}
            </div>
        </div>
        </Layout>
    );
};

export default Collections;