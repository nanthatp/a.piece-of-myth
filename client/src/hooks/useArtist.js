import { useState, useEffect } from "react";
import axios from "axios";

export default function useArtist() {
    const [artists, setArtists] = useState([]);

    //get artist
    const getArtists = async () => {
        try {
        const { data } = await axios.get("/api/v1/artist/get-artist");
        setArtists(data?.artist);
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        getArtists();
    }, []);
    return artists;
}