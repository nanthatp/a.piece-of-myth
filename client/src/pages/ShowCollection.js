import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import Layout from "./../components/Layout/Layout";
import {BsFillBagHeartFill } from "react-icons/bs";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";


const ShowCollection = () => {
    const [preproducts, setPreproducts] = useState([]);
    const [collection , setCollection] = useState("");
    const [collectname , setCollectName] = useState("");
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const params = useParams();

    //getall Pre-order products
    const getPreProductByCollection = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/preproduct/preproduct-collection/${params.slug}`
            );
            setPreproducts(data?.preproducts);
            } catch (error) {
            console.log(error);
            }
    };

    useEffect(() => {
        getPreProductByCollection();
    }, []);

    return (
        <Layout title={"All Products"}>
            <div className="container">
            <div className="text-center">
            <div className="product-heading">
                <h1>Pre-Order Products's Collection - {params.slug}</h1>
            </div>
            <div className="d-flex flex-wrap mt-4">
            {preproducts?.map((p) => (
                <div className="card m-2 product-box"  key={p._id}>
                    <img
                        src={`/api/v1/preproduct/preproduct-photo/${p._id}`}
                        className=" card-img-top"
                        alt={p.name}
                    />
                    <div className="card-body">
                        <div className="card-name-price">
                            <h5 className=" name-product">{p.name}</h5>
                            <h5 className="card-title product-price">
                            {p.price.toLocaleString("US", {
                                style: "currency",
                                currency: "USD",
                            })}
                            </h5>
                        </div>
                        <div className="card-name-price">
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

export default ShowCollection