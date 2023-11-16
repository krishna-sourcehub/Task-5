import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {

    document.body.style.overflow = 'hidden';
    document.body.scrollIntoView({
        behavior:'smooth',
        block:'center',
        inline:'center'
    })

    document.body.scrollIntoView({
        behavior:'smooth',
        block:'center',
        inline:'center'
    })



    let navigate = useNavigate();


    const [id, setId] = useState('');
    const [username, setName] = useState("");
    const [password, setpassword] = useState("");


    async function loginUser(event) {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8881/api/users/login', {
                username: username,
                password: password
            });

            if (response.status === 200) {
                // Successful login
                const responseMessage = response.data; // Assuming the response is a string
                const userId = responseMessage.split(": ")[1];// Adjust accordingly to your server response
                // alert(`Login successful! User ID: ${userId}`);
                localStorage.setItem('userid', userId);
                localStorage.setItem('username', username);
                navigate('/')
            } else {
                // Handle unexpected status codes
                alert(`Unexpected status code: ${response.status}`);
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a non-2xx status
                if (error.response.status === 401) {
                    alert('Invalid username or password');
                    document.getElementById("message").style.display = "block";
                    toggleVisibility('message')
                } else {
                    // Handle other HTTP error codes
                    alert(`Server returned an error: ${error.response.status}`);
                }
            } else if (error.request) {
                // The request was made but no response was received (server not reachable)
                alert('Could not connect to the server');
            } else {
                // Something happened in setting up the request that triggered an error
                console.error('Error:', error.message);
            }
        }
    }

    // async function save(event) {
    //     event.preventDefault();
    //     try {
    //         const response = await axios.post("http://localhost:8881/api/users/login",
    //             {
    //                 username: username,
    //                 password: password
    //             });

    //         if (response.status === 200) {
    //         const responseMessage = response.data; // Assuming the response is a string
    //         const userId = responseMessage.split(": ")[1];

    //         if (userId) {
    //             // Display the user ID
    //             alert(`Login successful! User ID: ${userId}`);
    //             localStorage.setItem('userid',userId);
    //             localStorage.setItem('username',username);

    //         } else {
    //             // Handle the case when the user ID is not present
    //             alert('User ID not found in the response.');
    //         document.getElementById("message").style.display = "block";
    //             toggleVisibility('message')
    //         }
    //         alert(`Login successful! User ID: ${userId}`);
    //         navigate('/')

    //     } 
    // else {
    //   // The server is not connected or there's an issue
    //   alert(`Server not reachable. Status code: ${response.status}`);
    // }
    // }

    //     catch (err) {
    //         // alert("Login Failed Check the Server Connection");
    //     }
    // }

    function toggleVisibility(divId) {
        var div = document.getElementById(divId);
        div.style.display = 'block';
    }

    return (
        <div className="body">
            <div className="main" >
                <section className="sign-in">
                    <div className="container1">
                        <div className="signin-content">
                            <div className="signin-image">
                                <figure><img src="images/signin-image.jpg" alt="sing up image" /></figure>
                                <Link to="/Signup" className="signup-image-link">Create an account</Link>
                            </div>

                            <div className="signin-form">
                                <h2 className="form-title" style={{fontFamily:"Raleway, sans-serif", fontSize:"35px", fontWeight:"0.2em"}}>Login</h2>
                                <form method="POST" className="register-form" id="login-form">
                                    <div className="form-group">
                                        <label for="your_name"><i className="zmdi zmdi-account material-icons-name" style={{fontSize:"20px"}}></i></label>
                                        <input type="text" name="your_name" id="usernme" placeholder="Your user name"
                                            value={username}
                                            onChange={(event) => {
                                                setName(event.target.value);
                                            }} />
                                    </div>
                                    <div className="form-group">
                                        <label for="pass"><i className="zmdi zmdi-lock"style={{fontSize:"20px"}} ></i></label>
                                        <input type="password" name="pass" id="password" placeholder="Password" value={password}
                                            onChange={(event) => { setpassword(event.target.value); }} />
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                                        <label for="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                                    </div>
                                    <div className="form-group" id="message" style={{ display: 'none' }}>
                                        {/* <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" /> */}
                                        <label for="remember-me" className="label-agree-term" style={{ color: 'red' }}><span></span><span></span>Check password or username</label>
                                    </div>
                                    <div className="form-group form-button">
                                        <div className="form-group form-button" to="/">
                                            <input type="submit" name="signin" id="signin" className="form-submit" value="Log in" onClick={loginUser} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}

export default Login