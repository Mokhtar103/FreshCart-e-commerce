import axios from "axios";
import { createContext, useState } from "react";

export const wishContext = createContext();

export default function WishContextProvider({children}) {
    const endpoint = `https://ecommerce.routemisr.com/api/v1/wishlist`;
    const headers = {
        token: localStorage.getItem("token"),
    }
    const [wishList, setwishList] = useState(null)



    async function addToWish(productId) {
        try {
            const {data} = await axios.post(endpoint, {
                productId,
            }, {
                headers,
            })
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async function getWishList(){
        try {
            const {data} = await axios.get(endpoint, {
                headers,
            })

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async function removeFromWish(id) {
       try {
        const {data} = await axios.delete(`${endpoint}/${id}`, {headers})
        return data;
       } catch (error) {
        console.log(error);
       }
        
    }

    return <wishContext.Provider value={{addToWish, getWishList, removeFromWish, wishList, setwishList}}>
        {children}
    </wishContext.Provider>
}