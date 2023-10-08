import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import Layout from "./../components/Layout/Layout";
import {BsFillBagHeartFill } from "react-icons/bs";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
import moment from 'moment';

const ShowAllPre = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();

    const [preproducts, setPreproducts] = useState([]);

    //get all pre-order preproducts
    const getAllPreProducts = async () => {
        try {
        const { data } = await axios.get("/api/v1/preproduct/get-visible-preproduct");
        setPreproducts(data.preproducts);
        } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong");
        }
    };
  
    useEffect(() => {
        getAllPreProducts();
    }, []);

    function disableButton (){
        let currentDate = new Date()
        let endDate = new Date(preproducts.until)
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
            <h1>All Pre Order</h1>
        </div>
        <div className="d-flex flex-wrap">
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
                            <p className="card-text product-quantity">
                                Time Limit : {moment(preproducts.until).locale('th').format('YYYY-MM-DD hh:mm')}
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
                                disabled={auth?.user?.role === 1 ||disableButton ()}
                                onClick={() => navigate(`/preproduct/${p.slug}`)}
                                >
                                <BsFillBagHeartFill/> Pre-Order Detail
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