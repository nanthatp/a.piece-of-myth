import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import Layout from "./../components/Layout/Layout";
import {BsFillBagHeartFill } from "react-icons/bs";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";

const ShowAllPre = () => {
    const navigate = useNavigate();
    const [preproducts, setPreproducts] = useState([]);

    //get all pre-order preproducts
    const getAllPreProducts = async () => {
        try {
        const { data } = await axios.get("/api/v1/preproduct/get-preproduct");
        setPreproducts(data.preproducts);
        } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong");
        }
    };

    useEffect(() => {
        getAllPreProducts();
    }, []);

    return (
        <Layout title={"All Products"}>
        <div className="container">
        <div className="text-center">
        <div className="product-heading">
            <h1>All Pre Order</h1>
        </div>
        <div className="d-flex flex-wrap mt-4">
        {preproducts?.map((p) => (
                        <div className="card m-2 product-box"  key={p._id}>
                            <img
                                src={`/api/v1/preproduct/preproduct-photo/${p._id}`}
                                className=" card-img-top"
                                alt={p.name}
                            />
                            <div className="card-body-search">
                            <div className="card-name-price-search ">
                            <h5 className=" name-product-search ">{p.name}</h5>
                            <p className="card-text product-quantity-search ">
                                {p.quantity}
                            </p>
                            <h5 className="card-title product-price-search ">
                                {p.price.toLocaleString("US", {
                                style: "currency",
                                currency: "USD",
                                })}
                            </h5>
                            </div>
                            <div className="card-name-price-search ">
                            <button
                                className="btn-add"
                                onClick={() => navigate(`/preproduct/${p.slug}`)}
                                >
                                <BsFillBagHeartFill/> Pre-Order Now
                                </button>
                            </div>
                        </div>
                        </div>
                    ))}
        </div>
        </div>
    </div>
    </Layout>
    );
};

export default ShowAllPre