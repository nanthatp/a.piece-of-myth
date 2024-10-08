import React, {useState, useEffect} from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import LayoutAdmin from "./../../components/Layout/LayoutAdmin";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";


const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    //getall products
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

    return (
        <LayoutAdmin>
            <div className="row dashboard">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                    <div className="col-md-9 ">
                        <h1 className="text-center">All Products List</h1>
                        <div className="col-md-3">
                        <button
                            className="btn-add-Pre-Order-List btn-csv"
                            onClick={() => navigate(`/dashboard/admin/invisible-product`)}
                            >
                                Invisible Product
                        </button>
                        </div>
                        <div className="d-flex flex-wrap">
                            {products?.map((p) => (
                                <Link
                                    key={p._id}
                                    to={`/dashboard/admin/product/${p.slug}`}
                                    className="product-link"
                                >
                                    <div className="card m-2 product-box" style={{ width: "15rem" }}>
                                        <img
                                            src={`/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                        />
                                    <div className="card-body">
                                        <h5 className="card-title-pro">{p.name}</h5>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    );
};
    

export default Products