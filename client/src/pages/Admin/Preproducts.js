import React, {useState, useEffect} from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import LayoutAdmin from "./../../components/Layout/LayoutAdmin";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

const Preproducts = () => {
    const navigate = useNavigate();
    const [preproducts, setPreproducts] = useState([]);

    //get all visible pre-order preproducts
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

  return (
    <LayoutAdmin>
      <div className="row dashboard">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                    <div className="col-md-9 ">
                        <h1 className="text-center">All Pre-Order Products List</h1>
                        <div className="col-md-3">
                        <button
                            className="btn-add-Pre-Order-List btn-csv"
                            onClick={() => navigate(`/dashboard/admin/invisible-preproduct`)}
                            >
                                Invisible Pre-Product
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
  )
}

export default Preproducts