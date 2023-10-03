import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCollection from "../hooks/useCollection";
import Layout from "../components/Layout/Layout";
const Collections = () => {
    const collectiongroups = useCollection();
    return (
        <Layout title={"All Collections"}>
        <div className="collection-container">
            <div className="row container">
            {collectiongroups.map((cl) => (
                <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={cl._id}>
                <div className="card-category-all">
                    <Link to={`/collection/${cl.slug}`} className="btn cat-btn">
                    {cl.name}
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