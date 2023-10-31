import React from "react";
import "../../styles/CategoryForm.css"
import { ToastContainer } from 'react-toastify';

const TrackingForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="container categoryform">
                <div className="row justify-content-center">
                <h2>Tracking Number</h2>
                    <div className="col-8">
                        <input
                            type="text"
                            className="form-control form-control-category"
                            placeholder="Enter Tracking"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                    <div className="col-4">
                        <button type="submit" className="btn-submit">
                            Add 
                        </button>
                    </div>
                </div>
            </div>
        </form>
        </>
    );
};

export default TrackingForm;