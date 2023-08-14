import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {BsSearchHeartFill} from 'react-icons/bs'
const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const { data } = await axios.get(
            `/api/v1/product/search/${values.keyword}`
        );
        setValues({ ...values, results: data });
        navigate("/search");
        } catch (error) {
        console.log(error);
        }
    };
    return (
        <div>
            <form
                className="search-box"
                role="search"
                onSubmit={handleSubmit}
            >
                
                <input
                
                    className="search-input"
                    type="search"
                    placeholder="Search "
                    aria-label="Search"
                    value={values.keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                    
                />
                <button className="btn-search" type="submit">
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchInput;