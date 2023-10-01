import './style.css';
import {MdDelete} from 'react-icons/md'
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import CreatableSelect from "react-select/creatable";
import { Map , Marker } from "pigeon-maps"

const AddIncomingOrder = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [anchor, setAnchor] = useState([50.879, 4.6997]);
    const [latitude, setLatitude] = useState(anchor[0]);
    const [longitude, setLongitude] = useState(anchor[1]);
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
        const latitudeDigits = parseFloat(latLng[0].toFixed(4));
        const longitudeDigits = parseFloat(latLng[1].toFixed(4));
        setLatitude(latitudeDigits);
        setLongitude(longitudeDigits);
    };

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
                setError("Please fill all fields.");
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

            setNewProducts([...newProducts, newProduct]);
            
            setProductName("");
            setPrice(0);
            setQuantity(1);
            setDescription("");
            setSelectedCategoryId(0);
            setError("");
            setSelectedProductId(0);
           
    };
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
            navigate('/partner/incoming');
        } catch (error) {
            console.error("Error adding order:", error);
        }
    };

    const handleChange = (selectedOption) => {

        if(selectedOption.value === selectedOption.label){
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
                }
            }
        }
        
    };

    return (
            <div className='AddIncoming_page'>
                <div className='body'>
                    <div className='title'>
                        <div className='page_title'><h1>Place New Order</h1></div>
                        <div className='right_title'>
                            <Link to={'/partner/incoming'}><button>Back</button></Link>
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
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        ></input>
                                    </div>

                                    <div className="halftext_feild">
                                        <label>Category</label>
                                        <select
                                            className="input half"
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
                                            className='input Q'
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
                                    className='input Q'
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
                        {newProducts.length > 0 && (
                        <div className='table'>
                            <table className='AddIncoming_table'>
                                <thead className='AddIncoming_thead'>
                                    <tr className=''>
                                        <th className='AddIncoming_th top_left'>Name</th>
                                        <th className='AddIncoming_th'>Descritpion</th>
                                        <th className='AddIncoming_th'>Category</th>
                                        <th className='AddIncoming_th'>Price $</th>
                                        <th className='AddIncoming_th'>Quantity</th>
                                        <th className='AddIncoming_th top_right'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newProducts.map((product, index) => (
                                        <tr className='AddIncoming_tr'>
                                            <td className='AddIncoming_td'>{product.productName}</td>
                                            <td className='AddIncoming_td'>{product.description}</td>
                                            <td className='AddIncoming_td'>{categories.map((category) => {
                                                if (product.product_category_id === category.id) {
                                                    return (
                                                        <div key={category.id}>
                                                        {category.category}
                                                        </div>
                                                    );
                                                }
                                            })}</td>
                                            <td className='AddIncoming_td'>{product.price}</td>
                                            <td className='AddIncoming_td'>{quantity}</td>
                                            <td>
                                            <MdDelete 
                                                onClick={() => handleDeleteProduct(product.productName)}
                                                className='AddIncoming_svg'
                                                size={20}/>
                                            </td>
                                        </tr>
                                    ))} 
                                </tbody>
                            </table>
                        </div>)}

                        
                    </div>

                    
                    <div className='placebutton'>
                        <button onClick={handleAddOrder}>Place Order</button>
                    </div>
                </div>
            </div>        
    );
}

export default AddIncomingOrder;