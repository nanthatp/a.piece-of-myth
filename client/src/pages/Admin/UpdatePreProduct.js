import React, { useEffect, useState } from 'react'
import LayoutAdmin from "./../../components/Layout/LayoutAdmin";
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { DatePicker, Select, TimePicker } from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment';
import Swal from 'sweetalert2';
import {BiSolidEdit} from "react-icons/bi";

// const date = New Date()
const { Option } = Select;
const UpdatePreProduct = () => {
    const navigate = useNavigate();
    // const d = moment(new Date().format('YYYY-MM-DD hh:mm'));
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [members, setMembers] = useState([]);
    const [artists, setArtists] = useState([]);
    const [collectiongroups, setCollectiongroups] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");  
    const [photo, setPhoto] = useState("");
    const [artist, setArtist] = useState("");
    const [member, setMember] = useState("");
    const [collectiongroup, setCollectiongroup] = useState("");
    const [preproduct, setPreproduct] = useState("");
    const [id, setId] = useState("");
    const [until , setUntil] = useState("");
    const [date, setDate] = useState();
    const [timing, setTimings] = useState();
    const [isAvailable,setIsAvailable] = useState();
    const [status, setStatus] = useState("");


    //get single product
    const getSinglePreProduct = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/preproduct/get-preproduct/${params.slug}`
            );
            setName(data.preproduct.name);
            setId(data.preproduct._id);
            setDescription(data.preproduct.description);
            setPrice(data.preproduct.price);
            setCategory(data.preproduct.category._id);
            setArtist(data.preproduct.artist);
            setUntil(data.preproduct.until);
            setMember(data.preproduct.member);
            setStatus(data.preproduct.status);
            setCollectiongroup(data.preproduct.collectiongroup);
            
        }catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getSinglePreProduct();
        
        //eslint-disable-next-line
    }, []);



    //get all collection
    const getCollectiongroup = async () => {
        try {
            const { data } = await axios.get("/api/v1/collectiongroup/get-collectiongroup");
            if (data?.success) {
                setCollectiongroups(data?.collectiongroup);
                }
        }catch(error){
            console.log(error);
            toast.error("Something went wrong in getting collection groups");
        }
    }


    //get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
            setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting category");
        }
    }; 

    //get all artist
    const getAllArtist = async () => {
        try {
            const { data } = await axios.get("/api/v1/artist/get-artist");
            if (data?.success) {
            setArtists(data?.artists);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting artist");
        }
    }; 

    //get all member
    const getAllMember = async () => {
        try {
            const { data } = await axios.get("/api/v1/member/get-member");
            if (data?.success) {
            setMembers(data?.member);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting member");
        }
    }; 


    useEffect(() => {
        getAllCategory();
        getAllArtist();
        getAllMember();
        getCollectiongroup();
    }, []);

    //update product function
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (name === "") {
            // กรณีชื่อศิลปินเป็นค่าว่าง
            Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: 'Warning!',
                text: 'Please enter name',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
        // if (photo === "") {
        //     // กรณีชื่อศิลปินเป็นค่าว่าง
        //     Swal.fire({
        //         position: 'top-center',
        //         icon: 'warning',
        //         title: 'Warning!',
        //         text: 'Please enter product image',
        //         showConfirmButton: false,
        //         timer: 3000
        //     });
        //     return;
        // } 
        if (description === "") {
            // กรณีชื่อศิลปินเป็นค่าว่าง
            Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: 'Warning!',
                text: 'Please enter description',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
        if (price === "") {
            // กรณีชื่อศิลปินเป็นค่าว่าง
            Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: 'Warning!',
                text: 'Please enter price',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
        if (category === "") {
            // กรณีชื่อศิลปินเป็นค่าว่าง
            Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: 'Warning!',
                text: 'Please select category',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
        if (collectiongroup === "") {
            // กรณีชื่อศิลปินเป็นค่าว่าง
            Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: 'Warning!',
                text: 'Please select collection',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
        if (!until) {
            // กรณีชื่อศิลปินเป็นค่าว่าง
            Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: 'Warning!',
                text: 'Please select date and time',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
        if (artist === "") {
            // กรณีชื่อศิลปินเป็นค่าว่าง
            Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: 'Warning!',
                text: 'Please select artist',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
        try {
            const preproductData = new FormData();
            preproductData.append("name", name);
            preproductData.append("description", description);
            preproductData.append("price", price);
            preproductData.append("category", category);
            photo && preproductData.append("photo", photo);
            preproductData.append("artist", artist);
            preproductData.append("member", member);
            preproductData.append("until", until);
            preproductData.append("status", status);
            preproductData.append("collectiongroup", collectiongroup);
            const { data } = axios.put(
                `/api/v1/preproduct/update-preproduct/${id}`,
                preproductData
            );
            if (data?.success) {
                toast.error(data?.message);
            } else {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Pre-Order product information has been updated.',
                    showConfirmButton: false,
                    timer: 3500
                })
                navigate("/dashboard/admin/preproduct");
                window.location.reload();
            }
        } catch (error) {
        console.log(error);
        toast.error("something went wrong");
        }
    };

    function handleSubmitDate (date){
        let convertDate = moment(new Date(date));
        let convertTime = moment(new Date(until)) || moment(new Date());
        console.log(`Date...`, convertDate);
        console.log(`Until...`, convertTime);
        convertDate.set({
            "hour":   convertTime.get('hour'),
            "minute": convertTime.get('minute')
        });
        setUntil(convertDate);
    }

    function handleSubmitTime (time){
        let convertDate = moment(new Date(until)) || moment(new Date());
        let convertTime = moment(new Date(time));
        console.log(`Date...`, convertDate);
        console.log(`Until...`, convertTime);
        convertTime.set({
            "year":   convertDate.get('year'),
            "month":   convertDate.get('month'),
            "date":   convertDate.get('date'),
        });
        setUntil(convertTime);
    }

    //delete a product
    const handleDelete = async () => {
        try {
            let answer = window.prompt("Are You Sure want to delete this Pre-order product ? ");
            if (!answer) return;
            const { data } = await axios.delete(
                `/api/v1/preproduct/delete-preproduct/${id}`
            );
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Deleted!',
                text: 'Pre-Order product has been deleted.',
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
        <LayoutAdmin title={"Dashboard - Update Category"}>
            <div className="row dashboard">
            <div className="col-md-3">
                <AdminMenu />
            </div>
            <div className="col-sm text-center">
                <h1>Manage Pre-Order Product</h1>
                <div className="container product-form">
                <div className="row justify-content-center new-product">
                <h2>New Pre-Order Product</h2>
                </div>
                
            </div>
                <div className="container text-center  create-product">
                    <div className="row justify-content-evenly">
                    <div className="col-4 add-photo">
                        <div className="mb-3">
                            <label className="btn-upload-photo col-md-12">
                            <BiSolidEdit style={{ fontSize: '25px' ,marginRight:'5px'}}/>{photo ? photo.name : "Edit photo"}
                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    onChange={(e) => setPhoto(e.target.files[0])}
                                    hidden
                                />
                            </label>
                        </div>
                        <div className="mb-3">
                            {photo ? (
                                <div className="text-center">
                                    <img
                                        src={URL.createObjectURL(photo)}
                                        alt="preproduct_photo"
                                        height={"200px"}
                                        className="img img-responsive"
                                    />
                                </div>
                            
                            ) : (
                                <div className="text-center">
                                    <img
                                    src={`/api/v1/preproduct/preproduct-photo/${id}`}
                                    alt="preproduct_photo"
                                    height={"200px"}
                                    className="img img-responsive"
                                    />
                                </div>
                            )}
                        </div>
                        </div>
                    <div className="col-4">
                        <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={name}
                                    placeholder="Enter name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                        </div>

                        <div className="mb-3">
                            <input
                                type="number"
                                value={price}
                                placeholder="Enter price"
                                className="form-control"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <Select
                            bordered={false}
                            placeholder="Select artist"
                            size="medium"
                            showSearch
                            className="form-select mb-3"
                            onChange={(value) => {
                                setArtist(value);
                            }}
                            value={artist}
                        >
                            {artists?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                        </Select>

                        <Select
                            bordered={false}
                            placeholder="Select category"
                            size="medium"
                            showSearch
                            className="form-select mb-3"
                            onChange={(value) => {
                                setCategory(value);
                            }}
                            value={category}
                        >
                            {categories?.map((c) => (
                                <op key={c._id} value={c._id}>
                                    {c.name}
                                </op>
                            ))}
                        </Select>

                    
                        <Select
                                bordered={false}
                                placeholder="Select status"
                                size="medium"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setStatus(value);
                                }}
                                // value={status ? "Visible" : "Invisible"}
                                value={status}
                            >
                                <Option value="Visible">Visible</Option>
                                <Option value="Invisible">Invisible</Option>
                            </Select>
                        

                        
                        </div>

                        <div className="col-4">
                        <div className="mb-3">
                            <textarea
                                type="text"
                                value={description}
                                placeholder="Enter description"
                                className="form-control"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        
                        <Select
                            bordered={false}
                            placeholder="Select collection"
                            size="medium"
                            showSearch
                            className="form-select mb-3"
                            onChange={(value) => {
                                setCollectiongroup(value);
                            }}
                            value={collectiongroup}
                        >
                            {collectiongroups?.map((c) => (
                                <op key={c._id} value={c._id}>
                                    {c.name}
                                </op>
                            ))}
                        </Select>
                        <div className="d-flex flex-column">
                        <TimePicker className='m-2' format= 'HH:mm' 
                            onChange={(values) => {console.log("testTime",values); 
                            handleSubmitTime(values)}}/>
                            <DatePicker format= 'YYYY-MM-DD ' className='m-2'
                            onChange={(values) => {handleSubmitDate(values)}}> 
                            {/* {preproduct?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.until}
                                </Option>
                            ))} */}
                                {moment(until).format('YYYY-MM-DD')}
                            </DatePicker>
                            <label className='test-time'>Time: {moment(until).locale('th').format('YYYY-MM-DD hh:mm')}</label>
                        </div>
                        </div>
                        <div className="mb-3">
                            <button className="btn-update-product" onClick={handleUpdate}>
                            UPDATE PRE-ORDER PRODUCT
                            </button>
                        </div>
                        <div className="mb-3">
                            <button className="btn-delete-product" onClick={handleDelete}>
                            DELETE PRE-ORDER PRODUCT
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
    </LayoutAdmin>
    )
}

export default UpdatePreProduct