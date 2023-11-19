import { faEye, faFile, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Reservations = () => {
  return (
    <div className="ratings__main bg-blue-100 w-[100%]  p-3">
      <div className="flex justify-between">
        <h3 className="text-2xl">Reservation History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>RESERVATION</th>
              <th>VENUE</th>
              <th>STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>1</td>
              <td>10-14-02</td>
              <td>Reservation 1</td>
              <td>San Pedero</td>
              <td>Approve</td>
              <td>
                <div className="flex gap-3">
                  <button className="btn bg-red-500 text-white ">
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                  <button className="btn btn-info text-white">
                    <FontAwesomeIcon icon={faFile} />
                  </button>
                  <button className="btn btn-info text-white">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </div>
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <td>1</td>
              <td>10-14-02</td>
              <td>Reservation 1</td>
              <td>San Pedero</td>
              <td>Approve</td>
              <td>
                <div className="flex gap-3">
                  <button className="btn bg-red-500 text-white">
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                  <button className="btn btn-info text-white">
                    <FontAwesomeIcon icon={faFile} />
                  </button>
                  <button className="btn btn-info text-white">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservations;
