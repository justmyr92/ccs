import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const Announcement = () => {
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

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_z7yyre7",
        "template_0zn66di",
        form.current,
        "JLqLlsyCU-xAqheWy"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <section className="h-screen bg-blue-100 flex flex-row">
      <Sidebar roleID={roleID} />
      <div className="flex flex-col justify-center items-center w-full h-full bg-blue-100">
        <form
          ref={form}
          onSubmit={sendEmail}
          className="flex-col flex border justify-center items-center"
        >
          <label>Name</label>
          <input
            type="text"
            name="user_name"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
          <label>Email</label>
          <input
            type="email"
            name="user_email"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />

          <label>Message</label>
          <textarea
            placeholder="type here"
            name="message"
            className="textarea textarea-bordered textarea-lg w-full max-w-xs"
          ></textarea>

          <input type="submit" value="Send" />
        </form>
      </div>
    </section>
  );
};

export default Announcement;
