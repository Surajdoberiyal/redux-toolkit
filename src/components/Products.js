import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { fetchProducts } from '../store/productSlice';
import { STATUSES } from '../store/productSlice';

const Products = () => {
    const dispatch = useDispatch();
    const { data: products, status } = useSelector((state) => state.product);
    // const [products, setProducts] = useState([]);

    useEffect(() => {
        dispatch(fetchProducts());
        // const fetchProducts = async () => {
        //     const res = await fetch('https://fakestoreapi.com/products');
        //     const data = await res.json();
        //     console.log(data);
        //     setProducts(data);
        // };
        // fetchProducts();
    }, []);

    const handleAdd = (product) => {
        dispatch(add(product));
    };

    if (status === STATUSES.LOADING) {
        return (
            <div className="spinner">
            <div className="circle one"></div>
            <div className="circle two"></div>
            <div className="circle three"></div>
        </div>
        )
    }

    if (status === STATUSES.ERROR) {
        return <h2>Something went wrong!</h2>;
    }
    return (
        <div className="productsWrapper">
            {products.map((product) => (
                <div className="card" key={product.id}>
                    <img src={product.image} alt="" />
                    <h4>{product.title}</h4>
                    <h3>₹ {product.price}</h3>
                    <button onClick={() => handleAdd(product)} className="btn">
                        Add to cart
                    </button>
                </div>
            ))}
            <br/>
            <br/>
        </div>
    );
};

export default Products;
