import './style.css';

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

import NavSide from '../../../components/Partner/NavSide';
import Header from '../../../components/Shared/Header';

import CreatableSelect from "react-select/creatable";

import { Map , Marker, Draggable } from "pigeon-maps"
import logo from '../../../images/logo_d.png';



const AddIncomingOrder = () => {
    const name = localStorage.getItem("user_name");
    const token = localStorage.getItem("token");


    const [anchor, setAnchor] = useState([50.879, 4.6997]);
    const [latitude, setLatitude] = useState(anchor[0]);
    const [longitude, setLongitude] = useState(anchor[1]);

    const [markerImage, setMarkerImage] = useState(logo);

    const [newProducts, setNewProducts] = useState([]);

    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [description, setDescription] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);

    const [error, setError] = useState("");

    const [categories, setCategories] = useState([]);
    const [existProducts, setExistProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(0);

    const options = existProducts.map((product) => ({
        value: product.id,
        label: product.name
    }));

    const handleMapClick = ({ latLng }) => {

        console.log('handleMapClick')
        
        const latitudeDigits = parseFloat(latLng[0].toFixed(4));
        const longitudeDigits = parseFloat(latLng[1].toFixed(4));

        setLatitude(latitudeDigits);
        setLongitude(longitudeDigits);

        console.log(latitudeDigits , longitudeDigits)
    };

    // const handleMapDragEnd = ({ anchor }) => {
    //     if (anchor) {
    //         setAnchor(anchor);
    //         setLatitude(anchor[0]);
    //         setLongitude(anchor[1]);
            
    //         const newMarkerImage = `https://example.com/new-marker-image.png`; // Replace with your new marker image URL
    //         setMarkerImage(newMarkerImage);
    //     }
    // };

    const getProducts = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/partner/incoming/products`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setExistProducts(response.data.data.products);
            setCategories(response.data.data.categories)
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const handleAddProduct = (e) => {
        e.preventDefault();

            if (!productName || !price || !quantity || !description || selectedCategoryId === 0) {
                setError("Please fill in all fields.");
                return;
            }

            const newProduct = {
                id: selectedProductId,
                productName,
                description,
                product_category_id: parseInt(selectedCategoryId),
                price: +price,
                quantity: +quantity,
            };

            console.log(newProduct);

            setNewProducts([...newProducts, newProduct]);

            

            // Reset form fields
            setProductName("");
            setPrice(0);
            setQuantity(1);
            setDescription("");
            setSelectedCategoryId(0);
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
            setError("Please fill in all input fields.");
            return;
        }

        if (newProducts.length === 0) {
            setError("There are no products");
            return;
        }

        try {
            await axios.post(`http://127.0.0.1:8000/api/partner/incoming/placed/create`, {
                latitude,
                longitude,
                newProducts,
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

    const handleChange = (selectedOption) => {

        if(selectedOption.value === selectedOption.label){
            console.log('new')
            setProductName(selectedOption.label)
            setPrice(0);
            setQuantity(1);
            setDescription("");
            setSelectedCategoryId(0);
            setError("");
            setSelectedProductId(0)
        }
        else{
            setSelectedProductId(selectedOption.value);

            for(let i = 0; i < existProducts.length; i++){
                if(existProducts[i].id === selectedOption.value){
                    setProductName(existProducts[i].name);
                    setDescription(existProducts[i].description);
                    setPrice(existProducts[i].price);
                    setSelectedCategoryId(existProducts[i].category.id);
                    // setSelectedCategoryName(existProducts[i].category.name);
                    // options(null);
                }
            }
        }
        
    };


    return (
        <div className='AddOrder_page'>
            {/* <div className='left_side'>
                <NavSide />
            </div>
            <div className='right_side'>
                <div className='head'>
                    <Header name={name} />
                </div> */}
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
                                    disabled
                                ></input>
                            </div>
                            <div className="halftext_feild ">
                                <label>Longitude</label>
                                <input
                                    className='half'
                                    type="text"
                                    required
                                    value={longitude}
                                    disabled
                                ></input>
                            </div>
                        </div>
                        <div className='mapContainer'>
                            <Map height={300} 
                            defaultCenter={[latitude, longitude]} 
                            defaultZoom={13} 
                            onClick={handleMapClick}
                            >
                                <Marker width={40} anchor={[latitude, longitude]} />
                            </Map>
                            {/* <Map height={300} defaultCenter={[50.879, 4.6997]} defaultZoom={11}>
                                <Draggable offset={[60, 87]} anchor={anchor} onDragEnd={handleMapDragEnd}>
                                    <img src={logo} width={55} height={55} alt="Pigeon!" />
                                </Draggable>
                            </Map> */}
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
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.category}
                                                </option>
                                            ))}
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
                                        {categories.map((category) => {
                                            if (product.product_category_id === category.id) {
                                                return (
                                                    <div key={category.id}>
                                                        <span>Category: </span>{category.category}
                                                    </div>
                                                );
                                            }
                                        })}
                                        <div><span>Price: </span>{product.price}</div>
                                        <div><span>Quantity: </span>{product.quantity}</div>
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
            {/* </div> */}
        </div>
    );
}

export default AddIncomingOrder;