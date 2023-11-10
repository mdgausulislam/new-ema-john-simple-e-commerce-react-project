import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
    //if cart is an database, you have to use async await
    const storedCart = getShoppingCart();
    const ids=Object.keys(storedCart);
    console.log(ids);
    const loadedProducts = await fetch(`http://localhost:5000/productsById`,{
        method:'POST',
        headers:{
            'content-type':'application/json'
        }, 
        body:JSON.stringify(ids)
    });
    const products = await loadedProducts.json();
    console.log('products by id :',products);



    const saveCart = [];

    for (const id in storedCart) {
        const addedProduct = products.find(pd => pd._id === id);
        if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            saveCart.push(addedProduct);
        }
    }

    //if you need to send two things
    return saveCart;

}
export default cartProductsLoader;