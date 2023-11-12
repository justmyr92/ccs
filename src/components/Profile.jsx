import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Profilee = ({ clientData }) => {
    const [isEdit, setIsEdit] = useState(false);
    return (
        <div className="profile__main bg-blue-100 w-[100%]  p-3">
            <div className="flex justify-between">
                <h3 className="text-2xl">Profile</h3>
                <button>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
            </div>
            <div className="grid grid-cols-2 gap-1 mb-2">
                <input
                    type="text"
                    placeholder="First Name"
                    className="input w-full"
                    name="First Name"
                    value={clientData.client_fname}
                    readOnly
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    className="input w-full "
                    name="Last Name"
                    value={clientData.client_lname}
                    readOnly
                />
            </div>
            <div className="grid mb-2 grid-cols-3 gap-1">
                <input
                    type="text"
                    placeholder="email"
                    className="input w-full col-span-2"
                    name="email"
                    value={clientData.client_email}
                    readOnly
                />
                <input
                    type="text"
                    placeholder="contact"
                    className="input w-full "
                    name="email"
                    value={clientData.client_contact}
                    readOnly
                />
            </div>
            <div className="grid grid-cols-2 gap-1 mb-2">
                <input
                    type="text"
                    placeholder="contact"
                    className="input w-full"
                    name="First Name"
                    value={clientData.client_contact}
                    readOnly
                />
                <input
                    type="text"
                    placeholder="street"
                    className="input w-full "
                    name="Last Name"
                    value={clientData.client_street}
                    readOnly
                />
            </div>
            <div className="grid grid-cols-2 gap-1 mb-2">
                <input
                    type="text"
                    placeholder="barangay"
                    className="input w-full"
                    name="First Name"
                    value={clientData.client_barangay}
                    readOnly
                />
                <input
                    type="text"
                    placeholder="city"
                    className="input w-full "
                    name="Last Name"
                    value={clientData.client_city}
                    readOnly
                />
            </div>
            <div className="flex justify-end gap-2 ">
                <button className="btn btn-active">cancel</button>
                <button className="btn bg-cyan-600">submit</button>
            </div>
        </div>
    );
};

export default Profilee;
