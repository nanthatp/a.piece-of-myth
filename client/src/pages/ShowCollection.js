import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import Layout from "./../components/Layout/Layout";
import {BsFillBagHeartFill } from "react-icons/bs";
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from "moment";
import { useAuth } from "../context/auth";


const ShowCollection = () => {
    const [preproducts, setPreproducts] = useState([]);
    const [collection , setCollection] = useState("");
    const [collectname , setCollectName] = useState("");
    const [auth, setAuth] = useAuth();
    const [until , setUntil] = useState("");
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (params?.collectiongroup) getPreProductByCollection();
    }, [params?.collectiongroup]);

    //getall Pre-order products
    const getPreProductByCollection = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/preproduct/preproduct-collection/${params.collectiongroup}`
            );
            setPreproducts(data?.preproducts);
            } catch (error) {
            console.log(error);
            }
    };
    function disableButton (until){
        let currentDate = new Date()
        let endDate = new Date(until)
        console.log("currentDate = ", currentDate)
        console.log("endDate = ", endDate-currentDate)
        if (endDate - currentDate < 0){
          return true
        }
        return false;
      }

    return (
        <Layout title={"All Products"}>
            <div className="container">
            <div className="text-center">
            <div className="product-heading">
                <h1>Pre-Order Products's Collection  {preproducts?.collectiongroup}</h1>
                <h6 className="text-center">{preproducts?.length} result found </h6>
            </div>
            <div className="d-flex flex-wrap ">
            {preproducts?.map((p) => (
                <div className="card m-2 product-box"  key={p._id}>
                    <img
                        src={`/api/v1/preproduct/preproduct-photo/${p._id}`}
                        className=" card-img-top"
                        alt={p.name}
                    />
                    <div className="card-body-search">
                        <div className="card-name-price-search">
                            <h5 className=" name-product">{p.name}</h5>
                            <p className="card-text product-quantity">
                            End: {moment(p.until).locale('th').format('YYYY-MM-DD hh:mm')}
                            </p>
                            <h5 className="card-title product-price">
                            {p.price.toLocaleString("US", {
                                style: "currency",
                                currency: "USD",
                            })}
                            </h5>
                        </div>
                        <div className="card-name-price-search">
                            <button
                                className="btn-add"
                                disabled={auth?.user?.role === 1 || disableButton (p.until)}
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