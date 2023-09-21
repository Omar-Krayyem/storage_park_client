import './style.css';
import Modal from 'react-modal';
import React, { useState, useEffect }from "react";
import axios from 'axios';
import {AiOutlineClose} from 'react-icons/ai'

const AdminStockModal = ({ openModal, handleCloseModal, id }) => {
    const [company_name, setCompnay] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");


    const token = localStorage.getItem("token");

    const getOrder = async () => {
            await axios.get(`http://127.0.0.1:8000/api/admin/stock/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log(response.data.data)
                setCompnay(response.data.data.user.company_name)
                setName(response.data.data.product.name)
                setCategory(response.data.data.product.category.category)
                setDescription(response.data.data.product.description)
                setQuantity(response.data.data.quantity)
                setPrice(response.data.data.product.price)
            })
            .catch(error => {
                console.log(error);
            });    
    };

    useEffect(() => {
        getOrder();
    }, [id]);

    return (
        <div>
            <Modal isOpen={openModal} className="AdminStockModal"
            style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.75)',
                },
              }}
              >
                <div className='body'>
                <div className='title'>
                    <h1>Stored Product</h1>
                    <AiOutlineClose 
                    onClick={async (e) => {
                        e.preventDefault();
                        handleCloseModal();
                    }}
                    className='icon'
                    size={25}/>
                </div>
                <div className="form_body">
                        <form className='partnerForm'>
                            <div className="text_feild">
                                <label>Company Name</label>
                                <input 
                                className='full'
                                type="email" 
                                name='email'
                                required
                                value={company_name}
                                disabled
                                ></input>
                            </div>
                            <div className="text_feild">
                                <label>Name</label>
                                <input 
                                className='full'
                                type="email" 
                                name='email'
                                required
                                value={name}
                                disabled
                                ></input>
                            </div>
                            <div className="text_feild">
                                <label>Category</label>
                                <input 
                                className='full'
                                type="email" 
                                name='email'
                                required
                                value={category}
                                disabled
                                ></input>
                            </div>
                            <div className="text_feild">
                                <label>Description</label>
                                <input 
                                className='full'
                                type="email" 
                                name='email'
                                required
                                value={description}
                                disabled
                                ></input>
                            </div>
                            <div className='nameSection'>
                            <div className="halftext_feild">
                                <label>Quantity</label>
                                <input 
                                className='full'
                                type="text" 
                                required
                                value={quantity}
                                disabled
                                ></input>
                            </div>
                            <div className="halftext_feild">
                                <label>Price</label>
                                <input 
                                className='full'
                                type="text"
                                required
                                value= {price}
                                disabled
                                ></input> 
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default AdminStockModal;