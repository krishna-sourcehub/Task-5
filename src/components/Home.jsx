import React, { useEffect, useState } from "react";
import SmoothScroll from "smooth-scroll";
import JsonData from "../data/data.json";
import { Team } from "./Team";
import { About } from "./about";
import { Contact } from "./contact";
import { Features } from "./features";
import { Gallery } from "./gallery";
import { Header } from "./header";
import { Services } from "./services";
import { Testimonials } from "./testimonials";

export const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
    speedAsDuration: true,
});

const Home = () => {
    const [landingPageData, setLandingPageData] = useState({});
    useEffect(() => {
        setLandingPageData(JsonData);
    }, []);
    document.body.style.overflow = 'visible';

    localStorage.removeItem('track1');
    return (
        <div>
            <Header data={landingPageData.Header} />
            <Features data={landingPageData.Features} />
            <Services data={landingPageData.Services} />
            <Gallery data={landingPageData.Gallery} />
            <Testimonials data={landingPageData.Testimonials} />
            <Team data={landingPageData.Team} />
            <About data={landingPageData.About} />
            <Contact data={landingPageData.Contact} />
        </div>
    );
};

export default Home;
