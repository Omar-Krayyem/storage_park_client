import './style.css';
import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from "react";
import axios from "axios"
import logo from '../../../images/logo_p.png';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/user/userSlice';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const submitForm = async(e) => {
        e.preventDefault()

        const postData = {email, password};

        await axios.post("http://127.0.0.1:8000/api/login", postData)
        .then(response => {
            dispatch(setUser({
                user_name: `${response.data.user.first_name} ${response.data.user.last_name}`,
                token: response.data.authorisation.token,
                user_type: response.data.user.user_type_id,
            }))
            localStorage.setItem("token", response.data.authorisation.token);
            localStorage.setItem("user_name", `${response.data.user.first_name} ${response.data.user.last_name}`);
            localStorage.setItem("user_type", response.data.user.user_type_id);
            let user_type = response.data.user.user_type_id;
                
            if(user_type === 1){
                navigate("/admin");  
                localStorage.setItem("current_page", "dashboard");                  
            }
            else if(user_type === 2){
                navigate("/worker");
                localStorage.setItem("current_page", "dashboard");
            }
            else if(user_type === 3){
                navigate("/partner");
                localStorage.setItem("current_page", "dashboard");
            }
        })
        .catch(error => {
            if (error.response) {
                const { data } = error.response;
                setErrorMessage(data.message || "An error occurred during registration");
            } else {
                setErrorMessage("An error occurred during registration");
            }
        });
    }

    return (
        <div className='LoginPage'>
            <div className='loginComponent'>
                <div className='leftSide'>
                <Link to='/'><img  src={logo} alt="Logo"></img></Link>
                </div>
                <div className='rightSide'>
                    <div className="form_header">
                        <div className='title'>Welcome back!</div>
                        <div className='subTitle'>we can’t wait for you to see what’s new. happy shipping</div>
                    </div>
                    <div className="form_body">
                        <form className='loginForm'>
                            <div className="text_feild">
                                <label>Email</label>
                                <input 
                                type="email" 
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                ></input>
                            </div>
                            <div className="text_feild">
                                <label>Password</label>
                                <input 
                                type="password"
                                required=""
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                ></input> 
                            </div>
                            <div className='error'>{errorMessage}</div>
                            <input type="submit" className="loginBtn" value="login" onClick={submitForm}></input>
                            <div className="form_bottom">Didn't have an account <Link className='linkBtn' to="/register">Get started</Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;