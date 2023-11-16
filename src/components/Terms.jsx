import React from 'react';
import './Terms.css'; // Include your custom CSS file

const Terms = () => {
  document.body.style.overflow = 'visible';
  function windowclose(){
    window.close();
  }
  return (
    <div className="container2">
      <h2>Terms and Conditions</h2>

      <p>Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use...</p>

      {/* Add more paragraphs and sections as needed */}

      <div className="terms">
        <h3>The Use of the Information</h3>
        <p>You cannot remove the copyright link to Gethugothemes without buying the license.</p>
        <p>Themefisher is not responsible for you not receiving your Theme/Template if you to provide a order to understand valid email or for technical issues outside our control.</p>
<br />
        <h3>Application Processing</h3>
        <p>You are most welcome to share our themes with your clients/friends, but please share our license with them so that they can be aware of our copyrights.</p>
      <br />
        <h3>What Services We Render</h3>
        <p>We collect certain identifying personal data when you sign up to our Service such as your , email address, PayPal , Razorpay address (if different from email address), and telephone number. The personal data we collect you is disclosed only in accordance with our Terms of Service and/or this Privacy Policy.Conclude collects Slack account and access information from Users for the purposes of connecting to and the Slack API and to authenticate to information on</p>
        <p>You cannot remove the copyright link to Gethugothemes without buying the license.</p>
        <p>Themefisher is not responsible for you not receiving your Theme/Template if you fail to provide a valid email or for technical issues outside our control.</p>
        <p>You are most welcome to share our themes with your clients/friends, but please share our license with them so that they can be aware of our copyrights.</p>
        <br />
        <h3>Intellectual Property Rights</h3>
        <p>You cannot remove the copyright link to Gethugothemes without buying the license.</p>
        <p>You have the right to use the themes for personal and commercial project(s).</p>
        <p>You cannot resell, redistribute, or sub-license any of Gethugothemes’s themes.</p>
        <p>You can host Gethugothemes’s template to your website with full author credit</p>
        <p>You are most welcome to share our themes with your clients/friends, but please share our license with them so that they can be aware of our copyrights.</p>
      </div>

      <div className="footer">
        <p>&copy; 2023 EasyPay Express. All rights reserved.</p>
        <div className="form-group form-button">
                                        <div className="form-group form-button">
                                           <input type="submit" name="signup" id="signup" className="form-submit" value="Accept" onClick={windowclose}/>
                                        </div>
                                    </div>
                                    <br />
      </div>
      
    </div>
  );
}

export default Terms;
