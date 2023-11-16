import React from 'react';
import { Link } from 'react-router-dom';

const Send_Money = () => {

    document.body.style.overflow = 'visible';
    localStorage.removeItem("displayvalue");

    return (

<div>
        <section className="section">
            <div className="container">
                <div className="row1">
                    <div className="col-lg-4 col-md-6">
                        <div className="section-title pt-4">
                            <p className="text-primary text-uppercase fw-bold mb-3">Our Services</p>
                            <h1>Domestic <br /> services</h1>
                            <p>Efficiently transfer money within the country with <br />our domestic services.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 service-item">
                    <Link className="text-black" to="/AadharTransfer">
                            <div className="block"> <span className="colored-box text-center h3 mb-4">01</span>
                                <h3 className="mb-3 service-title">Aadhar Transfer</h3>
                                <p className="mb-0 service-description"> Send and receive funds instantly through your Aadhar managing your finances on the go</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-4 col-md-6 service-item">
                    <Link className="text-black" to="/AccountTransfer">
                            <div className="block"> <span className="colored-box text-center h3 mb-4">02</span>
                                <h3 className="mb-3 service-title">Account Transfer</h3>
                                <p className="mb-0 service-description">Simplify your financial management by easily transferring funds between accounts.</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-4 col-md-6 service-item">
                    <Link className="text-black" to="/MobileTransfer">
                            <div className="block"> <span className="colored-box text-center h3 mb-4">


                                03

                            </span>
                                <h3 className="mb-3 service-title">Mobile Transfer</h3>
                                <p className="mb-0 service-description">Experience the convenience of mobile money transfers with our user-friendly platform.</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-4 col-md-6 service-item">
                    <Link className="text-black" to="/UPITransfer">
                            <div className="block"> <span className="colored-box text-center h3 mb-4">


                                04

                            </span>
                                <h3 className="mb-3 service-title">UPI Transfer</h3>
                                <p className="mb-0 service-description">Our UPI transfer services enable users to link multiple bank accounts.</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-4 col-md-6 service-item">
                    <Link className="text-black" to="/EmailTransfer">
                            <div className="block"> <span className="colored-box text-center h3 mb-4">


                                05

                            </span>
                                <h3 className="mb-3 service-title">Email Transfer</h3>
                                <p className="mb-0 service-description">Seamlessly transfer funds between Emails and optimize your banking.</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
        <section className="section">
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
                    <Link className="text-black" to="/InternationalTransfer">
                            <div className="block"> <span className="colored-box text-center h3 mb-4">01</span>
                                <h3 className="mb-3 service-title">Global Transfer</h3>
                                <p className="mb-0 service-description">Offering a reliable and convenient platform for cross-border transactions.</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-4 col-md-6 service-item">
                    <Link className="text-black" to="/CreditTransfer">
                            <div className="block"> <span className="colored-box text-center h3 mb-4">02</span>
                                <h3 className="mb-3 service-title">Credit Card Transfer</h3>
                                <p className="mb-0 service-description">Empower your financial flexibility by utilizing our credit card transfer services. </p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-4 col-md-6 service-item">
                    <Link className="text-black" to="/CryptoTransfer">
                            <div className="block"> <span className="colored-box text-center h3 mb-4">


                                03

                            </span>
                                <h3 className="mb-3 service-title">Crypto Transfer</h3>
                                <p className="mb-0 service-description">Explore the world of cryptocurrency with our secure crypto transfer services.</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-4 col-md-6 service-item">
                    <Link className="text-black" to="/GoldTransfer">
                            <div className="block"> <span className="colored-box text-center h3 mb-4">


                                04

                            </span>
                                <h3 className="mb-3 service-title">Gold Transfer</h3>
                                <p className="mb-0 service-description">Facilitate cross-border Gold transactions effortlessly with our international transfer services.</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-4 col-md-6 service-item">
                    <Link className="text-black" to="/Razorpay">
                            <div className="block"> <span className="colored-box text-center h3 mb-4">


                                05

                            </span>
                                <h3 className="mb-3 service-title">Razorpay</h3>
                                <p className="mb-0 service-description">Our integration with Razorpay ensures a streamlined payment experience.</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
        </div>
    )
}

export default Send_Money