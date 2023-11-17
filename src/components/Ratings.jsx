import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faStar,
  faStarHalf,
} from "@fortawesome/free-solid-svg-icons";

const Ratings = ({ clientData }) => {
  return (
    <div className="ratings__main bg-blue-100 w-[100%]  p-3">
      <div className="flex justify-between">
        <h3 className="text-2xl">Ratings</h3>
      </div>
      <div classname="flex justify-center">
        <div className="flex justify-center">
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStarHalf} />
        </div>
      </div>
      <div>
        <textarea
          className="textarea textarea-primary w-[100%]"
          placeholder="type text"
        ></textarea>
      </div>
    </div>
  );
};

export default Ratings;
