import React, {useState, useEffect} from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import LayoutAdmin from "./../../components/Layout/LayoutAdmin";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import{BsArrowLeftCircleFill} from 'react-icons/bs';
import Swal from 'sweetalert2';

function InvisibleProduct() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    //get all invisible pre-order preproducts
    const getAllProducts = async () => {
        try {
        const { data } = await axios.get("/api/v1/product/get-invisible-product");
        setProducts(data.products);
        } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong");
        }
    };

    useEffect(() => {
      getAllProducts();
  }, []);
  
  //delete all Invisible product
  const handleDelete = async () => {
    try {
        let answer = window.prompt("Are You Sure want to delete all Invisible product ? ");
        if (!answer) return;
        const { data } = await axios.delete(
            `/api/v1/product/delete-all-invisible-product`
        );
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Deleted!',
            text: 'All invisible product has been deleted.',
            showConfirmButton: false,
            timer: 2500
        })
        navigate("/dashboard/admin/products");
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
    }
};

  return (
    <LayoutAdmin>
      <div className="row dashboard">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                    <div className="col-md-9 ">
                        {/* <h1 className="text-center">All Invisible Products List</h1>
                        <div className="col-md-3">
                        <button
                            className="btn-add-Pre-Order-List btn-"
                            onClick={() => navigate(`/dashboard/admin/products`)}
                            >
                                Visible product
                        </button>
                        </div>

                        <div className="mb-3">
                            <button className="btn-delete-product" onClick={handleDelete}>
                                DELETE All 
                            </button>
                        </div> */}
                        <h1 className="text-center">All Invisible Products List</h1>
                        <div className="col-md-3 d-flex ">
                            <button
                                className="btn"
                                onClick={() => navigate(`/dashboard/admin/products`)}
                                >
                                    <BsArrowLeftCircleFill color="#0DA574" style={{ fontSize: '50px' }}/>
                            </button>
                            <button className="btn-delete-product-all" onClick={handleDelete}>
                                DELETE All 
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
}

export default InvisibleProduct