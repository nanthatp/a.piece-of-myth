import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
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

   //-------getTOtal Count-------//
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

  //-------video slider navigation-------//
  
  // const contents = document.querySelectorAll(".content");

  // var sliderNev =function(manual){

  //   contents.forEach((content) => {
  //     content.classList.remove("active");
  //   });

    
  //   contents[manual].classList.add("active");
  // }

  

  return (
    <Layout title={"ALl Products - Best offers "}>
      <div class="container">
        <div class="row">
          <div class="column-66">
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
          </div>
          <div class="column-33">
            ...
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="column-33">
            ...
          </div>
          <div class="column-66">
            ...
          </div>
        </div>
      </div>
    </Layout>
  );
};




    

export default HomePage;