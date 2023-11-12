import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Components
import Navbar from "../components/Navbar";
import ServiceCard from "../components/ServiceCard";

//Assets
import heroBackground from "../assets/hero-background.png";
import logo from "../assets/logo-no-bg-2.png";
import baptism from "../assets/baptism.jpg";
import wedding from "../assets/wedding.jpg";
import birthday from "../assets/birthday.jpg";
import party from "../assets/party.jpg";
import corporate from "../assets/corporate.jpg";

//Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import StatementCard from "../components/StatementCard";

const Home = () => {
    const reasons = [
        {
            title: "Quality",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas cursus pretium purus eget viverra.",
        },
        {
            title: "Reliability",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas cursus pretium purus eget viverra.",
        },
        {
            title: "Experties",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas cursus pretium purus eget viverra.",
        },
        {
            title: "Affordability",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas cursus pretium purus eget viverra.",
        },
    ];

    const [roleID, setRoleID] = useState(localStorage.getItem("roleID"));
    const [customerID, setCustomerID] = useState(
        localStorage.getItem("userID")
    );

    const [clientData, setClientData] = useState({});

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                //via post request

                const response = await fetch("http://localhost:7723/client/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ client_id: customerID }),
                });
                const result = await response.json();
                setClientData(result);
            } catch (err) {
                console.log(err);
            }
        };
        if (roleID === "ROLE001") {
            fetchClientData();
        }
    }, []);

    return (
        <>
            <Navbar clientData={clientData} />
            {/* Hero Section */}
            <section
                className="hero h-screen relative"
                style={{
                    backgroundImage: `url(${heroBackground})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                }}
            >
                <div className="overlay bg-gray-100 absolute bg-opacity-20 w-full h-full">
                    <div className="container mx-auto px-2 sm:px-6 lg:px-8 h-full">
                        <div className="flex h-full justify-center items-center">
                            <div className="hero-content max-w-xl flex flex-col items-center">
                                <img src={logo} alt={logo} className="w-full" />
                                <p
                                    className="mb-5 text-2xl text-center text-white"
                                    style={{
                                        textShadow: "0 0 5px #000000",
                                    }}
                                >
                                    Provident cupiditate voluptatem et in.
                                </p>
                                <div className="flex justify-center items-center gap-2">
                                    <Link
                                        to="\#services"
                                        className="services-btn py-3 hover:bg-sky-800 px-4 bg-sky-700 w-fit text-lg text-white shadow-sm"
                                    >
                                        Our Services
                                    </Link>
                                    <Link
                                        to="/reservation"
                                        className="make-reservation-btn py-3 hover:bg-sky-800 px-4 bg-sky-700 w-fit text-lg text-white shadow-sm"
                                    >
                                        Make a reservation{" "}
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* End Hero Section */}
            {/* Services Section */}
            <section className="services py-10" id="services">
                <div className="container mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center">
                        <h2 className="text-4xl font-bold mb-5 title">
                            What we offer you ?
                            <hr className="border-2 border-sky-700 w-20 mx-auto mt-3" />
                        </h2>
                        <p className="text-center mb-10 text-gray-900 text-lg w-3/5">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Maecenas cursus pretium purus eget viverra
                            donec mauris risus.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <ServiceCard image={baptism} title="Baptism" />
                        <ServiceCard image={wedding} title="Wedding" />
                        <ServiceCard image={birthday} title="Birthday" />
                        <ServiceCard image={corporate} title="Corporate" />
                        <ServiceCard image={party} title="Party" />
                        <ServiceCard image={party} title="More" />
                    </div>
                </div>
            </section>
            {/* End Services Section */}
            {/* About Section */}
            <section className="about py-10 bg-gray-50 w-full">
                <div className="container mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center">
                        <h2 className="text-4xl font-bold mb-5 title">
                            Why choose us ?
                            <hr className="border-2 border-orange-500 w-20 mx-auto mt-3" />
                        </h2>
                        <p className="text-justify mb-10 text-gray-900 text-lg sm:text-center">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Maecenas cursus pretium purus eget viverra.
                            Donec mauris risus, venenatis in blandit nec, luctus
                            a tellus. Etiam ultricies ex ac eros bibendum
                            interdum.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                        {reasons.map((reason, index) => (
                            <div
                                className="flex flex-col items-start border border-gray-200 rounded-lg p-5 hover:shadow-sm hover:-translate-y-1 cursor-pointer transition-transform bg-white"
                                key={index}
                            >
                                {/* <div className="flex justify-center items-center bg-white">
                                    <FontAwesomeIcon
                                        icon={faPaperPlane}
                                        color="#3B82F6"
                                        size="2x"
                                    />
                                </div> */}
                                <h3 className="text-2xl font-bold text-orange-500 mb-1 text-start">
                                    <FontAwesomeIcon
                                        icon={faPaperPlane}
                                        color="#3B82F6"
                                    />
                                    {" " + reason.title}
                                </h3>
                                <p className="text-center text-gray-900 text-sm text-start">
                                    {reason.content}
                                </p>
                            </div>
                        ))}
                    </div>
                    <hr className="border-1 border-gray-300 my-10" />

                    <div className="header flex items-start justify-centerh-fit gap-8">
                        <div className="header-container flex flex-col items-center justify-start w-3/5 h-full">
                            <h2 className="text-5xl font-bold mb-5 title leading-tight">
                                Here is what our clients say about{" "}
                                <span className="text-orange-500 title">
                                    Calinao's Catering Services
                                </span>
                            </h2>
                        </div>
                        <div className="paragraph-container flex flex-col items-center justify-start w-2/5 h-full">
                            <p className="text-center mb-10 text-gray-900 text-lg w-3/5">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Maecenas cursus pretium purus
                                eget viverra donec mauris risus.
                            </p>
                        </div>
                    </div>

                    <div className="statement py-10 w-full">
                        <div className="statement-container  carousel carousel-center flex items-start justify-start overflow-x-auto">
                            <StatementCard />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
