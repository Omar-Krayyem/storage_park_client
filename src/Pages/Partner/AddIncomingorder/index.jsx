import './style.css';

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

import NavSide from '../../../components/Partner/NavSide';
import Header from '../../../components/Shared/Header';

const AddIncomingOrder = () => {
    const name = localStorage.getItem("user_name");
    const token = localStorage.getItem("token");

    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const [newProducts, setNewProducts] = useState([]);
    const [oldProducts, setOldProducts] = useState([]);
    const [isNewProduct, setIsNewProduct] = useState(false);

    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [description, setDescription] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);

    const [error, setError] = useState("");

    const [existProducts, setExistProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(0);
    const [selectedProductName, setSelectedProductName] = useState("")

    const getProducts = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/partner/incoming/products`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log(response.data.data)
            setExistProducts(response.data.data);
            
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const handleAddProduct = (e) => {
        e.preventDefault();

        if (isNewProduct) {
            if (!productName || !price || !quantity || !description || selectedCategoryId === 0) {
                setError("Please fill in all fields.");
                return;
            }

            const newProduct = {
                productName,
                description,
                product_category_id: selectedCategoryId,
                price: +price,
                quantity: +quantity,
            };

            setNewProducts([...newProducts, newProduct]);

            // Reset form fields
            setProductName("");
            setPrice(0);
            setQuantity(1);
            setDescription("");
            setSelectedCategoryId("0");
            setError("");
        } 
        else {
            if (selectedProductId === "0") {
                setError("Please select an existing product.");
                return;
            }

            const oldProduct = {
                id: selectedProductId,
                name: selectedProductName,
                quantity: +quantity,
            }

            setOldProducts([...oldProducts, oldProduct]);
            setQuantity(1);
            setError("");
        }
    };

    const handleDeleteProduct = (productNameToDelete) => {
        const updatedProducts = newProducts.filter(product => product.productName !== productNameToDelete);
        setNewProducts(updatedProducts);
    };

    const handleDeleteOldProduct = (productIdToDelete) => {
        const updatedProducts = oldProducts.filter(product => product.id !== productIdToDelete);
        setOldProducts(updatedProducts);
    }

    const handleAddOrder = async () => {
        if (!latitude || !longitude) {
            setError("Please fill in all input fields.");
            return;
        }

        if (newProducts.length === 0 && oldProducts.length === 0) {
            setError("There are no products");
            return;
        }

        try {
            console.log(newProducts , oldProducts)
            await axios.post(`http://127.0.0.1:8000/api/partner/incoming/create`, {
                latitude,
                longitude,
                newProducts,
                oldProducts
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            window.location.href = '/partner/incoming/placed';
        } catch (error) {
            console.error("Error adding order:", error);
        }
    };

    const handleSelectExistingProduct = (e) => {
        const ProductId = e.target.value;
        setSelectedProductId(ProductId);

        for(let i = 0; i < existProducts.length; i++){
            if(existProducts[i].id === parseInt(ProductId)){
                setSelectedProductName(existProducts[i].name);
            }
        }
    };


    return (
        <div className='AddOrder_page'>
            <div className='left_side'>
                <NavSide />
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
                            <h2>Location Info:</h2>
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
                            <div>
                                <label>New Product</label>
                                <input
                                    type="checkbox"
                                    checked={isNewProduct}
                                    onChange={() => setIsNewProduct(!isNewProduct)}
                                />
                            </div>
                            {isNewProduct ? (
                                <>
                                    <div className="halftext_feild">
                                        <label>Name</label>
                                        <input
                                            className='half'
                                            type="text"
                                            required
                                            value={productName}
                                            onChange={(e) => setProductName(e.target.value)}
                                        ></input>
                                    </div>
                                    <div className="halftext_feild ">
                                        <label>Description</label>
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
                                        <label>Price</label>
                                        <input
                                            className='Q'
                                            type="number"
                                            required
                                            min={0}
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        ></input>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="halftext_feild">
                                        <label>Product Name</label>
                                        <select
                                            className="half"
                                            value={selectedProductId}
                                            onChange={handleSelectExistingProduct}
                                            required
                                        >
                                            <option value="0">Select product name</option>
                                            {existProducts.map((product) => (
                                                <option key={product.id} value={product.id}>
                                                    {product.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            )}

                            <div className="halftext_feild ">
                                <label>Quantity</label>
                                <input
                                    className='Q'
                                    type="number"
                                    required
                                    min={1}
                                    step={1}
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                ></input>
                            </div>

                            <button className='btn' onClick={handleAddProduct}>+</button>
                            <div className='error'>{error}</div>
                        </div>

                        <div className='display_products'>
                            {newProducts.map((product, index) => (
                                <div className='display_product' key={index}>
                                    <div className='attributes'>
                                        <div><span>Name: </span>{product.productName}</div>
                                        <div><span>Description: </span>{product.description}</div>
                                        <div><span>Category ID: </span>{product.category_id}</div>
                                        <div><span>Quantity: </span>{product.quantity}</div>
                                        <div><span>Price: </span>{product.price}</div>
                                    </div>
                                    <button className='btn' onClick={() => handleDeleteProduct(product.productName)}>Delete</button>
                                </div>
                            ))}

                            {oldProducts.map((product, index) => (
                                 <div className='display_product' key={index}>
                                    <div className='attributes'>
                                        <div><span>Product id: </span>{product.id}</div>
                                        <div><span>Product Name: </span>{product.name}</div>
                                        <div><span>Quantity: </span>{product.quantity}</div>
                                    </div>
                                    <button className='btn' onClick={() => handleDeleteOldProduct(product.id)}>Delete</button>
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