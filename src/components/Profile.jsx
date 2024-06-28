
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

const getProfile="https://easypayexpress.onrender.com/api/users/getProfileData/"+userid;
const deleteProfile="https://easypayexpress.onrender.com/api/users/delete/"+userid;
const editProfile="https://easypayexpress.onrender.com/api/users/edit/"+userid;
const editwallet="https://easypayexpress.onrender.com/api/users/edit/"+userid;


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
            await axios.post("https://easypayexpress.onrender.com/api/users/saveUserDetails",
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

        // document.body.style.overflow = 'hidden';
        // document.body.scrollIntoView({
        //     behavior:'smooth',
        //     block:'center',
        //     inline:'center'
        // })
        document.body.style.overflow = 'visible';

        return (
            <div>
            <section className="section">
                <div className="container">
                    <div className="row1">

                        <div className="col-lg-41 col-md-6">
                                <div className="section-title pt-4">
                                    <p className="text-primary fw-bold mb-3">Hello,</p>
                                    <h1>{profiledata.username}</h1>
                                    <p>Efficiently transfer money within the country with <br />our domestic services.</p>
                                </div>
                            </div>
                            
                    <div style={{display:"flex",flexFlow:"row", gap:"80px"}}>
                   
                        
                        <div className="col-lg-41 col-md-6 service-item" style={{marginTop:"10px", marginLeft:"1px", width:"600px", height:"300px"}}>
            
            <div className="block" onClick={addBalance}> <span className="colored-box text-center h3 mb-4" style={{width:"200px", marginTop:"0px"}}>


                Add Balance

            </span>
                <h3 className="mb-3 service-title">Wallet Balance</h3>
                <b><h4 className="mb-3 service-title" style={{padding:"10px", fontSize:"20px"}}><i className='fa fa-rupee-sign'></i>{profiledata.wallet}</h4></b>
            
            </div>
        
    </div>

    <div className="col-lg-41 col-md-61 service-item" style={{width:"650px", height:"520px"}}>
                
                <div className="block" style={{padding:"40px"}}> <span className="colored-box text-center h3 mb-4" style={{width:"200px"}}>Profile</span>
                    <h3 className="mb-3 service-title" style={{padding:"10px"}}>User Name <span style={{paddingLeft:"64px"}}/>:{" "+profiledata.username}</h3>
                    <h3 className="mb-3 service-title"style={{padding:"10px"}}>Email<span style={{paddingLeft:"124px"}}/>:{" "+profiledata.email}</h3>
                    <h3 className="mb-3 service-title"style={{padding:"10px"}}>Phone Number <span style={{paddingLeft:"28px"}}/>:{" "+profiledata.phonenumber}</h3>
                    <h3 className="mb-3 service-title"style={{padding:"10px"}}>EasyPay ID<span style={{paddingLeft:"74px"}}/>:{" "+profiledata.id}</h3>
                    <h3 className="mb-3 service-title"style={{padding:"10px"}}>Account (Default)<span style={{paddingLeft:"10px"}}/>:{" "+profiledata.account}</h3>
                    <div style={{display:"flex", gap:"100px", marginLeft:"25px"}}><div className="form-group form-button">
                                            <div className="form-group form-button" to="/Login">
                                                <input type="submit" name="signup" id="signup" className="form-submit" value="Change Password" onClick={changepassword} />
                                            </div>
                                        </div>
                                        <div className="form-group form-button" style={{marginLeft:"60px", }}>
                                            <div className="form-group form-button" to="/Login">
                                                <input type="submit" name="signup" id="signup" className="form-submit" value="Delete Account" onClick={deleteaccount} />
                                            </div>
                                        </div>
                                        </div>
                </div>
      
                
        </div>
    
                    </div>
                        
                       
                    </div>
                </div>
            
            </section>
           
            </div>
        )
    }

    export default Profile;







