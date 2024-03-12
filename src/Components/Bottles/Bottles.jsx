import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import "./Bottles.css";
import { addToLS } from "../../Utilities/localstorage";
import { getStoredCart } from "../../Utilities/localstorage";
import Cart from "../Cart/Cart";
import { removeFromLS } from "../../Utilities/localstorage";

const Bottles = () => {
  const [bottles, setBottles] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch("bottles.json")
      .then((res) => res.json())
      .then((data) => setBottles(data));
  }, []);
  useEffect(() =>{
    if(bottles.length){
        const storedCart =getStoredCart();
        const saveCart =[];
        for(const id of storedCart){
            const bottle = bottles.find(bottle => bottle.id === id);
            if(bottle){
                saveCart.push(bottle);
            }
        }
        setCart(saveCart);

    }
  }, [bottles])
  const handleAddToCart = (bottle) => {
    const newCart = [...cart, bottle];
    setCart(newCart);
    addToLS(bottle.id)
    console.log(newCart);
  };
  const handleRemoveFromCart = id =>{
    // Visual cart remove 
    const remainingCart = cart.filter(bottle => bottle.id !== id )
    setCart(remainingCart);
    // remove from LS
    removeFromLS(id);
  }
  return (
    <div>
      <h2>Bottles Available Here: {bottles.length}</h2>
      <Cart handleRemoveFromCart={handleRemoveFromCart} cart={cart}></Cart>
      <div className="bottle-container">
        {bottles.map(bottle => (
          <Bottle
            key={bottle.id}
            bottle={bottle}
            handleAddToCart={handleAddToCart}
          ></Bottle>
        ))}
      </div>
    </div>
  );
};

export default Bottles;
