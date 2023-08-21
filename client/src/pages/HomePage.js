import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import {BsFillBagHeartFill } from "react-icons/bs";
import "../styles/Homepage.css";

const HomePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [preproducts, setPreproducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [artists, setArtists] = useState([]);
  const [artist, setArtist] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

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

  //-------getTOtal Count-------//
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

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

   //-------load more-------//
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

  return (
    <Layout title={"All Products - Best offers "}>
      <section className="banner">
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <video 
              autoPlay loop muted playsInline 
              className="back-video" 
              src="/images/127.mp4"
              >           
              </video>
              <div className="content">
                <h1>NCT 127</h1>
                <a href="#">Pre-Order Now</a>
              </div>  
            </div>
            <div className="carousel-item">
              <video 
              autoPlay loop muted playsInline 
              className="back-video" 
              src="/images/dream.mp4"
              >           
              </video>
              <div className="content">
                <h1>NCT DREAM</h1>
                <a href="#">Pre-Order Now</a>
              </div>    
            </div>
            <div className="carousel-item">
              <video 
              autoPlay loop muted playsInline 
              className="back-video" 
              src="/images/red.mp4"
              >           
              </video>
              <div className="content">
                <h1>RED VELVET</h1>
                <a href="#">Pre-Order Now</a>
              </div>    
            </div>
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
                <div className="container" >
                  <div className="row container">
                  {artists?.map((p) => (
                        <div className="card m-2 product-box"  key={p._id}>
                          <img
                            src={`/api/v1/artist/artist-photo/${p._id}`}
                            className=" card-img-top "
                            alt={p.name}
                          />
                          <div className="card-body">
                            <div className="card-name-price">
                              <strong className=" name-product">{p.name}</strong>
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
            <div className="product-heading">
              <h1>Pre Order</h1>
            </div>
            <section className="product-list">
              <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner ">
                  <div className="product-container ">
                    <div className="d-flex wrap " >
                      {preproducts?.map((p) => (
                        <div className="carousel-item active card m-2 product-box"  key={p._id}>
                            <img
                              src={`/api/v1/preproduct/preproduct-photo/${p._id}`}
                              className=" card-img-top"
                              alt={p.name}
                            />
                            <div className="card-body">
                              <div className="card-name-price">
                                <h5 className=" name-product">{p.name}</h5>
                                <p className="card-text product-quantity">
                                  {p.quantity}
                                </p>
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
                                    // onClick={() => {
                                    //   setCart([...cart, p]);
                                    //   localStorage.setItem(
                                    //     "cart",
                                    //     JSON.stringify([...cart, p])
                                    //   );
                                    //   toast.success("Item Added to cart");
                                    // }}
                                  >
                                  <BsFillBagHeartFill/> Pre-Order Now
                                  </button>
                                  <button
                                    className="btn-details"
                                    onClick={() => navigate(`/preproduct/${p.slug}`)}
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
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true" />
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true" />
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="column-33">
            <div className="product-heading">
              <h1>All Product</h1>
            </div>
            <section className="product-list">
              <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="product-container ">
                    <div className=" carousel-item active d-flex wrap" >
                      {products?.map((p) => (
                        <div className="card m-2 product-box"  key={p._id}>
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className=" card-img-top "
                            alt={p.name}
                          />
                          <div className="card-body">
                            <div className="card-name-price">
                              <strong className=" name-product">{p.name}</strong>
                              <p className="card-text product-quantity">
                                {p.quantity}
                              </p>
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
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true" />
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true" />
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};




    

export default HomePage;