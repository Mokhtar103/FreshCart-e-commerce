import axios from "axios";
import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export default function CartContextProvider({children}) {
    const endpoint = `https://ecommerce.routemisr.com/api/v1/cart`;
    const headers = {
        token: localStorage.getItem("token"),
    }
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [cartId, setCardId] = useState(null);

    async function addToCart(productId){
        try {
            const {data} = await axios.post(endpoint, {
                productId
            }, {
                headers,
            });
            setNumOfCartItems(data.numOfCartItems);
            return data;
            
        } catch (error) {
            console.log(error)
            
        }
    }

    async function getCart() {
        try {
            const {data} = await axios.get(endpoint, {
               headers,
            });
            setNumOfCartItems(data.numOfCartItems);
            console.log("id", data.data._id)
            setCardId(data.data._id);
            return data;
        } catch (error) {
            console.log(error);
            
        }

    }

    async function removeFromCart(id) {
        try {

            const {data} = await axios.delete(`${endpoint}/${id}`, {headers});
            setNumOfCartItems(data.numOfCartItems);
            return data;

        } catch (error) {
            console.log(error);
        }
    }

    async function clearCart() {
        try {

            const {data} = await axios.delete(endpoint, {
                headers,
            });
            setNumOfCartItems(0);
            return data;

        } catch (error) {
            console.log(error);
        }
    }

    async function updateProductQty(id, count) {
        try {
          const {data} = axios.put(`${endpoint}/${id}`, {count} , {headers});
          return data;
        } catch (error) {
          console.log(error);
        }
      }
    return <CartContext.Provider value = {{ numOfCartItems , addToCart, getCart, removeFromCart, clearCart, 
    updateProductQty, cartId, setNumOfCartItems}}>
        {children}
    </CartContext.Provider>
}

