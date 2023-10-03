import { useState, useEffect } from "react";
import axios from "axios";

export default function useCollection() {
    const [collectiongroups, setCollectiongroups] = useState([]);

    //get cat
    const getCollectiongroups = async () => {
        try {
        const { data } = await axios.get("/api/v1/collectiongroup/get-collectiongroup");
        setCollectiongroups(data?.collectiongroup);
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        getCollectiongroups();
    }, []);

    return collectiongroups;
}