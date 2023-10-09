import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';


const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))

    }, []);

    // useEffect(()=>{
    //     const storedCart=getShoppingCart();

    //     //step-01  get id
    //     for (const id in storedCart) {
    //         // step-02 get the product using id
    //             const addedProduct=products.find(product=>product.id===id);
    //             //step-03 get the quantity of the product
    //             const quantity=storedCart[id];
    //             addedProduct.quantity=quantity;
    //     }

    // },[products]);


    useEffect(() => {
        const storedCart = getShoppingCart();
        const saveCart = [];


        //step 1: get id of the addedProduct
        for (const id in storedCart) {
            //step-02 get product from products  state bby using id
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                //step-3: add quantity
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                //step-4:add the added product to save cart
                saveCart.push(addedProduct);
            }

        }
        setCart(saveCart)
    }, [products])

    const handleAddToCart = (product) => {
        // const newCart = [...cart, product];
        let newCart = [];
        //if product doesn't exits  in the cart, then set quantity =1
        // if exit update quantity by 1

        const exists = cart.find(pd => pd.id === product.id);
        if(!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else{
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart= [...remaining,exists];
        }

        setCart(newCart);
        addToDb(product.id)
    }

    const handleClearCart=()=>{
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>

            <div className="cart-container">
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                ></Cart>
            </div>
        </div>
    );
};
export default Shop;