import React, { useEffect, useState } from 'react'
import LayoutAdmin from "./../../components/Layout/LayoutAdmin";
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import {BsCloudUploadFill} from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateArtist = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [member, setMember] = useState("");
    const [id, setId] = useState("");

    //get single artist
    const getSingleArtist = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/artist/get-artist/${params.slug}`
            );
            setName(data.artist.name);
            setMember(data.artist.member);
            setId(data.artist._id);
            
        }catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getSingleArtist();
    }, []);

    //update artist function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const artistData = new FormData();
            artistData.append("name", name);
            photo && artistData.append("photo", photo);
            artistData.append("member", member);
            const { data } = axios.put(
                `/api/v1/artist/update-artist/${id}`,
                artistData
            );
            if (data?.success) {
                toast.error(data?.message);
            } else {
                toast.success("Artist Updated Successfully");
                navigate("/dashboard/admin/artists");
            }
        } catch (error) {
        console.log(error);
        toast.error("something went wrong");
        }
    };

    //delete a artist
    const handleDelete = async () => {
        try {
            let answer = window.prompt("Are You Sure want to delete this artist ? ");
            if (!answer) return;
            const { data } = await axios.delete(
                `/api/v1/artist/delete-artist/${id}`
            );
            toast.success("Artist DEleted Succfully");
            navigate("/dashboard/admin/artists");
        } catch (error) {
            console.log(error);
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
                    <h1>Manage Artist</h1>
                    <div className="container product-form">
                    <div className="row justify-content-center new-product">
                    <h2>New Artist</h2>
                    </div>
                    
                </div>
                    <div className="container text-center  create-product">
                        <div className="row justify-content-evenly">
                        <div className="col-4 add-photo">
                            <div className="mb-3">
                                <label className="btn-upload-photo col-md-12">
                                    <p><BsCloudUploadFill/></p>
                                    {photo ? photo.name : "Upload Loco"}
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
                                        alt="artist_photo"
                                        height={"200px"}
                                        className="img img-responsive"
                                    />
                                </div>
                            
                            ) : (
                                <div className="text-center">
                                    <img
                                    src={`/api/v1/artist/artist-photo/${id}`}
                                    alt="artist_photo"
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
                                    placeholder="write a name artist"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
    
                            {/* <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={member}
                                    placeholder="write a name member"
                                    className="form-control"
                                    onChange={(e) => setMember(e.target.value)}
                                />
                            </div> */}
                        </div>
                        </div>
                        <div className="mb-3">
                            <button className="btn-delete-product" onClick={handleDelete}>
                                DELETE ARTIST
                            </button>
                            <button className="btn-update-product" onClick={handleUpdate}>
                                UPDATE ARTIST
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
    
            
            
        </LayoutAdmin>
    
    
    );
    };

export default UpdateArtist