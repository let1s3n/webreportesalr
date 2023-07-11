import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Create = () => {
  const [params, setParams] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const router = useRouter();

  const handleChange = (e) => {
    setParams({
      ...params,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/create", params);
      if (response.status === 200) {
        router.push("/create");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          placeholder="username"
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="email"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          onChange={handleChange}
        />
        <input
          type="checkbox"
          id="isAdmin"
          name="isAdmin"
          value={true}
          onChange={handleChange}
        ></input>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Create;
