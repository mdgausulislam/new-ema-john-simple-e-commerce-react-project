import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'


const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPages] = useState(10);
    const { totalProducts } = useLoaderData();


    // const itemsPerPage = 10; //TODO: make it dynamic
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    const pageNumber = [...Array(totalPages).keys()];
    const options = [5, 10, 15];

    console.log(totalProducts);


    /**
     * Done 1:Determine the total number of items
     * TODO 2: Decide on the number of items per page
     * DONE 3: Calculate the total number of pages
     * DONE 4: Determine the current Page
     * 
     * * */



    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))

    // }, []);

    useEffect(()=>{
        async function fetchData(){
            const response=await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`)
            const data=await response.json();
            setProducts(data);
        }
        fetchData()
    },[currentPage,itemsPerPage])

    // useEffect(()=>{
    //     const storedCart=getShoppingCart();

    //     //step-01  get id
    //     for (const id in storedCart) {
    //         // step-02 get the product using id
    //             const addedProduct=products.find(product=>product._id===id);
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
            const addedProduct = products.find(product => product._id === id);
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

        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists];
        }

        setCart(newCart);
        addToDb(product._id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    function handleSelectChange(event) {
        setItemsPerPages(parseInt(event.target.value))
        setCurrentPage(0)
    }

    return (
        <>
            <div className='shop-container'>
                <div className="products-container">
                    {
                        products.map(product => <Product
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }
                </div>

                <div className="cart-container">
                    <Cart
                        cart={cart}
                        handleClearCart={handleClearCart}
                    >
                        <Link to='/orders'>
                            <button className="btn-review-order">Review Order <FontAwesomeIcon icon={faArrowAltCircleRight} /></button>

                        </Link>
                    </Cart>
                </div>
            </div>

            {/* pagination */}
            <div className='pagination'>
                <p>Current page:{currentPage} and items per page:{itemsPerPage}</p>
                {
                    pageNumber.map(number => <button
                        key={number}
                        className={currentPage===number ? 'selected':''}
                        onClick={() => setCurrentPage(number)}
                    >{number} </button>)
                }
                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {
                        options.map(option => <option
                            key={option} value={option}
                        >{option}</option>)
                    }
                </select>

            </div>
        </>
    );
};
export default Shop;