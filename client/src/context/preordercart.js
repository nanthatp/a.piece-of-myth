import { useState, useContext, createContext, useEffect } from "react";

const PreCartContext = createContext();
const PreCartProvider = ({ prechildren }) => {
    const [precart, setPreCart] = useState([]);

    useEffect(() => {
        let existingCartItem = localStorage.getItem("precart");
        if (existingCartItem) setPreCart(JSON.parse(existingCartItem));
    }, []);

    return (
        <PreCartContext.Provider value={[precart, setPreCart]}>
        {prechildren}
        </PreCartContext.Provider>
    );
};

// custom hook
const usePreCart = () => useContext(PreCartContext);

export { usePreCart, PreCartProvider };