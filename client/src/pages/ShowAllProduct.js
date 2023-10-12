import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import Layout from "./../components/Layout/Layout";
import {BsFillBagHeartFill } from "react-icons/bs";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Prices } from "../components/Prices";
import { Link } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";
import Artist from './Admin/Artists';


const ShowAllProduct = () => {
    const [auth, setAuth] = useAuth();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [categories, setCategories] = useState([]);
    const [collectiongroups, setCollectiongroups] = useState([]);
    const [artist, setArtist] = useState([]);
    const [checked, setChecked] = useState([]);
    const [checkcate, setCheckcate] = useState([]);
    const [checkart, setCheckart] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);



    //======= load more =======//
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
     //======= get total count =======//
    const getTotal = async () => {
        try {
        const { data } = await axios.get("/api/v1/product/product-count");
        setTotal(data?.total);
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);

    //======= get all cate ======//
    const getAllCategory = async () => {
        try {
        const { data } = await axios.get("/api/v1/category/get-category");
        if (data?.success) {
            setCategories(data?.category);
        }
        } catch (error) {
        console.log(error);
        }
    };

    //======= get all artist ======//
    const getAllArtist = async () => {
        try {
          const { data } = await axios.get("/api/v1/artist/get-artist");
            setArtist(data.artists);
          } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
          }
      };

   //get all Collections group
   const getAllCollection = async () => {
    try {
        const { data } = await axios.get("/api/v1/collectiongroup/get-collectiongroup");
        if (data?.success) {
        setCollectiongroups(data?.collectiongroup);
        }
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong in getting catgeory");
    }
}; 

useEffect(() => {
    getAllCollection();
}, []);

    useEffect(() => {
        getAllCategory();
        getTotal();
        getAllArtist();
    }, []);

    //======= getall products =======//
    const getAllProducts = async () => {
        try {
        const { data } = await axios.get("/api/v1/product/get-visible-product");
        setProducts(data.products);
        } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong");
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    //======= filter by category =======//
    const handleFilterCollection = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);  
    };

    const handleFilterArtist = (value, id) => {
        let all = [...checkart];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((ar) => ar !== id);
        }
        setCheckart(all);  
    };

    const handleFilterCategory = (value, id) => {
        let all = [...checkcate];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((ca) => ca !== id);
        }
        setCheckcate(all);  
    };

    useEffect(() => {
        if (!checkcate.length || !checkart.length|| !checked.length|| !radio.length) getAllProducts();
    }, [checkcate.length, checkart.length, checked.length, radio.length]);

    useEffect(() => {
        if (checkcate.length || checkart.length|| checked.length || radio.length) filterProduct();
    }, [checkcate,checkart,checked,radio]);


    //======= filter by artist =======//
    // const handleFilterArtist = (value, id) => {
    //     let all = [...checkbox];
    //     if (value) {
    //     all.push(id);
    //     } else {
    //     all = all.filter((a) => a !== id);
    //     }
    //     setCheckBox(all);
    // };
    // useEffect(() => {
    //     if (!checkbox.length ) getAllProducts();
    // }, [checkbox.length]);

    // useEffect(() => {
    //     if (checkbox.length) filterProduct();
    // }, [checkbox]);

    //======= filter product =======//
    const filterProduct = async () => {
        try {
        const { data } = await axios.post("/api/v1/product/product-filters", {
            checkcate,
            checkart,
            checked,
            radio,
        });
        setProducts(data?.products);
        } catch (error) {
        console.log(error);
        }
    };
    

    return (
        <Layout title={"All Products"}>
            <div className="container-fluid row mt-3 ">
                <div className="col-md-3 filters">
                    {/* {JSON.stringify(checked, null, 4)} */}
                <h4 className="text-center">Filter By Category</h4>
                <div className="d-flex flex-column">
                    {categories?.map((ca) => (
                    <Checkbox
                        key={ca._id}
                        onChange={(e) => handleFilterCategory(e.target.checked, ca._id)}
                    >
                        {ca.name}
                    </Checkbox>
                    ))}
                </div>
                <h4 className="text-center mt-4">Filter By Artist</h4>
                <div className="d-flex flex-column">
                    {artist?.map((ar) => (
                    <Checkbox
                        key={ar._id}
                        onChange={(e) => handleFilterArtist(e.target.checked, ar._id)}
                    >
                        {ar.name}
                    </Checkbox>
                    ))}
                </div>
                <h4 className="text-center mt-4">Filter By Collection</h4>
                <div className="d-flex flex-column">
                    {collectiongroups?.map((c) => (
                    <Checkbox
                        key={c._id}
                        onChange={(e) => handleFilterCollection(e.target.checked, c._id)}
                    >
                        {c.name}
                    </Checkbox>
                    ))}
                </div>
            
                <h4 className="text-center mt-4">Filter By Price</h4>
                <div className="d-flex flex-column">
                    <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                        {Prices?.map((p) => (
                            <div key={p._id}>
                                <Radio
                                    value={p.array}
                                    >
                                        {p.name}
                                </Radio>
                            </div>
                        ))}
                    </Radio.Group>
                </div>

                <div className="d-flex flex-column">
                    <button
                        className="btn btn-danger"
                        onClick={() => window.location.reload()}
                    >
                        RESET FILTERS
                    </button>
                </div>
                </div>
            
                <div className="col-md-9 ">
                    <div className="product-heading">
                        <h1>All Product</h1>
                    </div>
                    <div className="d-flex flex-wrap">
                        {products?.map((p) => (
                            <div className="card m-2 product-box "  key={p._id}>
                                <img
                                    src={`/api/v1/product/product-photo/${p._id}`} 
                                    className=" card-img-top "
                                    alt={p.name}
                                />
                                <div className="card-body">
                                <div className="card-name-price">
                                    <strong className=" name-product">{p.name}</strong>
                                    { !p.quantity <=0 ?(
                                    <p className="card-text product-quantity">
                                    {p.quantity} in stock
                                    </p>) : (
                                    <p className="card-text product-quantity">
                                        out of stock
                                    </p>)}
                                    <h6 className="card-title product-price">
                                        {p.price.toLocaleString("US", {
                                            style: "currency",
                                            currency: "USD",
                                        })}
                                    </h6>
                                </div>
                                <div className="card-name-price">
                                    <button
                                        className="btn-add"
                                        disabled={p.quantity < 1 || auth?.user?.role === 1}
                                            onClick={() => {
                                                setCart([...cart, p]);
                                                localStorage.setItem(
                                                    "cart",
                                                    JSON.stringify([...cart, p])
                                                );
                                                toast.success("Item Added to cart");
                                            }}
                                    >
                                        <BsFillBagHeartFill/> Add to Cart
                                    </button>
                                    <button
                                        className="btn-details"
                                        onClick={() => navigate(`/product/${p.slug}`)}
                                    >
                                        More Details
                                    </button>
                                </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <div className="m-2 p-3">
                        {products && products.length < total && (
                            <button
                                className="btn loadmore"
                                onClick={(e) => {
                                e.preventDefault();
                                setPage(page + 1);
                                }}
                            >
                                {loading ? (
                                "Loading ..."
                                ) : (
                                <>
                                    {" "}
                                    Loadmore <AiOutlineReload />
                                </>
                                )}
                            </button>
                        )}
                    </div> */}
                </div>
            </div>
        </Layout>
        
    );
};

export default ShowAllProduct


