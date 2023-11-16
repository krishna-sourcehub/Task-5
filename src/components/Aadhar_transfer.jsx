
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Aadhar_Transfer = () => {
    const displayvalue = true;
    const display = localStorage.getItem('displayvalue');

    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);
    const currentDate = currentDateTime.toLocaleDateString();
    const currentTime = currentDateTime.toLocaleTimeString();
    const currentISTTime = currentDateTime.toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
        timeStyle: 'short',
    });

    let navigate = useNavigate();
    const [recipientName, setRecipientName] = useState('');
    const [recipientAccount, setAccountNumber] = useState('');
    const [recipientNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [senderName, setsenderName] = useState('');
    const [senderAccount, setsenderAccountNumber] = useState('');
    const [senderMail, setSenderMail] = useState('');
    const [senderNumber, setsenderNumber] = useState('');
    const [otp, setOTP] = useState(generateOTP());
    const [userInput, setUserInput] = useState('');
const user=localStorage.getItem('username');




    function generateRandomId() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomId = '';

        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomId += characters.charAt(randomIndex);
        }

        return randomId;
    }

    // Example usage:
    const randomId = generateRandomId();
    console.log(randomId);

    // validation Part
    function ValidateEmail(mail) {
        console.log('Email validation called');
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(senderMail)) {
            return (true)
            return true;
        }
        alert("You have entered an invalid email address!")
        return (false)
    }

    function validAmount(amount) {
        console.log('Amount validation called');
        const isValidInput = /^(?=.*\d)\d*(?:\.\d{1,})?$/.test(amount);

        if (isValidInput) {
            // Proceed with your logic for a valid input
            console.log('Valid Input Amount ');
            return true;
        } else {
            // Handle the case for an invalid input
            alert('Check the Input Amount');
            // You can show an error message or take other actions
        }

    }

    function validSendername(name) {
        console.log('Sender Name validation called');
        const isValidInput = /^[a-zA-Z ]+$/.test(name);

        if (isValidInput) {
            // Proceed with your logic for a valid input
            console.log('Input SenderName is a valid Name');
            return true;
        } else {
            // Handle the case for an invalid input
            alert('Enter a valid Sender Name');
            // You can show an error message or take other actions
        }
    }

    function validateRecipientname(name) {
        console.log('Recipient name validation called');
        const isValidInput = /^[a-zA-Z ]+$/.test(name);

        if (isValidInput) {
            // Proceed with your logic for a valid input
            console.log('Enter the Recipient Name');
            return true;
        } else {
            // Handle the case for an invalid input
            alert('Enter a valid Recipient Name');

            // You can show an error message or take other actions
        }
    }


     function Senderphonechange1(inputValue) {
        console.log('Sender Phone number validation called');

        // Proceed with your normal logic
        const isValidNumber = /^\d{10}$/.test(inputValue);

        if (isValidNumber) {
            console.log("Valid Sender phone number");
            return true;

            // Your further logic for a valid number
        } else {
            alert("Invalid Sender phone number");
            // Your error handling logic for an invalid number
        }


    }


    function Recipientphonechange1(inputValue) {
        console.log('Recipent Phone number validation called');

        // Proceed with your normal logic
        const isValidNumber = /^\d{10}$/.test(inputValue);

        if (isValidNumber) {
            console.log("Recipient Phone Number  valid");
            return true;
            // Your further logic for a valid number
        } else {
            alert("Invalid Recipient phone number");
            // Your error handling logic for an invalid number
        }


    }







    function validatesenderAccount(inputValue) {
        const isValidInput = /^\d{10}$/.test(inputValue);
        console.log('Sender Aadhar validation called');
        if (isValidInput) {

            console.log(' Sender Aadhar a valid 10-digit number');
            return true;
        } else {
            alert('Sender Aadhar is not a valid 10-digit number');
        }
    }

    function validateRecipientAccount(inputValue) {
        const isValidInput = /^\d{10}$/.test(inputValue);

        if (isValidInput) {
            console.log(' Recipient Aadhar a valid 10-digit number');
            return true;
        } else {
            alert('Recipient Aadhar is not a valid 10-digit number');
        }
    }

    function multifunctioncall() {
        const isValid =
            validateRecipientname(recipientName) &&
            validateRecipientAccount(recipientAccount) &&
            Recipientphonechange1(recipientNumber) &&
            validAmount(amount) &&
            validSendername(senderName) &&
            validatesenderAccount(senderAccount) &&
            Senderphonechange1(senderNumber) &&
            ValidateEmail(senderMail);


        if (isValid) {
            // All functions returned true, proceed with your logic
            console.log('All validations passed. Proceeding with logic...');
            sendOtp();
            localStorage.setItem('displayvalue', displayvalue);
            // Call another function or perform additional actions
        } else {
            // At least one function returned false, handle accordingly
            console.log('Validation failed. Check console for details.');
        }
    }


    function generateOTP() {
        // Generate a random 4-digit OTP
        return Math.floor(1000 + Math.random() * 9000).toString();
    }

    const sendOtp = async () => {



        const newOTP = generateOTP();
        setOTP(newOTP);
        console.log('Generated OTP:', newOTP);

        // Construct the message
        const otpMessage = `\nYour Transaction OTP: ${newOTP}\nDon't share it, code is valid for 15 minutes`;
        alert("trail, Your OTP: " + newOTP);
        try {
            // Send OTP via API
            await axios.post(
                "http://localhost:8881/api/v1/sms",
                {
                    phoneNumber: "+91" + senderNumber,  // Make sure senderNumber is defined
                    message: otpMessage,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any other required headers here
                    },
                }
            );

            alert("OTP sent successfully");
        } catch (err) {
            alert("OTP send failed, please check Server");
        }
    };



    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };


    const pay = () => {
        if (userInput === otp) {
            console.log(otp);
            alert('OTP is valid!');
            sendmoney();
            save();
            sendmail();
            localStorage.removeItem('displayvalue');
            navigate('/Sucess');
        } else {
            alert('Invalid OTP. Please try again.');
        }
    }





    const sendmoney = async () => {
        // Construct the message
        const moneyMessage = `\n\nDear Customer,\n INR ${amount} Credit to your Aadhar No: ${recipientAccount} on ${currentDate}, through EasyPay Express. `;
        try {
            // Send OTP via API
            await axios.post(
                "http://localhost:8881/api/v1/sms",
                {
                    phoneNumber: "+91" + recipientNumber,  // Make sure senderNumber is defined
                    message: moneyMessage,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any other required headers here
                    },
                }
            );

            alert("Recipient SMS send successfully");
        } catch (err) {
            alert("Recipient SMS send failed, please check Server");
        }
    };


    var type = "Aadhar Transfer"

    async function save(event) {

        try {
            await axios.post("http://localhost:8881/api/users/saveUserDetails",
                {
                    username: user,
                    from: senderName,
                    to: recipientName,
                    date: currentDate,
                    time: currentISTTime,
                    mobile: senderNumber,
                    description: shortDescription,
                    type: type,
                    amount: amount,
                    senderaccount: senderAccount,
                    receiveraccount: recipientAccount,
                    sendermail: senderMail,
                    status: "Sucess"

                });
            alert("Save User Details Successfully");

        }
        catch (err) {
            alert("Save details  Failed, please check sever");
            document.getElementById("message").style.display = "block";
            toggleVisibility('message')


        }
    }


    async function sendmail() {

        var subject = "Money Transfer Acknowledgement";
        var body = "Hello " + senderName + ",\nYour Last Transaction Status:\nDate: " + currentDate + "\nTime: " + currentISTTime + "\nSender Name: " + senderName + "\nSender Aadhar: " + senderAccount + "\nSender Number: " + senderNumber + "\nRecipent Name: " + recipientName + "\nRecipent Aadhar: " + recipientAccount + "\nAmount: " + amount + "\nType: " + type + "\nDescription: " + shortDescription + "\nStatus: Success";
        try {
            await axios.post(
                "http://localhost:8881/api/email/send",
                {
                    recipient: senderMail,
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

            alert("Send Email Successfully");
        } catch (err) {
            alert("Email send Failed, Please check sever");
        }


    }

    function toggleVisibility(divId) {
        var div = document.getElementById(divId);
        div.style.display = 'block';
    }
    document.body.style.overflow = 'hidden';
    document.body.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
    })
    return (
        <div>
            <section className="homepage_tab position-relative" >
                <div className="section1 container" style={{ marginTop: "80px" }}>
                    <div className="row1 justify-content-center">
                        <div className="col-lg-8 mb-4">
                            <div className="section-title1 text-center">
                                <p className="text-primary text-uppercase fw-bold mb-3" style={{ fontSize: "20px" }}>Domestic Services</p>
                                <h1>Aadhar Transfer</h1>
                            </div>
                        </div>
                        <div className="col-lg-10">
                            <ul className="payment_info_tab nav nav-pills justify-content-center mb-4" id="pills-tab" role="tablist">
                                <li className="nav-item m-2" role="presentation"> <a
                                    className="nav-link btn1 btn1-outline-primary effect-none text-dark active" id="pills-how-much-can-i-recive-tab"
                                    data-bs-toggle="pill" href="#pills-how-much-can-i-recive" role="tab"
                                    aria-controls="pills-how-much-can-i-recive" aria-selected="true">RECEIVER INFO</a>
                                </li>
                                <li className="nav-item m-2" role="presentation"> <a
                                    className="nav-link btn1 btn1-outline-primary effect-none text-dark " id="pills-how-much-does-it-costs-tab1"
                                    data-bs-toggle="pill" href="#pills-how-much-does-it-costs" role="tab"
                                    aria-controls="pills-how-much-does-it-costs" aria-selected="true">SENDER INFO</a>
                                </li>
                                <li className="nav-item m-2" role="presentation"> <a
                                    className="nav-link btn1 btn1-outline-primary effect-none text-dark " id="pills-how-do-i-repay-tab"
                                    data-bs-toggle="pill" href="#pills-how-do-i-repay" role="tab" aria-controls="pills-how-do-i-repay"
                                    aria-selected="true">CONFIRMATION</a>
                                </li>
                            </ul>
                            <div className="rounded shadow bg-white p-5 tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-how-much-can-i-recive" role="tabpanel"
                                    aria-labelledby="pills-how-much-can-i-recive-tab">
                                    <div className="row1 align-items-center">
                                        <div className="col-md-6 order-1 order-md-0">
                                            <div className="content-block">
                                                <h3 className="mb-4"><b>RECEIVER INFO</b></h3>
                                                <div style={{ marginTop: "76px" }}> <div className="form-group">
                                                    <label for="your_name" ><i style={{ fontSize: "32px" }} className="zmdi zmdi-account material-icons-name "></i></label>
                                                    <input type="text" name="recipientName" id="usernme" placeholder="Enter the Recipient Name" style={{ width: "400px" }}
                                                        value={recipientName}
                                                        onChange={(event) => {
                                                            setRecipientName(event.target.value);
                                                        }} required />
                                                </div>
                                                    <div className="form-group">
                                                        <label for="your_name" ><i style={{ fontSize: "22px" }} className="fa fa-500px "></i></label>
                                                        <input type="text" name="recipientAccount" id="usernme" placeholder="Enter the Recipient Aadhar Number" style={{ width: "400px" }}
                                                            value={recipientAccount}
                                                            onChange={(event) => {
                                                                setAccountNumber(event.target.value);
                                                            }} required />
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="your_name" ><i style={{ fontSize: "22px" }} className="fa fa-phone material-icons-name "></i></label>
                                                        <input type="tel" name="recipientNumber" id="usernme" placeholder="Enter the Recipient Phone Number" style={{ width: "400px" }}
                                                            value={recipientNumber}
                                                            onChange={(event) => { setPhoneNumber(event.target.value); }} required />

                                                    </div>
                                                    <div className="form-group">
                                                        <label for="your_name" ><i style={{ fontSize: "22px" }} className="fa fa-money material-icons-name "></i></label>
                                                        <input type="text" name="amount" id="usernme" placeholder="Enter the Amount" style={{ width: "400px" }}
                                                            value={amount}
                                                            onChange={(event) => {
                                                                setAmount(event.target.value);
                                                            }


                                                            } required />
                                                    </div>

                                                    <div className="form-group">
                                                        <label for="your_name" ><i style={{ fontSize: "22px" }} className="fa fa-sticky-note material-icons-name "></i></label>
                                                        <input type="text" name="shortDescription" id="usernme" placeholder="Enter Short description" style={{ width: "400px" }}
                                                            value={shortDescription}
                                                            onChange={(event) => {
                                                                setShortDescription(event.target.value);
                                                            }} />
                                                    </div></div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 order-0 order-md-1 mb-5 mt-md-0">
                                            <div className="image-block text-center">
                                                <img loading="lazy" decoding="async"
                                                    src="theme\images/illustration-1.png" alt="How Much Can I Recive?" className="img-fluid" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade " id="pills-how-much-does-it-costs" role="tabpanel"
                                    aria-labelledby="pills-how-much-does-it-costs-tab">
                                    <div className="row1 align-items-center">
                                        <div className="col-md-6 order-1 order-md-0">
                                            <div className="content-block">
                                                <h3 className="mb-4"><b>SENDER INFO</b></h3>
                                                <div style={{ marginTop: "76px" }}>  <div className="form-group">
                                                    <label for="your_name" ><i style={{ fontSize: "32px" }} className="zmdi zmdi-account material-icons-name "></i></label>
                                                    <input type="text" name="senderName" id="usernme" placeholder="Enter the Sender Name" style={{ width: "400px" }}
                                                        value={senderName}
                                                        onChange={(event) => {
                                                            setsenderName(event.target.value);
                                                        }} required />
                                                </div>
                                                    <div className="form-group">
                                                        <label for="your_name" ><i style={{ fontSize: "22px" }} className="fa fa-500px"></i></label>
                                                        <input type="number" name="senderAccountNumber" id="usernme" placeholder="Enter the Sender Aadhar Number" style={{ width: "400px" }}
                                                            value={senderAccount}
                                                            onChange={(event) => {
                                                                setsenderAccountNumber(event.target.value);

                                                            }} required />
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="your_name" ><i style={{ fontSize: "22px" }} className="fa fa-phone material-icons-name "></i></label>
                                                        <input type="tel" name="senderNumber" id="usernme" placeholder="Enter the Sender Phone Number" style={{ width: "400px" }}
                                                            value={senderNumber}
                                                            onChange={(event) => {
                                                                setsenderNumber(event.target.value);
                                                            }} required />

                                                    </div>
                                                    <div className="form-group">
                                                        <label for="your_name" ><i style={{ fontSize: "22px" }} className="fa fa-envelope"></i></label>
                                                        <input type="email" name="senderMail" id="usernme" placeholder="Enter the Mail" style={{ width: "400px" }}
                                                            value={senderMail}
                                                            onChange={(event) => {
                                                                setSenderMail(event.target.value);
                                                            }} required />
                                                    </div></div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 order-0 order-md-1 mb-5 mt-md-0">
                                            <div className="image-block text-center">
                                                <img loading="lazy" decoding="async" src="theme\images/illustration-2.png" alt="How Much Does It Costs?" className="img-fluid" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade " id="pills-how-do-i-repay" role="tabpanel"
                                    aria-labelledby="pills-how-do-i-repay-tab">

                                    <div className="row1 align-items-center">
                                        <h3 className="mb-4"><b>CONFIRMATION</b><br /></h3>
                                        <div className="col-md-6 order-1 order-md-0">
                                            <div>Recipient Name <span style={{ paddingRight: "62px" }}></span> : {recipientName}</div>
                                            <div>Recipient Aadhar <span style={{ paddingRight: "54px" }}></span>: {recipientAccount}</div>
                                            <div>Recipient Phone Number : {recipientNumber}</div>
                                            <div>Description<span style={{ paddingRight: "90px" }}></span> : {shortDescription}</div>
                                            <div>Sender Name <span style={{ paddingRight: "76px" }}></span>: {senderName}</div>
                                            <div>Sender Aadhar <span style={{ paddingRight: "68px" }}></span>: {senderAccount}</div>
                                            <div>Sender Mail<span style={{ paddingRight: "86px" }}></span> : {senderMail}</div>
                                            <div>Sender Phone Number<span style={{ paddingRight: "14px" }}></span> : {senderNumber}</div>
                                            <div>Amount <span style={{ paddingRight: "112px" }}></span>: {amount}</div>
                                            <div style={{ display: "flex", gap: "10px" }}>
                                                {" "}
                                                <div style={{ marginTop: "24px" }}>Enter OTP<span style={{ paddingRight: "100px" }} />  :</div>
                                                <div>
                                                    {" "}
                                                    <input
                                                        type="text"
                                                        placeholder="Enter OTP"
                                                        value={userInput}
                                                        onChange={handleUserInput}
                                                        style={{
                                                            marginLeft: "10px",
                                                            "margin-top": "12px",
                                                            width: "140px",
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <br />

                                            <div>
                                                <input type="submit" name="signin" id="signin" className="form-submit" value="CONFIRM" onClick={multifunctioncall} style={{ "margin-right": "110px", "margin-left": "40px" }} /> <span></span>
                                                {display ? <><input type="submit" name="signin" id="signin" className="form-submit" value="PAY" onClick={pay} style={{ margin: "0px" }} /></> : <></>}</div>


                                        </div>
                                        <div className="col-md-6 order-0 order-md-1 mb-5 mt-md-0">
                                            <div className="image-block text-center">
                                                <img loading="lazy" decoding="async" src="theme\images\payment-info.png" alt="How Do I Repay?" className="img-fluid" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="has-shapes">
                        <svg className="shape shape-left text-light" width="290" height="709" viewBox="0 0 290 709" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M-119.511 58.4275C-120.188 96.3185 -92.0001 129.539 -59.0325 148.232C-26.0649 166.926 11.7821 174.604 47.8274 186.346C83.8726 198.088 120.364 215.601 141.281 247.209C178.484 303.449 153.165 377.627 149.657 444.969C144.34 546.859 197.336 649.801 283.36 704.673"
                                stroke="currentColor" stroke-miterlimit="10" />
                            <path
                                d="M-141.434 72.0899C-142.111 109.981 -113.923 143.201 -80.9554 161.895C-47.9878 180.588 -10.1407 188.267 25.9045 200.009C61.9497 211.751 98.4408 229.263 119.358 260.872C156.561 317.111 131.242 391.29 127.734 458.631C122.417 560.522 175.414 663.463 261.437 718.335"
                                stroke="currentColor" stroke-miterlimit="10" />
                            <path
                                d="M-163.379 85.7578C-164.056 123.649 -135.868 156.869 -102.901 175.563C-69.9331 194.256 -32.086 201.934 3.9592 213.677C40.0044 225.419 76.4955 242.931 97.4127 274.54C134.616 330.779 109.296 404.957 105.789 472.299C100.472 574.19 153.468 677.131 239.492 732.003"
                                stroke="currentColor" stroke-miterlimit="10" />
                            <path
                                d="M-185.305 99.4208C-185.982 137.312 -157.794 170.532 -124.826 189.226C-91.8589 207.919 -54.0118 215.597 -17.9666 227.34C18.0787 239.082 54.5697 256.594 75.4869 288.203C112.69 344.442 87.3706 418.62 83.8633 485.962C78.5463 587.852 131.542 690.794 217.566 745.666"
                                stroke="currentColor" stroke-miterlimit="10" />
                        </svg>
                        <svg className="shape shape-right text-light" width="474" height="511" viewBox="0 0 474 511" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M601.776 325.899C579.043 348.894 552.727 371.275 520.74 375.956C478.826 382.079 438.015 355.5 412.619 321.6C387.211 287.707 373.264 246.852 354.93 208.66C336.584 170.473 311.566 132.682 273.247 114.593C220.12 89.5159 155.704 108.4 99.7772 90.3769C53.1531 75.3464 16.3392 33.2759 7.65012 -14.947"
                                stroke="currentColor" stroke-miterlimit="10" />
                            <path
                                d="M585.78 298.192C564.28 319.945 539.378 341.122 509.124 345.548C469.472 351.341 430.868 326.199 406.845 294.131C382.805 262.059 369.62 223.419 352.278 187.293C334.936 151.168 311.254 115.417 275.009 98.311C224.74 74.582 163.815 92.4554 110.913 75.3971C66.8087 61.1784 31.979 21.3767 23.7639 -24.2362"
                                stroke="currentColor" stroke-miterlimit="10" />
                            <path
                                d="M569.783 270.486C549.5 290.99 526.04 310.962 497.501 315.13C460.111 320.592 423.715 296.887 401.059 266.641C378.392 236.402 365.963 199.965 349.596 165.901C333.24 131.832 310.911 98.1265 276.74 82.0034C229.347 59.6271 171.895 76.4848 122.013 60.4086C80.419 47.0077 47.5905 9.47947 39.8431 -33.5342"
                                stroke="currentColor" stroke-miterlimit="10" />
                            <path
                                d="M553.787 242.779C534.737 262.041 512.691 280.809 485.884 284.722C450.757 289.853 416.568 267.586 395.286 239.173C373.993 210.766 362.308 176.538 346.945 144.535C331.581 112.533 310.605 80.8723 278.502 65.7217C233.984 44.6979 180.006 60.54 133.149 45.4289C94.0746 32.8398 63.2303 -2.41965 55.9568 -42.8233"
                                stroke="currentColor" stroke-miterlimit="10" />
                            <path
                                d="M537.791 215.073C519.964 233.098 499.336 250.645 474.269 254.315C441.41 259.126 409.422 238.286 389.513 211.704C369.594 185.13 358.665 153.106 344.294 123.17C329.923 93.2337 310.293 63.6078 280.258 49.4296C238.605 29.7646 188.105 44.5741 144.268 30.4451C107.714 18.6677 78.8538 -14.3229 72.0543 -52.1165"
                                stroke="currentColor" stroke-miterlimit="10" />
                        </svg>
                    </div>
                </div>
            </section></div>
    )
}

export default Aadhar_Transfer;