import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Signup = () => {
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

    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Update every second

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array means this effect runs once on mount

    // Extracting date and time
    const currentDate = currentDateTime.toLocaleDateString();
    const currentTime = currentDateTime.toLocaleTimeString();
    const currentISTTime = currentDateTime.toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
        timeStyle: 'short',
    });

    let navigate = useNavigate();


    const [id, setId] = useState('');
    const [username, setName] = useState("");
    const [password, setpassword] = useState("");
    const [repeatpassword, setrepeatpassword] = useState("");
    const [email, setemail] = useState("");
    const [terms, setterms] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    var mobile;

    var wallet = 100;

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };


    const checkPassword = () => {
        // Check if the password has at least 8 characters
        if (password.length >= 8) {
            return true;
            console.log('Password is valid!');

        } else {
            alert('Password must have at least 8 characters.');
        }
    };



    function ValidateEmail(mail) {
        console.log('Email validation called');
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        alert("You have entered an invalid email address!")
        return (false)
    }


    function validname(name) {
        console.log('Sender Name validation called');
        const isValidInput = /^[a-zA-Z ]+$/.test(name);

        if (isValidInput) {
            // Proceed with your logic for a valid input
            console.log('Input Name is a valid Name');
            return true;
        } else {
            // Handle the case for an invalid input
            alert('Enter a Name');
            // You can show an error message or take other actions
        }
    }

    function policy() {
        if (password == repeatpassword) {
            return true;
        }
        else {
            alert("Check Password and repeated Password");
        }
    }


    function term() {
        if (isChecked == true) {
            return true
        }
        else {

            alert(" Accept the Terms and Conditions ");
        }
    }


    function generateMobile() {
        // Generate a random 4-digit OTP
        return Math.floor(10000000 + Math.random() * 9000000).toString();
    }


    function generateAccount() {
        // Generate a random 4-digit OTP
        return Math.floor(10000000000 + Math.random() * 900000000000).toString();
    }


    function multifunctioncall() {
        console.log(password);
        console.log(isChecked);
        const isValid =
            validname(username) &&
            ValidateEmail(email) &&
            checkPassword() &&
            policy() &&
            term();

        if (isValid) {
            // All functions returned true, proceed with your logic
            console.log('All validations passed. Proceeding with logic...');
            signInUser();
            // Call another function or perform additional actions
        } else {
            // At least one function returned false, handle accordingly
            console.log('Validation failed. Check console for details.');

        }
    }

    

    async function signInUser(event) {
        const account=generateAccount();
         mobile="+9197"+generateMobile();
       
        try {
            const response = await axios.post('http://localhost:8881/api/users/saveuser', {
                username: username,
                password: password,
                email: email,
                wallet:wallet,
                phonenumber:mobile,
                account:account
            });

            if (response.status === 200) {
                // Successful login
                const responseMessage = response.data;
                transaction(); // Assuming the response is a string
                sendmail();
                navigate('/Login')
            } else {
                // Handle unexpected status codes
                alert(`Unexpected status code: ${response.status}`);
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a non-2xx status
                if (error.response.status === 409) {
                    alert('Username already exists!, Please try another username');
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
var type="Wallet Transfer"
    async function transaction() {
        try {
            await axios.post("http://localhost:8881/api/users/saveUserDetails",
                {
                    username: username,
                    from: username,
                    to: "wallet",
                    email: email,
                    wallet: wallet,
                    type:type,
                    description:"Wallet PrePaid Balance",
                    date:currentDate,
                    time:currentISTTime,
                    amount:wallet,
                    mobile:mobile,
                    status:"Sucess"
                });

            console.log("user Register  Successfully");
            navigate("/Login")

        }
        catch (err) {
            alert("Sign UP Failed , Check Server");
        }

    }

    async function sendmail() {
        var subject = "Welcome To EsayPay Express";
        var body =`
        Dear ${username},\n
        A warm welcome to EasyPay Express! 🌟 Get ready for a seamless and secure money transfer experience.
        We're thrilled to have you on board. If you have any questions, feel free to reach out.
        Best regards,
        EasyPay Express Team`
        try {
            await axios.post(
                "http://localhost:8881/api/email/send",
                {
                    recipient: email,
                    subject: body,
                    body: subject
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any other required headers here
                    }
                }
            );

            alert(" Welcome mail Send Successfully ");
        } catch (err) {
            alert("Email send Failed, Please check sever");
        }
    }

    function toggleVisibility(divId) {
        var div = document.getElementById(divId);
        div.style.display = 'block';
    }

    return (
        <div className='body'>
            <div className="main">
                <section className="signup">
                    <div className="container1">
                        <div className="signup-content">
                            <div className="signup-form">
                                <h2 className="form-title" style={{fontFamily:"Raleway, sans-serif", fontSize:"35px", fontWeight:"0.2em"}}>Sign up</h2>
                                <form1 method="POST" className="register-form" id="register-form">
                                    <div className="form-group">
                                        <label for="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                        <input type="text" name="name" id="name" placeholder="Your Name" value={username}
                                            onChange={(event) => {
                                                setName(event.target.value);
                                            }} />
                                    </div>
                                    <div className="form-group">
                                        <label for="email"><i className="zmdi zmdi-email"></i></label>
                                        <input type="email" name="email" id="email" placeholder="Your Email" value={email}
                                            onChange={(event) => {
                                                setemail(event.target.value);
                                            }} />
                                    </div>
                                    <div className="form-group">
                                        <label for="pass"><i className="zmdi zmdi-lock"></i></label>
                                        <input type="password" name="pass" id="pass" placeholder="Password"
                                            value={password}
                                            onChange={(event) => {
                                                setpassword(event.target.value);
                                            }} />
                                    </div>
                                    <div className="form-group">
                                        <label for="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                                        <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password"
                                            value={repeatpassword}
                                            onChange={(event) => {
                                                setrepeatpassword(event.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox" name="agree-term" id="agree-term" className="agree-term"
                                            checked={isChecked}
                                            onChange={handleCheckboxChange} />
                                        <label for="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in <a href="/Terms" target='blank'>Terms of service</a></label>
                                    </div>

                                    <div className="form-group form-button">
                                        <div className="form-group form-button" to="/Login">
                                            <input type="submit" name="signup" id="signup" className="form-submit" value="Register" onClick={multifunctioncall} />
                                        </div>
                                    </div>
                                </form1>
                            </div>
                            <div className="signup-image">
                                <figure><img src="images/signup-image.jpg" alt="sing up image" /></figure>
                                <Link to="/Login" className="signup-image-link">I am already member</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Signup