import React, {useState, useEffect} from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import LayoutAdmin from "./../../components/Layout/LayoutAdmin";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

function InvisiblePreProduct() {
    const navigate = useNavigate();
    const [preproducts, setPreproducts] = useState([]);

    //get all invisible pre-order preproducts
    const getAllPreProducts = async () => {
        try {
        const { data } = await axios.get("/api/v1/preproduct/get-invisible-preproduct");
        setPreproducts(data.preproducts);
        } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong");
        }
    };

    useEffect(() => {
      getAllPreProducts();
  }, []);
  
  //delete all Invisible product
  const handleDelete = async () => {
    try {
        let answer = window.prompt("Are You Sure want to delete all Invisible Pre-order product ? ");
        if (!answer) return;
        const { data } = await axios.delete(
            `/api/v1/preproduct/delete-all-invisible-preproduct`
        );
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Deleted!',
            text: 'All Invisible Pre-Order product has been deleted.',
            showConfirmButton: false,
            timer: 2500
        })
        navigate("/dashboard/admin/preproduct");
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
                        <h1 className="text-center">All Invisible Pre-Order Products List</h1>
                        <button
                            className="btn-add-Pre-Order-List"
                            onClick={() => navigate(`/dashboard/admin/preproduct`)}
                            >
                             Visible Pre-order product
                        </button>
                        <div className="mb-3">
                            <button className="btn-delete-product" onClick={handleDelete}>
                            DELETE All Invisible PRE-ORDER PRODUCT
                            </button>
                        </div>
                        <div className="d-flex flex-wrap">
                        {preproducts?.map((p) => (
                                <Link
                                    key={p._id}
                                    to={`/dashboard/admin/preproduct/${p.slug}`}
                                    className="product-link"
                                >
                                    <div className="card m-2" style={{ width: "15rem" ,height:"20rem"}} >
                                        <img
                                            src={`/api/v1/preproduct/preproduct-photo/${p._id}`}
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

export default InvisiblePreProduct