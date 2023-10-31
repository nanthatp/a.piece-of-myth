import React, { useEffect, useState } from 'react'
import LayoutAdmin from "./../../components/Layout/LayoutAdmin";
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { DatePicker, TimePicker,Select } from 'antd';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import Swal from 'sweetalert2';
import {AiOutlineCloudUpload} from "react-icons/ai";


const { Option } = Select;
export default function CreatePreProduct() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [members, setMembers] = useState([]);
    const [artists, setArtists] = useState([]);
    const [collectiongroups, setCollectiongroups] = useState([]);
    const [name, setName] = useState("");
    const [until, setUntil ] = useState();
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [photo, setPhoto] = useState("");
    const [artist, setArtist] = useState("");
    const [member, setMember] = useState("");
    const [collectiongroup, setCollectiongroup] = useState("");

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

    //get all collection group
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
        getCollectiongroup();
        getAllArtist();
        getAllMember();
    }, []);

    //create product function
    const handleCreate = async (e) => {
        e.preventDefault();

        if (name === "") {
            // กรณีชื่อศิลปินเป็นค่าว่าง
            Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: 'Warning!',
                text: 'Please enter a name',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
        if (photo === "") {
            // กรณีชื่อศิลปินเป็นค่าว่าง
            Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: 'Warning!',
                text: 'Please enter product image',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        } 
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
                text: 'Please selet date and time',
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
            preproductData.append("until", until);
            preproductData.append("category", category);
            preproductData.append("photo", photo);
            preproductData.append("artist", artist);
            preproductData.append("member", member);
            preproductData.append("collectiongroup", collectiongroup);
            const { data } = axios.post(
                "/api/v1/preproduct/create-preproduct",
                preproductData
            );
            if (data?.success) {
                toast.error(data?.message);
            } else {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Created!',
                    text: 'Product has been created.',
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
        // const [value, setValue] = useState(new Date());

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
        
  return (
    <LayoutAdmin title={"Dashboard - Create Preproduct"}>
        <div className="row dashboard">
            <div className="col-md-3">
                <AdminMenu />
            </div>
            <div className="col-sm text-center">
                <h1>Create Pre-Order Product</h1>
                <div className="container product-form">
                <div className="row justify-content-center new-product">
                <h2>New Pre-order Product</h2>
                </div>
                </div>
                <div className="container text-center  create-product">
                    <div className="row justify-content-evenly">
                    <div className="col-4 add-photo">
                        <div className="mb-3">
                            <label className="btn-upload-photo col-md-12">
                            <AiOutlineCloudUpload style={{ fontSize: '25px' ,marginRight:'5px'}}/>{photo ? photo.name : "Upload Photo"}
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
                            {photo && (
                                <div className="text-center">
                                    <img
                                        src={URL.createObjectURL(photo)}
                                        alt="product_photo"
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
                                    placeholder="write a name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                        </div>

                        <div className="mb-3">
                            <input
                                type="number"
                                value={price}
                                placeholder="write a Price"
                                className="form-control"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <Select
                            bordered={false}
                            placeholder="Select a Artist"
                            size="medium"
                            showSearch
                            className="form-select mb-3"
                            onChange={(value) => {
                                setArtist(value);
                            }}
                        >
                            {artists?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                        </Select>

                        <Select
                            bordered={false}
                            placeholder="Select a Category"
                            size="medium"
                            showSearch
                            className="form-select mb-3"
                            onChange={(value) => {
                                setCategory(value);
                            }}
                        >
                            {categories?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                        </Select>
                        
                        
                        </div>
                        {/* <div className='p-5'> <DateTimePicker onChange={setValue} value={value} /></div> */}

                        {/* <div>
                            <input {...props} />
                                <button onClick={openCalendar}>open calendar</button>
                                <button onClick={closeCalendar}>close calendar</button>
                                <button onClick={clear}>clear</button>
                        </div> */}

                        <div className="col-4">
                        <div className="mb-3">
                            <textarea
                                type="text"
                                value={description}
                                placeholder="write a description"
                                className="form-control"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <Select
                            bordered={false}
                            placeholder="Select a Collection group"
                            size="medium"
                            showSearch
                            className="form-select mb-3"
                            onChange={(value) => {
                                setCollectiongroup(value);
                            }}
                        >
                            {collectiongroups?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
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
                            
                        </div>
                        </div>

                        

                        
                        <div className="mb-3">
                            <button className="btn-create-product" onClick={handleCreate}>
                            CREATE PRE-ORDER PRODUCT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </LayoutAdmin>
  )
}