import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  const getUserData = async () => {
    try {
      console.log("inside dashboard");
      const response = await fetch("http://localhost:3000/api/v1/isAuth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      });
      const json = await response.json();
      console.log(json);
      if (json.Success === true) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/signIn",
        formData,
        { withCredentials: true }
      );
      navigate("/dashboard");
      //   console.log(response);
    } catch (error) {
      console.log("axios log ", error);
    }
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit} className="">
        <div className="">
          <label className="" htmlFor="username">
            Username
          </label>
          <input
            className=""
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="username"
            required
          />
        </div>
        <div className="">
          <label className="" htmlFor="password">
            Password
          </label>
          <input
            className=""
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="password"
            required
          />
        </div>
        <div className="">
          <button className="" type="submit">
            Sign In
          </button>
          <Link to="/signUp" className="">
            Doesnt have a Account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
