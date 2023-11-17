import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaThumbsUp } from "react-icons/fa";

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

  return (
    <section className="dashboard__section h-screen bg-blue-100 flex flex-row ">
      <Sidebar roleID={roleID} />
      <div className="flex flex-col">
        <div className="stats shadow h-[10rem] mt-3 ml-10 w-full">
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
        <div className="card w-full bg-base-100 shadow-xl ml-10 mt-4 ">
          <div className="card-body">
            <h2 className="card-title">Card title!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ratings;
