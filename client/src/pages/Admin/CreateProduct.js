import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';

const CreateProduct = () => {
  const [products, setProducts] = useState([])

    //get all categories
    const getAllProduct = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/get-product");
            if (data?.success) {
            setProducts(data?.products);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting products");
        }
    };
    
    useEffect(() => {
        getAllProduct();
    }, []);

  return (
    <Layout title={"Dashboard - Create Category"}>
        <div className="container-fluid m-3 p-3 dashboard">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1>Manage Product</h1>
                    <div>
                        {<table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                    {products.map((c) => (
                                        <>
                                            <tr>
                                                <td key = {c._id}>{c.name}</td>
                                                <td>
                                                    <button className='btn btn-primary'>Edit</button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                        
                                
                            </tbody>
                        </table>
                        }
                    </div>
                </div>
            </div>
        </div>
    </Layout>
)
}

export default CreateProduct