
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sucess = () => {
let navigate=useNavigate();
function navi(){
    navigate('/');
}
    return (
        <div style={{justifyContent: "center", alignContent:"center", alignItems:"center"}}>
            <div style={{  marginLeft: "600px", marginTop: "100px"}}>
                <h2>Payment Successful </h2></div>
            <div style={{ marginLeft: "480px", width: "600px", height: "400px"}}>
                <img src="theme/images/sucesspage2.jpg" alt="" />
                    <div className="form-group form-button" to="/"  style={{marginLeft:"260px"}}>
                        <input type="submit" name="signin" id="signin" className="form-submit" value="Continue" onClick={navi}/>
                </div>
            </div>
        </div>
    )
}
export default Sucess;