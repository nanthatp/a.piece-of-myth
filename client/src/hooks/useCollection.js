import { useState, useEffect } from "react";
import axios from "axios";

export default function useCollection() {
    const [collections, setCollections] = useState([]);

    //get cat
    const getCollections = async () => {
        try {
        const { data } = await axios.get("/api/v1/collection/get-collection");
        setCollections(data?.collection);
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        getCollections();
    }, []);

    return collections;
}