import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'
import { useCart } from "../context/cart";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import {BsFillBagHeartFill } from "react-icons/bs";
import "../styles/Homepage.css";
// import BannerForm from "../components/Form/BannerForm";
import Products from './Admin/Products';
import moment from "moment";
import { useAuth } from "../context/auth";

const HomePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [preproducts, setPreproducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collectiongroups, setCollectiongroups] = useState([]);
  const [category, setCategory] = useState([]);
  const [artists, setArtists] = useState([]);
  const [artist, setArtist] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [banner, setBanner] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const [until , setUntil] = useState("");
  const [instance, setInstance] = useState("");

   //-------get all banner-------//
const getAllBanner = async () => {
    try {
    const { data } = await axios.get("/api/v1/banner/get-banner");
    if (data?.success) {
        setBanners(data?.banners);
    }
    } catch (error) {
    console.log(error);
    }
};

//-------get single banner-------//
const getSingleBanner = async () => {
    try{
    const { data } = await axios.get(
        `/api/v1/banner/get-banner/${params.slug}`
    );
    setBanner(data?.banner);

    } catch(error) {
    console.log(error);
    }
};

useEffect(() => {
    getAllBanner();
    getSingleBanner();
}, []);

   //-------get all col-------//
  const getAllCollectiongroup = async () => {
    try {
      const { data } = await axios.get("/api/v1/collectiongroup/get-collectiongroup");
      if (data?.success) {
        setCollectiongroups(data?.collectiongroup);
      }
    } catch (error) {
      console.log(error);
    }
  };

   //-------get all cat-------//
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


   //-------get single cat-------//
  const getSingleCategory = async () => {
    try{
      const { data } = await axios.get(
        `/api/v1/category/get-category/${params.slug}`
      );
      setCategory(data?.category);

    } catch(error) {
      console.log(error);
    }
  };

useEffect(() => {
  if (params?.slug) getSingleCategory();
}, [params?.slug]);

  //-------getTotal Count-------//
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

   //-------get all cat-------//
  useEffect(() => {
    getAllCategory();
    getAllCollectiongroup();
    getTotal();
  }, []);

  //-------get products-------//
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get all pre-order products
  const getAllPreProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/preproduct/get-preproduct");
      setLoading(false);
      setPreproducts(data.preproducts);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
};

  // useEffect(() => {
  //   if (page === 1) return;
  //   loadMore();
  // }, [page]);

   //-------load more-------//
  // const loadMore = async () => {
  //   try {
  //     setLoading(true);
  //     const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
  //     setLoading(false);
  //     setProducts([...products, ...data?.products]);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

   //-------filter by cat-------//
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);
  
  useEffect(() => {
    if (!checked.length || !radio.length) getAllPreProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //-------get filterd product-------//
  
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

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

  //-------get single cat-------//
  const getSingleArtist = async () => {
    try{
      const { data } = await axios.get(
        `/api/v1/artist/get-artist/${params.slug}`
      );
      setArtists(data?.artists);

    } catch(error) {
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

  //get single product
const getSinglePreProduct = async () => {
  try {
      const { data } = await axios.get(
          `/api/v1/preproduct/get-preproduct/${params.slug}`
      );
      setUntil(data.preproduct.until);
      
  }catch (error) {
      console.log(error);
  }
};

  useEffect(() => {
    if (params?.slug) getSingleArtist();
    if (params?.slug) getSinglePreProduct();
  }, [params?.slug]);

 

  return (
    <Layout title={"All Products - Best offers "}>
      <section className="banner">
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
          {banners?.map((b) => (
            <div className="carousel-item active">
              
                  <video
                  autoPlay loop muted playsInline 
                  className="back-video" 
                  src={`/api/v1/banner/banner-photo/${b._id}`}          
                  />

                  <div className="content">
                  <h1>{b.name}</h1>
                  <Link
                    // to={`/cat-products/${cat.name}`}
                    to={`/ShowCollection/${b.collectiongroup}`}
                    className="a"
                  >
                    SHOP NOW
                  </Link>
                  </div>  
                  </div>
              ))}
              
            
          </div>
        </div>
      </section>
      
      <div className="container">
        <div className="row">
        <div className="column-33">
            <section className="category-list">
              <div className="home-heading">
                <h1>Caleb for You</h1>
                <span>All</span>
              </div>
              <div className="category-container">
                <div className="container artist-container" >
                  <div className="row container">
                  {artist.map((c) => (
                    <div className="col-md-2 mt-2 mb-4 gx-6 gy-6" key={c._id}>
                    <div className="card-text">
                      <img 
                        src={`/api/v1/artist/artist-photo/${c._id}`} 
                        className="card-artist-img" alt={c.name} />
                      <div className="1-overlay">
                          <Link to={`/artist/${c.slug}`} className="btn name-artist-btn">
                            {c.name}
                          </Link>
                      </div>
                    </div>
                    </div>
                  ))}




                    {/* {artist.map((c) => (
                      <div className="col-md-2 mt-2 mb-4 gx-6 gy-6" key={c._id}>
                        <Link to={`/artist/${c.slug}`} className="btn cat-btn">
                          {c.name}
                        </Link>
                      </div> 
                    ))} */}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="column-33">
            <section className="category-list">
              <div className="home-heading">
                <h1>Collection</h1>
                <span>All</span>
              </div>
              <div className="category-container">
                <div className="container" >
                  <div className="row container">
                    {collectiongroups.map((cl) => (
                      <div className="col-md-2 mt-2 mb-4 gx-6 gy-6" key={cl._id}>
                        <div className="card-col">
                          <Link  to={`/collection/${cl.slug}`} className="btn col-btn">
                            {cl.name}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="column-33">
            <section className="category-list">
              <div className="home-heading">
                <h1>Category</h1>
                <span>All</span>
              </div>
              <div className="category-container">
                <div className="container" >
                  <div className="row container">
                    {categories.map((c) => (
                      <div className="col-md-2 mt-2 mb-4 gx-6 gy-6" key={c._id}>
                        <div className="card-category">
                          <Link to={`/category/${c.slug}`} className="btn cat-btn">
                            {c.name}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="column-33">
            <section className="pre-list">
              <div className="product-heading">
                <h1>Pre Order</h1>
                <Link
                  className="show-pre-link"
                  to="/ShowAllPre"
                >
                  <h6>Shop More Pre-Order Product</h6>
                </Link>
              </div>
                <div className="carousel-inner pre-inner">
                  <div className="product-container ">
                    <div className="d-flex" >
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
                                <p className="card-text product-quantity">
                                End: {moment(p.until).locale('th').format('YYYY-MM-DD hh:mm')}
                                </p>
                                {/* <p className="card-text product-quantity">
                                  time limit: {moment(until).locale('th').format('YYYY-MM-DD hh:mm')}
                                </p> */}
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
            </section>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="column-33">
            <section className="product-list">
              <div className="product-heading">
                <h1>All Product</h1>
                <Link
                  className="show-product-link"
                  to="/ShowAllProduct"
                >
                  <h6>Shop More Product</h6>
                </Link>
              </div>
              <div className="carousel-inner product-inner">
                <div className="product-container ">
                  <div className="d-flex" >
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
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;