import './style.css';
import {MdDelete} from 'react-icons/md'

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

import CreatableSelect from "react-select/creatable";

import { Map , Marker } from "pigeon-maps"

const AddOutgoingOrder = () => {
    const token = localStorage.getItem("token");
    const [anchor, setAnchor] = useState([50.879, 4.6997]);
    const [latitude, setLatitude] = useState(anchor[0]);
    const [longitude, setLongitude] = useState(anchor[1]);
    const [newProducts, setNewProducts] = useState([]);
    

    const [ customerName, setCustomerName] = useState("");
    const [ customerEmail, setCustomerEmail] = useState("");
    const [ customerPhone, setCustomerPhone] = useState("");

    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(0);

    const [maxQuantity, setMaxQuantity] = useState(1);

    const [error, setError] = useState("");
    const [existProducts, setExistProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(0);
    const options = existProducts.map((product) => ({
        value: product.product.id,
        label: product.product.name
    }));

    const handleMapClick = ({ latLng }) => {

        console.log('handleMapClick')
        
        const latitudeDigits = parseFloat(latLng[0].toFixed(4));
        const longitudeDigits = parseFloat(latLng[1].toFixed(4));

        setLatitude(latitudeDigits);
        setLongitude(longitudeDigits);

        console.log(latitudeDigits , longitudeDigits)
    };

    const getProducts = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/partner/outgoing/products`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data.data)
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

            if (!productName || !price || !quantity || !description || !category) {
                setError("Please fill all fields.");
                return;
            }

            const productExists = newProducts.some((product) => product.id === selectedProductId);

            if (productExists) {
                setError("This product is already added.");
                return;
            }

            const newProduct = {
                id: selectedProductId,
                productName,
                description,
                category: category,
                price: +price,
                quantity: +quantity,
            };

            console.log(newProduct);

            setNewProducts([...newProducts, newProduct]);
            
            setProductName("");
            setPrice(0);
            setQuantity(1);
            setDescription("");
            setCategory("");
            setError("");
            setSelectedProductId(0);
           
    };
    console.log(newProducts);
    const handleDeleteProduct = (productNameToDelete) => {
        const updatedProducts = newProducts.filter(product => product.productName !== productNameToDelete);
        setNewProducts(updatedProducts);
    };

    const handleAddOrder = async () => {
        if (!latitude || !longitude) {
            setError("Please fill all input fields.");
            return;
        }

        if (newProducts.length === 0) {
            setError("There are no products");
            return;
        }

        if (!/^\d+$/.test(customerPhone)) {
            setError("Phone number should contain only numbers");
            return;
        }

        try {
            await axios.post(`http://127.0.0.1:8000/api/partner/outgoing/placed/create`, {
                latitude,
                longitude,
                customerName,
                customerEmail,
                customerPhone,
                items : newProducts,


            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            window.location.href = '/partner/outgoing/placed';
        } catch (error) {
            console.error("Error adding order:", error);
        }
    };

    console.log(newProducts)

    const handleChange = (selectedOption) => {
        for(let i = 0; i < existProducts.length; i++){
            if(existProducts[i].product.id === selectedOption.value){
                setSelectedProductId(existProducts[i].product.id)
                setProductName(existProducts[i].product.name);
                setDescription(existProducts[i].product.description);
                setPrice(existProducts[i].product.price);
                setCategory(existProducts[i].product.category.category);
                setMaxQuantity(existProducts[i].quantity);
                setQuantity(1);
            }
        }        
    };


    return (
        <div className='AddOutgoing_page'>
                <div className='body'>
                    <div className='title'>
                        <div className='page_title'><h1>Place New Outgoing Order</h1></div>
                        <div className='right_title'>
                            <Link to={'/partner/outgoing/placed'}><button>Back</button></Link>
                        </div>
                    </div>

                    <div className='customer_section'>
                        <h2>Customer Info:</h2>
                        <div className="halftext_feild ">
                            <label>Name</label>
                            <input
                                className='input half'
                                type="text"
                                required
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            ></input>
                        </div>
                        <div className="halftext_feild ">
                            <label>Email</label>
                            <input
                                className='input half'
                                type="text"
                                required
                                value={customerEmail}
                                onChange={(e) => setCustomerEmail(e.target.value)}
                            ></input>
                        </div>
                        <div className="halftext_feild ">
                            <label>Phone</label>
                            <input
                                className='input half'
                                type="text"
                                required
                                value={customerPhone}
                                onChange={(e) => setCustomerPhone(e.target.value)}
                            ></input>
                        </div>

                    </div>

                    <div className='location_section'>
                        <h2>Select Order Location:</h2>
                        <div className='mapContainer'>
                            <Map height={300} 
                            defaultCenter={[latitude, longitude]} 
                            defaultZoom={13} 
                            onClick={handleMapClick}
                            >
                                <Marker width={40} anchor={[latitude, longitude]} />
                            </Map>
                        </div>
                    </div>

                    <div className='products_section'>
                        <h2>Order Items:</h2>

                        <div className='product_section'>
                                    <div className="halftext_feild">
                                        <label>Name</label>
                                        <CreatableSelect
                                        options={options}
                                        onChange={handleChange}
                                        className='creatableSelect'
                                        placeholder= "product name"
                                        isSearchable
                                        />
                                    </div>
                                    <div className="halftext_feild ">
                                        <label>Description</label>
                                        <input
                                            className='input half'
                                            type="text"
                                            required
                                            disabled
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        ></input>
                                    </div>
                                    <div className="halftext_feild ">
                                        <label>Category</label>
                                        <input
                                            className='input half'
                                            type="text"
                                            required
                                            disabled
                                            value={category}
                                        ></input>
                                    </div>
                                    <div className="halftext_feild ">
                                        <label>Price</label>
                                        <input
                                            className='input Q'
                                            type="number"
                                            required
                                            min={0}
                                            disabled
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        ></input>
                                    </div>

                            <div className="halftext_feild ">
                                <label>Quantity</label>
                                <input
                                    className='input Q'
                                    type="number"
                                    required
                                    min={1}
                                    max={maxQuantity}
                                    step={1}
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                ></input>
                            </div>

                            <button className='btn' onClick={handleAddProduct}>+</button>
                            
                        </div>
                        {newProducts.length > 0 && (
                        <div className='table'>
                            <table className='AddOutgoing_table'>
                                <thead className='AddOutgoing_thead'>
                                    <tr className=''>
                                        <th className='AddOutgoing_th top_left'>Name</th>
                                        <th className='AddOutgoing_th'>Descritpion</th>
                                        <th className='AddOutgoing_th'>Category</th>
                                        <th className='AddOutgoing_th'>Price $</th>
                                        <th className='AddOutgoing_th'>Quantity</th>
                                        <th className='AddOutgoing_th top_right'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newProducts.map((product, index) => (
                                        <tr className='AddOutgoing_tr'>
                                            <td className='AddOutgoing_td text_align'>{product.productName}</td>
                                            <td className='AddOutgoing_td text_align'>{product.description}</td>
                                            <td className='AddOutgoing_td text_align'>{product.category}</td>
                                            <td className='AddOutgoing_td text_align'>{product.price}</td>
                                            <td className='AddOutgoing_td text_align'>{product.quantity}</td>
                                            <td>
                                            <MdDelete 
                                                onClick={() => handleDeleteProduct(product.productName)}
                                                className='AddOutgoing_svg'
                                                size={20}/>
                                            </td>
                                        </tr>
                                    ))} 
                                </tbody>
                            </table>
                        </div>)}

                        
                    </div>

                    <div className='error'>{error}</div>
                    <div className='placebutton'>
                        <button onClick={handleAddOrder}>Place Order</button>
                    </div>
                </div>
        </div>
    );
}

export default AddOutgoingOrder;