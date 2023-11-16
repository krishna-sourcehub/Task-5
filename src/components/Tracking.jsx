
import axios from 'axios';
import React, { useState } from 'react';
import './Tracking.css';

const Tracking = () => {

  document.body.style.overflow = 'visible';
  const track = localStorage.getItem('track1');
  const [currentStep, setCurrentStep] = useState(1);
  const [transactionid, settransactionid] = useState('');
  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
  const trackStatus = true;
  const handleStepClick = (step) => {
   
    Load();
    

  };
  const getLineStyle = () => {
    const width = ((currentStep - 1) / (steps.length - 1)) * 100;
    return {
      width: `${width}%`,
      transition: 'width 1s ease-in-out',
    };
  };



  const userName = localStorage.getItem('username');
  // alert(userName);
  const [id, setId] = useState('');
  const [username, setName] = useState("");
  const [from, setfrom] = useState("");
  const [to, setto] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [amount, setamount] = useState("");
  const [type, settype] = useState("");
  const [description, setdescription] = useState("");
  const [mobile, setmobile] = useState("");
  const [country, setcountry] = useState("");
  const [city, setcity] = useState("");
  const [userinfos, setUsers] = useState("");

  const getall = "http://localhost:8881/api/users/getUserTransaction/" + transactionid;

  async function Load() {
   
    try {
        const response = await axios.get(getall);
        setUsers(response.data);
      

        if (response.status === 200) {
            const responseMessage = response.data;
            localStorage.setItem('track1', trackStatus);
            setCurrentStep(4);

        } else {
          setCurrentStep(1);
          localStorage.removeItem('track1');
          // Handle unexpected status codes
          alert(`Unexpected status code: ${response.status}`);

        }
    } catch (error) {

      localStorage.removeItem('track1');
        if (error.response) {
          setCurrentStep(1);
            if (error.response.status === 404) {
                setCurrentStep(1);
                localStorage.removeItem('track1');
                alert('Please enter the valid Transaction Id');
              } else {
                // Handle other HTTP error codes
                setCurrentStep(1);
                localStorage.removeItem('track1');
                alert(`Server returned an error: ${error.response.status}`);

              }
        } 
        else if (error.request.status ===0) {
          setCurrentStep(1);
          localStorage.removeItem('track1');
          alert('Please enter the valid Transaction Id');

      }
        else if (error.request) {
            setCurrentStep(1);
            localStorage.removeItem('track1');
            alert('Could not connect to the server');

        } else {
            setCurrentStep(1);
            localStorage.removeItem('track1');
            console.error('Error:', error.message);

        }
    }
}

  return (
    <div>
      <h2 style={{ marginTop: "100px", alignContent: "center", marginLeft: "550px" }}> Transaction Tracking</h2>
      <div style={{ marginLeft: "500px", marginTop: "40px", display: "flex", flexDirection: "row", alignItems: "center" }}>
        <div style={{ marginTop: "50px" }}><h4>Enter the Transaction ID:</h4></div>
        <input style={{ width: "220px", marginLeft: "10px", marginTop: "40px" }} type="text" placeholder='Enter the Transaction ID' value={transactionid} onChange={(event) => { settransactionid(event.target.value) }} />
        <div className="form-group1 form-button" style={{ marginLeft: "10px", marginTop: "0px" }}>
          <div className="form-group1 form-button">
            <input type="submit" name="signup" id="signup" className="form-submit" value="Track" onClick={handleStepClick} style={{ padding: "10px", width: "100px", background: "#5ca9fb" }} />
          </div>
        </div>
      </div>



      <div className="custom-step-progress-container" style={{ marginTop: "100px", marginLeft: "100px" }}>
        <div className="custom-step-progress-bar" style={{ gap: "100px" }}>
          {steps.map((step, index) => (
            <div
              key={index}
              className={`custom-step ${index < currentStep ? 'completed' : ''}`}
              onClick={() => handleStepClick(index + 1)}
            >
              {step}
            </div>
          ))}
          <div className="progress-line" style={getLineStyle()} />
        </div>

      
      </div>
      <div style={{ display:"flex", flexDirection:"row", gap:"110px", marginLeft: "470px", padding:"10px"}}>
      <div >Receiver Info</div>
      <div >Banking <br /><span style={{paddingLeft:"4px"}}></span> Server</div>
      <div style={{ paddingLeft:"20px"}}>Payment <br /> Gateway</div>
      <div style={{ paddingLeft:"5px"}}>Completed</div></div>


{   track?
      <div style={{ marginLeft: "500px", padding: "40px" }}>
        <h3 style={{ marginLeft: "120px", padding: "10px", marginBottom:"20px" }}> Transaction Status</h3>
        <div style={{ paddingLeft: "100px" }}><b>ID <span style={{ paddingLeft: "82px" }}></span>:{" " + userinfos.id}</b></div>
        <div style={{ paddingLeft: "100px" }}><b>DATE<span style={{ paddingLeft: "66px" }}></span>:</b>{" " + userinfos.date}</div>
        <div style={{ paddingLeft: "100px" }}><b>TIME<span style={{ paddingLeft: "67px" }}></span>:</b>{" " + userinfos.time}</div>
        <div style={{ paddingLeft: "100px" }}><b>FROM<span style={{ paddingLeft: "60px" }}></span>:</b>{" " + userinfos.from}</div>
        <div style={{ paddingLeft: "100px" }}><b>TO<span style={{ paddingLeft: "83px" }}></span>:</b>{" " + userinfos.to}</div>
        <div style={{ paddingLeft: "100px" }}><b>TYPE<span style={{ paddingLeft: "68px" }}></span>:</b>{" " + userinfos.type}</div>
        <div style={{ paddingLeft: "100px" }}><b>DESCRIPTION<span style={{ paddingLeft: "6px" }}></span>:</b>{" " + userinfos.description}</div>
        <div style={{ paddingLeft: "100px" }}><b>MOBILE<span style={{ paddingLeft: "48px" }}></span>:</b>{" " + userinfos.mobile}</div>
        <div style={{ paddingLeft: "100px" }}><b>AMOUNT<span style={{ paddingLeft: "36px" }}></span>:</b>{" " + userinfos.amount}</div>
        <div style={{ paddingLeft: "100px" }}><b>STATUS<span style={{ paddingLeft: "50px" }}></span>:</b>{" " + userinfos.status}</div>
      </div>
      :<div  style={{ marginLeft: "500px", padding: "40px" }}>
      <h3 style={{ marginLeft: "80px", padding: "10px", marginBottom:"20px" }}> Please Enter valid Transaction ID</h3>
      </div>
        }


    </div>

  );
};

export default Tracking;
