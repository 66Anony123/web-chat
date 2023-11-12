import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { toji, gojo, sukuna, meimei, genjaku } from "../assets/index";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { setAvatarRoute } from "../utils/ApiRoutes";

function SetAvatar() {
  const navigate = useNavigate();
  const avatars = [toji, gojo, sukuna, meimei, genjaku];

  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "top-right",
    autoClost: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login ");
    }
  });

  const setProfilePicture = async () => {
    try {
      if (selectedAvatar === undefined) {
        toast.error("Please Select an Avatar", toastOptions);
      } else {
        const user = await JSON.parse(localStorage.getItem("chat-app-user"));

        const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
          image: avatars[selectedAvatar],
        });
        user.isAvatarImageSet = true;
        user.avatarImage = avatars[selectedAvatar]; // here "user.avatarImage = data.image" was used but due to late data recieving or like only through second rendering the "data.image" value exist ;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      }
    } catch (err) {
      toast.error("An error occured while setting the avatar", toastOptions);
    }
  };

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Pick an avatar</h1>
        </div>
        <div className="avatars">
          {avatars.map((avatar, index) => {
            return (
              <div
                key={index}
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
              >
                <img
                  src={avatar}
                  alt="avatar"
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            );
          })}
        </div>
        <button className="submit-btn" onClick={setProfilePicture}>
          Select
        </button>
      </Container>

      <ToastContainer />
    </>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.7rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.4s ease-in-out;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid green;
    }
  }
  .submit-btn {
    font-weight: bold;
    font-family: "Courier New", Courier, monospace;
    font-size: 1rem;
    padding: 10px;
    cursor: pointer;
    border: none;
    border-radius: 4rem;

    text-transform: uppercase;
    transition: 0.4s ease-in-out;

    &:hover {
      background-color: black;
      color: white;
    }
  }
`;
export default SetAvatar;
