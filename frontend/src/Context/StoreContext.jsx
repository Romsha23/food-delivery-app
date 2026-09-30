import { createContext, useEffect, useState } from "react"
import axios from "axios"

export const StoreContext = createContext(null);

const StoreContextProvider=(props)=>{

    

    const [token, setToken] = useState("");

    const url = import.meta.env.VITE_API_URL || "http://localhost:4000"
    // const url = "http://localhost:4000"

    const [cartItems, setCartItems] = useState({});
    const addToCart = async(itemId) => {
        if (!cartItems[itemId]) {
            setCartItems({...cartItems, [itemId]: 1 });
        }
        else{
            setCartItems({...cartItems, [itemId]: cartItems[itemId] + 1 });
        }
        if(token)
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}} )
    }
    const removeFromCart = async(itemId) => {
        setCartItems({...cartItems, [itemId]: cartItems[itemId] - 1 });
        if(token)
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}} )
    }
    const getTotalCartAmount=()=>{
        let total=0;
        for(let item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = food_list.find(food=>food._id===item);
                if (itemInfo) total+=itemInfo.price*cartItems[item];
            }
        }
        return total;
    }
    const [food_list,setFoodList] = useState([]);
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url+"/api/food/list")
            setFoodList(response.data.data || [])
        } catch (error) {
            console.error("Unable to load menu", error)
            setFoodList([])
        }
    }
    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData)
    }
    useEffect(() => {
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])
    

    const contextValue={
        token,
        setToken,
        url,
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    };

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
