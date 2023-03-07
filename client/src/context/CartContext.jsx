import { createContext, useContext, useEffect, useState } from "react";

const Cart = createContext(null);

const CartContext = ({ children }) => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem( "product")) || []);
    // const [subtotal, setSubtotal] = useState(JSON.parse(localStorage.getItem( "subtotal")) || 0);
    // const [taxes, setTaxes] = useState(JSON.parse(localStorage.getItem( "taxes")) || 0);
    // const [total, setTotal] = useState(JSON.parse(localStorage.getItem( "total")) || 0);
    
    useEffect(() => {
        
        // console.log(subtotal)
        // console.log("cart", cart)
        // setSubtotal(cart.reduce((accumulator, currentValue) => accumulator +  Number(currentValue.price * currentValue.discount), 0).toFixed(2));
        // let calTax = subtotal * (.10)
        // console.log(calTax)
        // setTaxes((calTax).toFixed(2));
        // console.log("taxes", typeof taxes)
        // setTotal((Number(subtotal + taxes).toFixed(2)))
        localStorage.setItem( "product", JSON.stringify(cart));

        // localStorage.setItem( "subtotal", JSON.stringify(subtotal));
        // localStorage.setItem( "taxes", JSON.stringify(taxes));
        // localStorage.setItem( "total", JSON.stringify(total));
	}, [cart]);
    // value={{ cart, setCart, subtotal, setSubtotal, taxes, setTaxes, total, setTotal}}
    return (
      <Cart.Provider value={{ cart, setCart }}>
        {children}
      </Cart.Provider>
    );
  };
  
  export const CartState = () => {
    return useContext(Cart);
  };
  
  export default CartContext;