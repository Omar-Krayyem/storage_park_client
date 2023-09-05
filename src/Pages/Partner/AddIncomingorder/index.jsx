import './style.css';
import React, { useState } from "react";

import NavSide from '../../../components/Partner/NavSide';
import Header from '../../../components/Shared/Header';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';

const AddIncomingOrder = () => {
    const name = localStorage.getItem("user_name");

    const [latitude , setLatitude] = useState("");
    const [longitude , setLongitude] = useState("");

    const [products, setProducts] = useState([]);

    const [productName, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [description, setDescription] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState(0)

    const [error, setError] = useState("")

    const handleAddProduct = (e) => {
        e.preventDefault();

        if (!productName || !price || !quantity || !description || selectedCategoryId === 0) {
            setError("Please fill in all fields.");
            return;
        }

        const product = {
            productName,
            price: +price,
            quantity: +quantity,
            description: description,
            category_id: selectedCategoryId
        };

        setProducts([...products, product]);

        setName("");
        setPrice("");
        setQuantity("");
        setDescription("");
        setSelectedCategoryId(0);
        setError("")
    };

    const handleDeleteProduct = (productNameToDelete) => {
        const updatedProducts = products.filter(product => product.productName !== productNameToDelete);
        setProducts(updatedProducts);
    };

    const handleAddOrder = async() => {
        if (!longitude || !latitude) {
            setError("Please fill all input fields.");
            return;
        }

        if (products.length === 0) {
            setError("There are no products")
            return;
        }

        console.log(latitude, longitude, products);

        try {
            await axios.post(`/api/client/orders`, {
                latitude: latitude,
                longitude: longitude,
                products
            });
            window.location.href = '/partner/incoming/placed'
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='AddOrder_page'> 
            <div className='left_side'>
                <NavSide/>
            </div>
            <div className='right_side'>
                <div className='head'>
                    <Header name={name} />
                </div>
                <div className='body'>
                    <div className='title'>
                        <div className='page_title'><h1>Place Order</h1></div>
                        <div className='right_title'>
                            <Link to={'/partner/incoming/placed'}><button>Back</button></Link>
                        </div>
                    </div>

                    <div className='location_section'>
                        <div className='location_inputs'>
                            <h2>Location Info: </h2>
                            <div className="halftext_feild">
                                <label>Latitude</label>
                                <input 
                                className='half'
                                type="text" 
                                required
                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
                                ></input>
                            </div>
                            <div className="halftext_feild ">
                                <label>Longitude</label>
                                <input 
                                className='half'
                                type="text"
                                required
                                value={longitude}
                                onChange={(e) => setLongitude(e.target.value)}
                                ></input> 
                            </div>
                        </div>
                    </div>

                    <div className='products_section'>
                        <h2>Order Items:</h2>
                        <div className='product_section'>
                            <div className="halftext_feild">
                                <label>Name</label>
                                <input 
                                className='half'
                                type="text" 
                                required
                                value={productName}
                                onChange={(e) => setName(e.target.value)}
                                ></input>
                            </div>
                            <div className="halftext_feild ">
                                <label>description</label>
                                <input 
                                className='half'
                                type="text"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                ></input> 
                            </div>

                            <div className="halftext_feild">
                                <label>Category</label>
                                <select
                                    className="half"
                                    value={selectedCategoryId}
                                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                                    required
                                >
                                    <option value="0">Select a category</option>
                                    <option value="1">Electronics</option>
                                    <option value="2">Fashion</option>
                                    <option value="3">Home & Garden</option>
                                    <option value="4">Health & Beauty</option>
                                    <option value="5">Sports & Outdoors</option>
                                    <option value="6">Automotive</option>
                                    <option value="7">Toys & Games</option>
                                    <option value="8">Office & Stationery</option>
                                </select>
                            </div>
                            <div className="halftext_feild ">
                                <label>Quantity</label>
                                <input 
                                className='half'
                                type="number"
                                required
                                min={1}
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                ></input> 
                            </div>

                            <div className="halftext_feild ">
                                <label>Price</label>
                                <input 
                                className='half'
                                type="number"
                                required
                                min={0}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                ></input> 
                            </div>

                            <button className='btn'  onClick={handleAddProduct}>+</button>
                            <div className='error'>{error}</div>
                        </div>

                        <div className='display_products'>
                            {products.map((product) => (
                                <div className='display_product' key={product.productName}>
                                    <div className='attributes'>
                                        <div><span>Name: </span>{product.productName}</div>
                                        <div><span>Description: </span>{product.description}</div>
                                        <div><span>CategoryId: </span>{product.category_id}</div>
                                        <div><span>Quantity: </span>{product.quantity}</div>
                                        <div><span>Price: </span>{product.price}</div>
                                    </div>
                                    
                                    <button className='btn' onClick={() => handleDeleteProduct(product.productName)}>Delete</button>                                    
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='placebutton'>
                        <button onClick={handleAddOrder}>Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddIncomingOrder;