import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Reservations = () => {
  const [viewProposals, setViewProposals] = useState(false);
  return (
    <>
      {!viewProposals ? (
        <div className="profile__main bg-blue-100 w-[100%]  p-3">
          <div className="flex justify-between">
            <h3 className="text-2xl title mb-4">Order History</h3>
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
              {/* body */}
              <tbody>
                <tr>
                  <td>1</td>
                  <td>2021-09-09</td>
                  <td>10:00AM - 12:00PM</td>
                  <td>Wedding</td>
                  <td>Approved/Rejected</td>
                  <td>
                    <button className="btn bg-red-500 hover:bg-red-600">
                      delete
                    </button>
                    <button className="btn bg-cyan-600">Review</button>
                    <button
                      className="btn bg-cyan-600"
                      onClick={() => setViewProposals(true)}
                    >
                      View
                    </button>
                  </td>
                </tr>{" "}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="profile__main bg-blue-100 w-[100%]  p-3">
          <div className="flex justify-between">
            <h3 className="text-2xl title mb-4">CLIENT INFO</h3>
            <button onClick={() => setViewProposals(false)}>Back</button>
          </div>
          <table className="table  bg-white rounded-xl shadow-md ">
            <tbody>
              <tr>
                <td className="w-[30%]">name</td>
                <td>charlene</td>
              </tr>
              <tr>
                <td>contact</td>
                <td>09155437979</td>
              </tr>
              <tr>
                <td>email</td>
                <td>largadocharlene00@gmail.com</td>
              </tr>
              <tr>
                <td>event info</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Reservations;
