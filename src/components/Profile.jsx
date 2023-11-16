
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
const navigate=useNavigate();
const [profiledata, setprofiledata]=useState('');
const userid=localStorage.getItem('userid');
var amount;
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
});

const getProfile="http://localhost:8881/api/users/getProfileData/"+userid;
const deleteProfile="http://localhost:8881/api/users/delete/"+userid;
const editProfile="http://localhost:8881/api/users/edit/"+userid;
const editwallet="http://localhost:8881/api/users/edit/"+userid;


useEffect(() => {
if(userid!=null){

    (async () => await Load())
    ();}
  }, []);


  async function Load() {
   
    try {
        const response = await axios.get(getProfile);
        setprofiledata(response.data);
      

        if (response.status === 200) {
            const responseMessage = response.data;
        } else {
          // Handle unexpected status codes
          alert(`Unexpected status code: ${response.status}`);

        }
    } catch (error) {
        if (error.response) {
          // alert(error.response.status);
            // The request was made and the server responded with a non-2xx status
            if (error.response.status === 404) {
               
                alert('Error Profile data fetch');
              } else {
                // Handle other HTTP error code
                alert(`Server returned an error: ${error.response.status}`);

              }
        } 
        else if (error.request) {
            // The request was made but no response was received (server not reachable)
            alert('Could not connect to the server');

        } else {
            console.error('Error:', error.message);

        }
    }
}



function checkPassword(password) {
    // Check if the password has at least 8 characters
    if (password.length >= 8) {
        return true;
        console.log('Password is valid!');

    } else {
        alert('Password must have at least 8 characters.');
    }
};

async function changepassword(){
    const newpassword = window.prompt('Enter new password:');
    
    if (checkPassword(newpassword)) {
      try {
        const response = await axios.put(editProfile, {
           password:newpassword,
           wallet:profiledata.wallet
        });
        
        if (response.status === 200) {
            const responseMessage = response.data;
            alert("Successfully password Changed ");
        } else {
          // Handle unexpected status codes
          alert(`Unexpected status code: ${response.status}`);
          alert(" Password Change failed");


        }
    } catch (error) {
        if (error.response) {
            alert(error.response);
          alert(" Password Change failed");
        if (error.response.status === 500) {
               
          alert(" Password Change failed");
                
              } else {
                // Handle other HTTP error code
                alert(`Server returned an error: ${error.response.status}`);
                alert(" Password Change failed");
                
              }
        } 
        else if (error.request) {
            alert('Could not connect to the server');

        } else {
            console.error('Error:', error.message);

        }
    }
    }

}

function checkAmount(inputValue) {
    console.log('amount validation called');

    // Proceed with your normal logic
    const isValidNumber = /^[0-9]+$/.test(inputValue);

    if (isValidNumber) {
        console.log("amount  valid");
        return true;
        // Your further logic for a valid number
    } else {
        alert("Invalid amount");
        // Your error handling logic for an invalid number
    }


}

async function addBalance(){
     amount = window.prompt('Enter Amount:');
    
    if (checkAmount(amount)) {
        var  oldbalance=profiledata.wallet;
        var newbalance=parseFloat(oldbalance) + parseFloat(amount)
      try {
        const response = await axios.put(editProfile, {
           password:profiledata.password,
           wallet:newbalance
        });
        
        if (response.status === 200) {
            const responseMessage = response.data;
            alert("Wallet Balance Added Successfully  ");
            transaction();
        } else {
          // Handle unexpected status codes
          alert(`Unexpected status code: ${response.status}`);
          alert(" Wallet Balance Add failed");


        }
    } catch (error) {
        if (error.response) {
            alert(error.response);
            alert(" Wallet Balance Add failed");
        if (error.response.status === 500) {
               
            alert(" Wallet Balance Add failed");
                
              } else {
                // Handle other HTTP error code
                alert(`Server returned an error: ${error.response.status}`);
                alert(" Wallet Balance Add failed");
                
                
              }
        } 
        else if (error.request) {
            alert('Could not connect to the server');

        } else {
            console.error('Error:', error.message);

        }
    }
    }

}


var type="Wallet Transfer"
    async function transaction() {
        try {
            await axios.post("http://localhost:8881/api/users/saveUserDetails",
                {
                    username: profiledata.username,
                    from: profiledata.username,
                    to: "wallet",
                    email: profiledata.email,
                    wallet: amount,
                    type:type,
                    description:"Wallet Balance added",
                    date:currentDate,
                    time:currentISTTime,
                    amount:amount,
                    mobile:profiledata.mobile,
                    status:"Sucess"
                });

           

        }
        catch (err) {
            alert("wallet Balance Add failed , Check Server");
        }
    }


async function deleteaccount(){

    try {
        const response = await axios.delete(deleteProfile);
        
        if (response.status === 200) {
            // Successful login
            const responseMessage = response.data;
            localStorage.clear();
            navigate('/');
            alert("User Account Deleted");
            
        } else {
          // Handle unexpected status codes
          alert(`Unexpected status code: ${response.status}`);
          alert("User Account Delete failed");


        }
    } catch (error) {
        if (error.response) {
            alert("User Account Delete failed");
          // alert(error.response.status);
            // The request was made and the server responded with a non-2xx status
            if (error.response.status === 404) {
               
                alert("User Account Delete failed");
              } else {
                // Handle other HTTP error code
                alert(`Server returned an error: ${error.response.status}`);
                alert("User Account Delete failed");
              }
        } 
        else if (error.request) {
            alert('Could not connect to the server');

        } else {
            console.error('Error:', error.message);

        }
    }


}

        document.body.style.overflow = 'hidden';
        document.body.scrollIntoView({
            behavior:'smooth',
            block:'center',
            inline:'center'
        })

        return (
            <div>
            <section className="section">
                <div className="container">
                    <div className="row1">


                    <div>
                    <div className="col-lg-41 col-md-6">
                            <div className="section-title pt-4">
                                <p className="text-primary fw-bold mb-3">Hello,</p>
                                <h1>{profiledata.username}</h1>
                                <p>Efficiently transfer money within the country with <br />our domestic services.</p>
                            </div>
                        </div>
                        
                        <div className="col-lg-41 col-md-6 service-item" style={{marginTop:"10px",marginLeft:"1px"}}>
            
            <div className="block" onClick={addBalance}> <span className="colored-box text-center h3 mb-4" style={{width:"200px"}}>


                Add Balance

            </span>
                <h3 className="mb-3 service-title">Wallet Balance</h3>
                <b><h4 className="mb-3 service-title" style={{padding:"10px", fontSize:"20px"}}><i className='fa fa-rupee-sign'></i>{profiledata.wallet}</h4></b>
            
            </div>
        

    </div>
    <div className="col-lg-41 col-md-61 service-item" style={{width:"700px", height:"520px",marginTop:"0",marginLeft:"680px"}}>
                
                <div className="block" > <span className="colored-box text-center h3 mb-4" style={{width:"200px"}}>Profile</span>
                    <h3 className="mb-3 service-title" style={{padding:"10px"}}>User Name <span style={{paddingLeft:"64px"}}/>:{" "+profiledata.username}</h3>
                    <h3 className="mb-3 service-title"style={{padding:"10px"}}>Email<span style={{paddingLeft:"124px"}}/>:{" "+profiledata.email}</h3>
                    <h3 className="mb-3 service-title"style={{padding:"10px"}}>Phone Number <span style={{paddingLeft:"28px"}}/>:{" "+profiledata.phonenumber}</h3>
                    <h3 className="mb-3 service-title"style={{padding:"10px"}}>EasyPay ID<span style={{paddingLeft:"74px"}}/>:{" "+profiledata.id}</h3>
                    <h3 className="mb-3 service-title"style={{padding:"10px"}}>Account (Default)<span style={{paddingLeft:"10px"}}/>:{" "+profiledata.account}</h3>
                    <div style={{display:"flex", gap:"100px", marginLeft:"40px"}}><div className="form-group form-button">
                                            <div className="form-group form-button" to="/Login">
                                                <input type="submit" name="signup" id="signup" className="form-submit" value="Change Password" onClick={changepassword} />
                                            </div>
                                        </div>
                                        <div className="form-group form-button" style={{marginLeft:"80px"}}>
                                            <div className="form-group form-button" to="/Login">
                                                <input type="submit" name="signup" id="signup" className="form-submit" value="Delete Account" onClick={deleteaccount} />
                                            </div>
                                        </div></div>
                </div>
    
      
                
        </div>
                    </div>
                        
                        {/* <div className="col-lg-4 col-md-6 service-item">
        
                                <div className="block"> <span className="colored-box text-center h3 mb-4">02</span>
                                    <h3 className="mb-3 service-title">Account Transfer</h3>
                                    <p className="mb-0 service-description">Simplify your financial management by easily transferring funds between accounts.</p>
                                </div>
                
                        </div> */}
            
                        {/* <div className="col-lg-4 col-md-6 service-item">
    
                                <div className="block"> <span className="colored-box text-center h3 mb-4">


                                    04

                                </span>
                                    <h3 className="mb-3 service-title">UPI Transfer</h3>
                                    <p className="mb-0 service-description">Our UPI transfer services enable users to link multiple bank accounts.</p>
                                </div>
                
                        </div>
                        <div className="col-lg-4 col-md-6 service-item">
            
                                <div className="block"> <span className="colored-box text-center h3 mb-4">


                                    05

                                </span>
                                    <h3 className="mb-3 service-title">Email Transfer</h3>
                                    <p className="mb-0 service-description">Seamlessly transfer funds between Emails and optimize your banking.</p>
                                </div>
                    
                        </div> */}
                    </div>
                </div>
            
            </section>
            {/* <section className="section">
                <div className="container">
                    <div className="row1">
                        <div className="col-lg-4 col-md-6">
                            <div className="section-title pt-4">
                                <p className="text-primary text-uppercase fw-bold mb-3">Our Services</p>
                                <h1>International services</h1>
                                <p>Seamlessly send and receive money globally through our international services.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 service-item">
            
                                <div className="block"> <span className="colored-box text-center h3 mb-4">01</span>
                                    <h3 className="mb-3 service-title">Global Transfer</h3>
                                    <p className="mb-0 service-description">Offering a reliable and convenient platform for cross-border transactions.</p>
                                </div>
        
                        </div>
                        <div className="col-lg-4 col-md-6 service-item">
        
                                <div className="block"> <span className="colored-box text-center h3 mb-4">02</span>
                                    <h3 className="mb-3 service-title">Credit Card Transfer</h3>
                                    <p className="mb-0 service-description">Empower your financial flexibility by utilizing our credit card transfer services. </p>
                                </div>
                    
                        </div>
                        <div className="col-lg-4 col-md-6 service-item">
                    
                                <div className="block"> <span className="colored-box text-center h3 mb-4">


                                    03

                                </span>
                                    <h3 className="mb-3 service-title">Crypto Transfer</h3>
                                    <p className="mb-0 service-description">Explore the world of cryptocurrency with our secure crypto transfer services.</p>
                                </div>
                    
                        </div>
                        <div className="col-lg-4 col-md-6 service-item">
            
                                <div className="block"> <span className="colored-box text-center h3 mb-4">


                                    04

                                </span>
                                    <h3 className="mb-3 service-title">Gold Transfer</h3>
                                    <p className="mb-0 service-description">Facilitate cross-border Gold transactions effortlessly with our international transfer services.</p>
                                </div>
                    
                        </div>
                        <div className="col-lg-4 col-md-6 service-item">

                                <div className="block"> <span className="colored-box text-center h3 mb-4">


                                    05

                                </span>
                                    <h3 className="mb-3 service-title">Razorpay</h3>
                                    <p className="mb-0 service-description">Our integration with Razorpay ensures a streamlined payment experience.</p>
                                </div>
                            
                        </div>
                    </div>
                </div>
            </section> */}
            </div>
        )
    }

    export default Profile;








    // <section className="homepage_tab position-relative">
    //                 <div className="section container">
    //                     <div className="row1 justify-content-center">
    //                         <div className="col-lg-8 mb-4">
    //                             <div className="section-title text-center">
    //                                 <p className="text-primary text-uppercase fw-bold mb-3">Difference Of Us</p>
    //                                 <h1>Get Know The Basics Simple Pricing And Payments</h1>
    //                             </div>
    //                         </div>
    //                         <div className="col-lg-10">
                                
    //                             <div className="rounded shadow bg-white p-5 tab-content" id="pills-tabContent">
    //                                 <div className="tab-pane fade show active" id="pills-how-much-can-i-recive" role="tabpanel"
    //                                     aria-labelledby="pills-how-much-can-i-recive-tab">
    //                                     <div className="row1 align-items-center">
    //                                         <div className="col-md-6 order-1 order-md-0">
    //                                             <div className="content-block1">
    //                                                 <h2 className="mb-41"><b>Profile Details</b></h2>
    //                                                 <div><b><h3>Profile Details</h3></b></div>
    //                                                 <div className="content">
    //                                                     <div className="form-group">
    //                                                         <h3 className="mb-4"><b>User Name: krishnan</b></h3>
    //                                                         <h3 className="mb-4"><b>Email: vkrishnan569@gmail.com</b></h3>
    //                                                         <h3 className="mb-4"><b>Phone Number:332235225525</b></h3>
    //                                                         <h3 className="mb-4"><b>User Name:</b></h3>
    //                                                         <br />
    //                                                     </div>
    //                                                     <div style={{ display: 'flex', flexDirection: "row", gap: "100px" }}>
    //                                                         <div className="form-group form-button">
    //                                                             <div className="form-group form-button" to="/">
    //                                                                 <input type="submit" name="signin" id="signin" className="form-submit" value="Change Password" onClick={save} />
    //                                                             </div>
    //                                                         </div>
    //                                                         <div className="form-group form-button">
    //                                                             <div className="form-group form-button" to="/">
    //                                                                 <input type="submit" name="signin" id="signin" className="form-submit" value="Delete Account" onClick={save} />
    //                                                             </div>
    //                                                         </div>
    //                                                     </div>



    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //                                         <div className="col-md-6 order-0 order-md-1 mb-5 mt-md-0">
    //                                             <div className="image-block text-center" style={{ padding: "10px", color: "blue", borderRadius: "50%" }}>
    //                                                 <div><h3 className="mb-4"><b>Wallet Balance:</b></h3></div>
    //                                                 <div><h3 className="mb-4"><i className='fa fa-rupee'></i><b>{inputamount}</b></h3></div>
    //                                                 <div className="form-group form-button" style={{ padding: "10px" }}>
    //                                                     <div className="form-group form-button" to="/">
    //                                                         <input type="submit" name="signin" id="signin" className="form-submit" value="Add Balance" onClick={addBalance} />
    //                                                     </div>
    //                                                 </div>
    //                                                 {/* <img loading="lazy" decoding="async"
    //                                                     src="theme\images/illustration-1.png" alt="How Much Can I Recive?" className="img-fluid" /> */}
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className="has-shapes">
    //                         <svg className="shape shape-left text-light" width="290" height="709" viewBox="0 0 290 709" fill="none"
    //                             xmlns="http://www.w3.org/2000/svg">
    //                             <path
    //                                 d="M-119.511 58.4275C-120.188 96.3185 -92.0001 129.539 -59.0325 148.232C-26.0649 166.926 11.7821 174.604 47.8274 186.346C83.8726 198.088 120.364 215.601 141.281 247.209C178.484 303.449 153.165 377.627 149.657 444.969C144.34 546.859 197.336 649.801 283.36 704.673"
    //                                 stroke="currentColor" stroke-miterlimit="10" />
    //                             <path
    //                                 d="M-141.434 72.0899C-142.111 109.981 -113.923 143.201 -80.9554 161.895C-47.9878 180.588 -10.1407 188.267 25.9045 200.009C61.9497 211.751 98.4408 229.263 119.358 260.872C156.561 317.111 131.242 391.29 127.734 458.631C122.417 560.522 175.414 663.463 261.437 718.335"
    //                                 stroke="currentColor" stroke-miterlimit="10" />
    //                             <path
    //                                 d="M-163.379 85.7578C-164.056 123.649 -135.868 156.869 -102.901 175.563C-69.9331 194.256 -32.086 201.934 3.9592 213.677C40.0044 225.419 76.4955 242.931 97.4127 274.54C134.616 330.779 109.296 404.957 105.789 472.299C100.472 574.19 153.468 677.131 239.492 732.003"
    //                                 stroke="currentColor" stroke-miterlimit="10" />
    //                             <path
    //                                 d="M-185.305 99.4208C-185.982 137.312 -157.794 170.532 -124.826 189.226C-91.8589 207.919 -54.0118 215.597 -17.9666 227.34C18.0787 239.082 54.5697 256.594 75.4869 288.203C112.69 344.442 87.3706 418.62 83.8633 485.962C78.5463 587.852 131.542 690.794 217.566 745.666"
    //                                 stroke="currentColor" stroke-miterlimit="10" />
    //                         </svg>
    //                         <svg className="shape shape-right text-light" width="474" height="511" viewBox="0 0 474 511" fill="none"
    //                             xmlns="http://www.w3.org/2000/svg">
    //                             <path
    //                                 d="M601.776 325.899C579.043 348.894 552.727 371.275 520.74 375.956C478.826 382.079 438.015 355.5 412.619 321.6C387.211 287.707 373.264 246.852 354.93 208.66C336.584 170.473 311.566 132.682 273.247 114.593C220.12 89.5159 155.704 108.4 99.7772 90.3769C53.1531 75.3464 16.3392 33.2759 7.65012 -14.947"
    //                                 stroke="currentColor" stroke-miterlimit="10" />
    //                             <path
    //                                 d="M585.78 298.192C564.28 319.945 539.378 341.122 509.124 345.548C469.472 351.341 430.868 326.199 406.845 294.131C382.805 262.059 369.62 223.419 352.278 187.293C334.936 151.168 311.254 115.417 275.009 98.311C224.74 74.582 163.815 92.4554 110.913 75.3971C66.8087 61.1784 31.979 21.3767 23.7639 -24.2362"
    //                                 stroke="currentColor" stroke-miterlimit="10" />
    //                             <path
    //                                 d="M569.783 270.486C549.5 290.99 526.04 310.962 497.501 315.13C460.111 320.592 423.715 296.887 401.059 266.641C378.392 236.402 365.963 199.965 349.596 165.901C333.24 131.832 310.911 98.1265 276.74 82.0034C229.347 59.6271 171.895 76.4848 122.013 60.4086C80.419 47.0077 47.5905 9.47947 39.8431 -33.5342"
    //                                 stroke="currentColor" stroke-miterlimit="10" />
    //                             <path
    //                                 d="M553.787 242.779C534.737 262.041 512.691 280.809 485.884 284.722C450.757 289.853 416.568 267.586 395.286 239.173C373.993 210.766 362.308 176.538 346.945 144.535C331.581 112.533 310.605 80.8723 278.502 65.7217C233.984 44.6979 180.006 60.54 133.149 45.4289C94.0746 32.8398 63.2303 -2.41965 55.9568 -42.8233"
    //                                 stroke="currentColor" stroke-miterlimit="10" />
    //                             <path
    //                                 d="M537.791 215.073C519.964 233.098 499.336 250.645 474.269 254.315C441.41 259.126 409.422 238.286 389.513 211.704C369.594 185.13 358.665 153.106 344.294 123.17C329.923 93.2337 310.293 63.6078 280.258 49.4296C238.605 29.7646 188.105 44.5741 144.268 30.4451C107.714 18.6677 78.8538 -14.3229 72.0543 -52.1165"
    //                                 stroke="currentColor" stroke-miterlimit="10" />
    //                         </svg>
    //                     </div>
    //                 </div>
    //             </section>