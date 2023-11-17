import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaThumbsUp } from "react-icons/fa";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Ratings = () => {
    const [userID, setUserID] = useState(localStorage.getItem("userID"));
    const [roleID, setRoleID] = useState(localStorage.getItem("roleID"));

    useEffect(() => {
        if (!userID) {
            window.location.href = "/login";
        } else {
            if (roleID === "ROLE001") {
                window.location.href = "/";
            }
        }
    }, []);
    const reviewData = [
        {
            name: "Raizhell Ann Quijano",
            rating: 5,
            review: "Services are good and the food is delicious",
            date: "1 week ago",
        },
        {
            name: "Mark Anthony Dela Cruz",
            rating: 4,
            review: "Great experience, friendly staff",
            date: "2 weeks ago",
        },
        // Add more review data as needed
    ];
    return (
        <section className="dashboard__section h-screen bg-blue-100 flex flex-row ">
            <Sidebar roleID={roleID} />
            <div className="flex flex-col overflow-y-auto w-[80%] p-10 h-[100%]">
                <div className="stats shadow mt-3 bg-base-100">
                    <div className="stat place-items-center">
                        <div className="stat-value">5.0</div>
                    </div>

                    <div className="stat place-items-center w-80">
                        <div className="rating flex flex-col">
                            <div>
                                <input
                                    type="radio"
                                    name="rating-2"
                                    className="mask mask-star-2 bg-yellow-400"
                                />
                                <input
                                    type="radio"
                                    name="rating-2"
                                    className="mask mask-star-2 bg-yellow-400"
                                />
                                <input
                                    type="radio"
                                    name="rating-2"
                                    className="mask mask-star-2 bg-yellow-400"
                                />
                                <input
                                    type="radio"
                                    name="rating-2"
                                    className="mask mask-star-2 bg-yellow-400"
                                />
                                <input
                                    type="radio"
                                    name="rating-2"
                                    className="mask mask-star-2 bg-yellow-400"
                                    checked
                                />
                            </div>
                            <div className="stat-desc text-secondary">
                                5.0 Ratings, 1.2k review
                            </div>
                        </div>
                    </div>

                    <div className="stat place-items-center w-96">
                        <div>
                            5.0
                            <progress
                                className="progress progress-warning w-56"
                                value={95}
                                max="100"
                            ></progress>
                        </div>
                        <div>
                            4.0
                            <progress
                                className="progress progress-warning w-56"
                                value="70"
                                max="100"
                            ></progress>
                        </div>
                        <div>
                            3.0
                            <progress
                                className="progress progress-warning w-56"
                                value="30"
                                max="100"
                            ></progress>
                        </div>
                        <div>
                            2.0
                            <progress
                                className="progress progress-warning w-56"
                                value="20"
                                max="100"
                            ></progress>
                        </div>
                        <div>
                            1.0
                            <progress
                                className="progress progress-warning w-56"
                                value="0"
                                max="100"
                            ></progress>
                        </div>
                    </div>
                </div>
                <div
                    className="flex flex-col h-[100%]"
                    style={{ height: "calc(100vh - 10rem)" }}
                >
                    {reviewData.map((review, index) => (
                        <div
                            key={index}
                            className="card w-full bg-base-100 shadow-xl mt-4"
                        >
                            <div className="card-body">
                                <h2 className="card-title">{review.name}</h2>
                                <div className="flex">
                                    {Array.from(
                                        { length: review.rating },
                                        (_, i) => (
                                            <FontAwesomeIcon
                                                key={i}
                                                icon={faStar}
                                                className="text-yellow-400"
                                            />
                                        )
                                    )}
                                </div>
                                <p>{review.review}</p>
                                <small className="text-secondary">
                                    {review.date}
                                </small>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Ratings;
