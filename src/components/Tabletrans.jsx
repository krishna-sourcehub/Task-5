import axios from 'axios';
import { useEffect, useState } from "react";

function Tabletrans() {
const user=localStorage.getItem('username');
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
  const [userinfos, setUsers] = useState([]);


  const getall = "http://localhost:8881/api/users/getUserDetails/" + user;

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
   
    try {
        const response = await axios.get(getall);
        setUsers(response.data);
      

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
               
                alert('Error Transaction data fetch');
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

  return (
    <div><br></br>
      <div className="content">

        <div className="container1" style={{width:"1400px"}}>
          <h2 className="mb-51" style={{ fontSize: "30px", marginBottom: "40px" }}>Transaction History</h2>

          <div className="table-responsive">
            <table className="table custom-table" >
              <thead>
                <tr>
                  <th scope="col" style={{ color: "black", textAlign: "center"  }}>ID</th>
                  <th scope="col" style={{ color: "black", textAlign: "center", }}>DATE</th>
                  <th scope="col" style={{ color: "black", textAlign: "center", }}>TIME</th>
                  <th scope="col" style={{ color: "black", textAlign: "center", }}>FROM</th>
                  <th scope="col" style={{ color: "black", textAlign: "center", }}>TO</th>
                  <th scope="col" style={{ color: "black", textAlign: "center", }}>TYPE</th>
                  <th scope="col" style={{ color: "black", textAlign: "center", }}>DESCRIPTION</th>
                  <th scope="col" style={{ color: "black", textAlign: "center", }}>MOBILE</th>
                  <th scope="col" style={{ color: "black", textAlign: "center", }}>AMOUNT</th>


                </tr>
              </thead>

              {userinfos.map(function fn(userinfo) {
                return (
                  <tbody>
                    <tr>
                      <td style={{ color: "black", textAlign: "center" }}>{userinfo.id}</td>
                      <td style={{ color: "black", textAlign: "center" }}>{userinfo.date}</td>
                      <td style={{ color: "black", textAlign: "center" }}>{userinfo.time}</td>
                      <td style={{ color: "black", textAlign: "center" }}>{userinfo.from}</td>
                      <td style={{ color: "black", textAlign: "center" }}>{userinfo.to}</td>
                      <td style={{ color: "black", textAlign: "center" }}>{userinfo.type}</td>
                      <td style={{ color: "black", textAlign: "center" }}>{userinfo.description}</td>
                      <td style={{ color: "black", textAlign: "center" }}>{userinfo.mobile}</td>
                      <td style={{ color: "black", textAlign: "center" }}>{userinfo.amount}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>

          </div>


        </div>

      </div>


    </div>

  )
}

export default Tabletrans

