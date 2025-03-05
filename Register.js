import React, { useState } from "react";
import "./Register.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const navigate=useNavigate();

  useGSAP(() => {
    gsap.to(".imageupload", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    });
  });

  const addUserData = async (e) => {
    e.preventDefault();

    if (!name.trim() || !file) {
      alert("Please enter a name and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("name", name);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const res = await axios.post("http://localhost:8005/register", formData, config);
      console.log("Upload Success:", res.data);
      navigate("/");
      setName("");
      setFile(null);

    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return (
    <div className="imageupload">
      <h1>Upload Image Here</h1>
      <form onSubmit={addUserData}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <input
          type="file"
          name="photo"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
