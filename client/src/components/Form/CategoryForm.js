import React from "react";
import "../../styles/CategoryForm.css"
import { ToastContainer } from 'react-toastify';

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="container categoryform">
                <div className="row justify-content-center">
                <h2>My Category</h2>
                    <div className="col-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter new category"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                    <div class="col-4">
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

export default CategoryForm;