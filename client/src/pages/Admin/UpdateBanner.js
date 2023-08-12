import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/CreateBanner.css"

const { Option } = Select;

const CreateBanner = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [artists, setArtists] = useState([]);
    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [artist, setArtist] = useState("");
    const [id, setId] = useState("");

    //get single banner
    const getSingleBanner = async () => {
    try {
        const { data } = await axios.get(
            `/api/v1/banner/get-banner/${params.slug}`
        );
        setName(data.banner.name);
        setId(data.banner._id);
        setArtist(data.banner.artist);
        
    }catch (error) {
        console.log(error);
    }
    };
    useEffect(() => {
        getSingleBanner();
        //eslint-disable-next-line
    }, []);

    
    //get all artist
    const getAllArtist = async () => {
        try {
            const { data } = await axios.get("/api/v1/artist/get-artist");
            if (data?.success) {
            setArtists(data?.artist);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting artist");
        }
    }; 


    useEffect(() => {
        getAllArtist();
    }, []);

    //update banner function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const bannerData = new FormData();
            bannerData.append("name", name);
            file && bannerData.append("file", file);
            bannerData.append("artist", artist);
            const { data } = axios.put(
                `/api/v1/banner/update-banner/${id}`,
                bannerData
            );
            if (data?.success) {
                toast.error(data?.message);
            } else {
                toast.success("Banner Updated Successfully");
                navigate("/dashboard/admin/banners");
            }
        } catch (error) {
        console.log(error);
        toast.error("something went wrong");
        }
    };

      //delete a banner
    const handleDelete = async () => {
        try {
            let answer = window.prompt("Are You Sure want to delete this banner ? ");
            if (!answer) return;
            const { data } = await axios.delete(
                `/api/v1/banner/delete-banner/${id}`
            );
            toast.success("Banner Deleted Successfully");
            navigate("/dashboard/admin/banners");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };


    return (
    <Layout title={"Dashboard - Create Banner"}>
        <div className="row dashboard">
            <div className="col-md-3">
                <AdminMenu />
            </div>
            <div className="col-sm text-center">
                <h1>Manage Banner</h1>
                <div className="container banner-form">
                <div className="row justify-content-center new-banner">
                <h2>New Banner</h2>
                </div>
                
            </div>
                <div className="container text-center  create-banner">
                    <div className="row justify-content-evenly">
                    <div class="col-6 add-file">
                        <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={name}
                                    placeholder="write a name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
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
                            value={artist}
                        >
                            {artists?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                        </Select>

                        <div className="mb-3">
                        <label className="btn-upload-photo col-md-12">
                                {file ? file.name : "Upload File"}
                                <input
                                    type="file"
                                    name="file"
                                    accept="Video*/ || image*/"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    hidden
                                />
                            </label>
                        </div>
                        <div className="mb-3">
                            {file ? (
                                <div className="text-center">
                                    <file
                                        src={URL.createObjectURL(file)}
                                        alt="banner_file"
                                        height={"200px"}
                                        className="img img-responsive"
                                    />
                                </div>
                            
                            ) : (
                                <div className="text-center">
                                    <file
                                    src={`/api/v1/banner/banner-file/${id}`}
                                    alt="banner_file"
                                    height={"200px"}
                                    className="img img-responsive"
                                    />
                                </div>
                            )}
                        </div>
                        </div>
                        <div className="mb-3">
                            <button className="btn-update-banner" onClick={handleUpdate}>
                            UPDATE BANNER
                            </button>
                        </div>
                        <div className="mb-3">
                            <button className="btn-delete-banner" onClick={handleDelete}>
                            DELETE BANNER
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
    </Layout>


);
};

export default CreateBanner