import React,{useEffect, useState} from 'react';
import LayoutAdmin from "./../../components/Layout/LayoutAdmin";
import AdminMenu from '../../components/Layout/AdminMenu'; 
import { toast } from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import {Modal} from 'antd';
import "../../styles/CreateCategory.css";
import{BsFillPencilFill} from 'react-icons/bs';
import{BsFillTrashFill} from 'react-icons/bs';
import Swal from 'sweetalert2';





const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    //handle form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name === "") {
            Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: 'Warning!',
                text: 'Please enter category',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }

        try {
        const { data } = await axios.post("/api/v1/category/create-category", {
            name,
        });

        if (data?.success) {
            toast.success(`${name} is created`);
            getAllCategory();
            window.location.reload();
        } else {
            toast.error(data.message);
        }
        } catch (error) {
        console.log(error);
        // toast.error("somthing went wrong in input form");
        }
    };

    //get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
            setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting catgeory");
        }
    }; 

    useEffect(() => {
        getAllCategory();
    }, []);

    //update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (updatedName === "" ) {
            Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: 'Warning!',
                text: 'Please enter category',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
        
        try {
        const { data } = await axios.put(
            `/api/v1/category/update-category/${selected._id}`,
            { name: updatedName }
        );
        if (data?.success) {
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Updated!',
                text: 'Category has been updated.',
                showConfirmButton: false,
                timer: 3500
            })
            setSelected(null);
            setUpdatedName("");
            setVisible(false);
            getAllCategory();
        } else {
            toast.error(data.message);
        }
        } catch (error) {
        console.log(error);
        }
    };

    //delete category
    const handleDelete = async (pId) => {
        try {
        const { data } = await axios.delete(
            `/api/v1/category/delete-category/${pId}`
        );
        if (data.success) {
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Deleted!',
                text: 'Category has been deleted.',
                showConfirmButton: false,
                timer: 2500
            })

            getAllCategory();
        } else {
            toast.error(data.message);
        }
        } catch (error) {
        toast.error("Something went wrong");
        }
    };

    return (
        <LayoutAdmin title={"Dashboard - Create Category"}> 
            <div className="row dashboard">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-sm text-center">
                    <h1>Manage Category</h1>
                    <div className=''>
                        <CategoryForm 
                            handleSubmit={handleSubmit}
                            value={name}
                            setValue={setName} 
                        />
                    </div> 
                    <div>
                        <table className="table">
                        <tr>
                            <th className='table-cat-th'>Name</th>
                            <th className='table-cat-th'></th>
                        </tr>
                            <tbody>
                                {categories.map((c) => (
                                    <>
                                        <tr>
                                            <td key = {c._id}>{c.name}</td>
                                            <td className='table-cat-td'>
                                                <button 
                                                    className='btn-edit ms-2' 
                                                    onClick={() => {
                                                        setVisible(true);
                                                        setUpdatedName(c.name);
                                                        setSelected(c);
                                                    }}
                                                >
                                                    <BsFillPencilFill/>
                                                </button>
                                                <button 
                                                    className='btn-delete ms-2'
                                                    onClick={() => {
                                                        handleDelete(c._id);
                                                    }}
                                                >
                                                    <BsFillTrashFill/>
                                                </button>
                                            </td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Modal 
                        onCancel={() => setVisible(false)}
                        footer={null}
                        visible={visible}
                    > 
                        <CategoryForm 
                            value={updatedName}
                            setValue={setUpdatedName}
                            handleSubmit={handleUpdate}
                    />
                    </Modal>
                </div>
            </div>
        </LayoutAdmin>
    )
}

export default CreateCategory